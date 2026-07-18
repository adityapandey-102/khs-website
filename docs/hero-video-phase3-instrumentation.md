# Phase 3 — Instrumentation Results

## 1. The temporary instrumentation code added

Added to `src/components/Hero/Hero.tsx`, every block marked `TEMP INSTRUMENTATION` (searchable, easy to strip). Summary of what was added — **no existing logic changed**, only logging alongside it:

- A `log(msg, data)` helper: timestamps via `performance.now()`, always `console.log`s, and (only when the URL has `?debug=1`) also pushes to on-screen state so the log is readable directly on a phone screen without DevTools.
- Event handlers added to the `<video>` element: `onLoadStart`, `onLoadedMetadata`, `onLoadedData`, `onCanPlayThrough`, `onPlay`, `onPlaying`, `onWaiting`, `onStalled`, `onSuspend`, `onPause`, `onEnded` — all new. `onCanPlay` and `onError` already existed (from earlier fixes) and now also log, without changing their existing `setReady`/`setErrored` behavior. Every handler logs `{ slide, current, readyState, networkState, currentSrc, errorCode, errorMessage }`.
- Four new `useEffect`s logging every transition of `current`, `armed`, `ready`, `errored`.
- Logging added at the exact `el.currentTime = 0` / `el.play()` / `el.pause()` call sites, plus `.then()`/`.catch()` on the `play()` promise (previously silently swallowed — this closes a gap flagged in the prior investigation phase).
- Poster/video-opacity transition logging, derived from the same `ready` state that drives the CSS opacity classes.
- `requestVideoFrameCallback` registration on video mount (first 3 frames logged), with a fallback log line if unsupported.
- An on-screen debug overlay (fixed to the bottom of the viewport, monospace, scrollable), visible only with `?debug=1` in the URL — safe if this ships accidentally, and the actual mechanism for collecting real-device data (see Section 9/deliverable 6 below).

Full diff is in the file; I'm not pasting the entire component here since it's ~150 lines of additions — every addition is tagged `TEMP INSTRUMENTATION` in a comment for easy removal.

**One bug in the instrumentation itself, found and fixed before trusting any data:** the ref callback is an inline arrow function, which React recreates every render, causing it to fire (null-then-element) on every re-render — not a bug I introduced structurally (this exact ref pattern already existed in the pre-instrumentation code), but my *logging* of it originally re-fired on every one of those cycles, spamming "Video element inserted" dozens of times and re-registering `requestVideoFrameCallback` from scratch each time (visible as `frameCount: 0` repeating forever instead of counting 0→1→2). Fixed with a `useRef<Set<number>>` that persists across renders instead of relying on the ref callback's own state. Re-verified clean afterward.

---

## 2. The complete event timeline

**Desktop Chrome (real, non-emulated, 1440×900, local dev server, `?debug=1`):**

```
957.70ms   Component mounted
961-976ms  Initial state logs (ready/armed/errored/current, logged twice — see note below)
1506.90ms  Slide armed (index 0, ice-blue)
1516.00ms  Video element inserted (ice-blue)
1517.90ms  armed -> [0]
1559.80ms  loadstart (ice-blue-desktop.webm)
1561.40ms  error (ice-blue-desktop.webm)   <- see Section 8, this is the major finding
1562.50ms  error (ice-blue-desktop.webm)   <- fires twice
1576.90ms  errored -> [0]
1600.80ms  current -> 1 (florentine)        <- immediate advance, triggered by the error above
1601.80ms  pause() called (ice-blue)
1615.50ms  Slide armed (florentine)
1631.20ms  Video element inserted (florentine)
1653.80ms  loadstart (florentine-desktop.webm)
1654.60ms  error (florentine-desktop.webm) x2
1674.20ms  errored -> [0,1]
1677.20ms  loadedmetadata (ice-blue) readyState:4   <- ice-blue recovers, same src
1685-1690  loadeddata/canplay/canplaythrough (ice-blue), then same sequence for florentine
1691.20ms  current -> 2 (flexi)             <- same error->advance pattern repeats
...same pattern for flexi, then rotor...
1909.60ms  current -> 0 (ice-blue again, wrapped around)
1910.40ms  currentTime = 0 (ice-blue)
1911.40ms  play() called (ice-blue)
1925.40ms  play (event) fired
1937.00ms  waiting (ice-blue)
1948.80ms  canplay (ice-blue, again)
1949.30ms  playing (ice-blue)               <- genuinely playing now
1949.60ms  play() resolved
2084.30ms  suspend (ice-blue, settled state)
```

**Mobile-emulated Chromium (iPhone 14 Pro Max profile, local dev server, `?debug=1`):**

```
598.50ms   Component mounted
600-625ms  Initial state logs (again, twice)
630.40ms   Slide armed (ice-blue)
641.90ms   Video element inserted (ice-blue)
663.60ms   loadstart (ice-blue-mobile.mp4)
678.40ms   suspend
688.50ms   loadedmetadata  readyState:4
691.10ms   loadeddata
691.60ms   canplay
691.90ms   canplaythrough
698.60ms   Video element inserted (florentine, next-slide preload)
700.00ms   Poster hidden / video opacity -> 1 (ice-blue)
700.70ms   ready -> [0]
718-764ms  florentine preload goes through the identical clean sequence
```

**No errors. No waiting/stalled events. No retries.** Straight line from `loadstart` to `canplaythrough` in ~28ms.

**Duplicate initial state logs, both conditions:** the `ready`/`armed`/`errored`/`current` "changed" logs each fire twice at mount, ~15-20ms apart, with identical values. This is consistent with React Strict Mode's dev-mode double-invocation of effects (never explicitly confirmed via a `next.config.ts` setting — it isn't set either way, so the framework default applies) — flagging as observed, not fully root-caused.

---

## 3. Desktop vs. Mobile-emulated comparison

| Milestone | Desktop | Mobile-emulated |
|---|---|---|
| Component mounted | ~950ms | ~600ms |
| Slide armed | ~1507ms | ~630ms |
| Video element inserted | ~1516ms | ~642ms |
| loadstart | ~1560ms | ~664ms |
| **`error` event** | **fires ×2, immediately** | **never fires** |
| loadedmetadata | ~1677ms (after recovering from error) | ~689ms (clean, first try) |
| canplaythrough | ~1686ms | ~692ms |
| Slide actually stays on ice-blue | **No — cascades through all 4 slides in <500ms, wraps back to ice-blue** | **Yes — holds correctly** |

---

## 4. First point of divergence

**The first and only point where desktop and mobile-emulated behavior diverge is the `error` event immediately following `loadstart`, at ~1561ms on desktop.** Every millisecond before that — mount, arm, insert — tracks the same shape (just different absolute timing). Nothing after that point is an independent divergence; everything downstream (the rapid slide-cycling, the eventual wrap-back to ice-blue) is a direct, mechanical consequence of that one error, cascading through this component's own error-handling logic (which advances a slide immediately, with no delay, on any `error` event).

---

## 5. Root cause, choosing from your list

**`canplay` delayed — but not for the reason you'd expect.** More precisely: a genuine `error` event fires and is delayed relative to recovery, but the honest answer closest to your options is a mix of **"React state delayed"** and **none of the listed options cleanly** — the video does *eventually* reach `canplay` quickly (28ms mobile, ~120ms desktop after the error), but a spurious `error` event fires first and is misinterpreted by this component's own error-handling as a permanent failure, causing an immediate, incorrect slide-skip before the video gets the chance it was always going to get a moment later.

If forced into exactly one of your categories: **`playing` delayed** — because although `canplay` fires reasonably fast even on desktop, the actual **first real `playing` event** (line: `1949.30ms playing`) is delayed until *after* a full cycle through all four slides (~450ms of avoidable churn) purely because of the false-positive error, not because of anything related to download/decode/render speed.

---

## 6. Confidence level

**High confidence (this is directly evidenced, reproduced 3 times, isolated via a clean control test) for this specific claim:** on the local dev server, every desktop-viewport video fires a false-positive `error` event immediately after `loadstart`, which this component's existing error-handling logic treats as fatal, causing rapid unwanted slide-cycling.

**Low-to-moderate confidence that this is the same bug the user is reporting**, for one concrete, load-bearing reason: **this error does not occur on production** (verified directly — all four desktop videos and both tested mobile videos show `error: null` on `https://khs-website-nu.vercel.app/`, both desktop and mobile-emulated viewports). Since the user's original complaint was reproduced on production Vercel as well as local dev, and this specific defect is dev-only, **this finding likely does not explain the user's core complaint** — but it is a real, separate, newly-discovered bug worth fixing regardless (it degrades the local dev experience and masks other signals during debugging), and finding it is what the instrumentation was for.

---

## Important note on scope

Per your instructions, **no fix has been applied.** The error-handling logic (`onError` → immediate advance) still behaves exactly as it did before this investigation. This document only reports what the instrumentation observed.

## Real-device data collection — the part I cannot do myself

I still have no access to a real Android or iOS device, and this dev-only-error finding does not explain the production-reproducible bug you're actually chasing. To get evidence from your actual phone:

1. Open the site (`http://<your-LAN-IP>:3000/?debug=1` on local dev, or `https://khs-website-nu.vercel.app/?debug=1` on production) on your phone.
2. A black log panel will appear pinned to the bottom of the screen, showing every timestamped event live, in the exact format from Section 2 above.
3. Reproduce the delay, then either screenshot the panel (scroll through it — it's scrollable) or read the timestamps off directly and send them over.
4. This requires no cable, no USB debugging, no DevTools — just the URL flag.
