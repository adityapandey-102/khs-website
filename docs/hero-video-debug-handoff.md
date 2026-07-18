# Hero Component Video-Loading Bug — Engineering Handoff

**File under investigation:** `src/components/Hero/Hero.tsx`
**Related files touched:** `src/components/HomeExtras/HomeExtras.tsx`, `src/components/HomeExtras/ClickToPlayVideo.tsx` (new), video assets under `public/assets/khs/hero-video/` and `public/assets/khs/unassociated/`
**Status at handoff time:** Reported symptom (mobile-only ~26-30s delay before video appears, on live Vercel production, on localhost dev server, and via Chrome DevTools device emulation) is **not reproduced** in any test performed by the investigating agent. Root cause is **unresolved**. This document exists so a second engineer does not repeat the last ~2 hours of investigation.

**Honesty note up front:** every test in this document was run by an AI coding agent (me) using Playwright-driven headless Chromium, plus verbal reports from the site owner testing on their own Chrome browser (desktop and DevTools mobile emulation) and their own phone. **No real non-Chromium browser, no real physical Android/iOS device, and no direct DevTools session on the user's own machine was ever inspected by the investigating agent.** Where something was not checked, it is marked **Not Checked** rather than assumed.

---

## Chronological Investigation Timeline

### Phase 0 — Initial request (advice only)
**Hypothesis:** N/A — user asked for suggestions on why a Jaquar-style poster→video hero was slow to load, specifically citing 7-8MB video files downloaded via Chrome "Save Video As" from a competitor's site.
**Why suspected:** User explicitly named file size as the likely cause and described a load pattern similar to adaptive bitrate streaming they'd observed elsewhere.
**How tested:** Read `Hero.tsx`, ran `ls -la` / `du -h` on the four hero video files.
**Evidence collected:** File sizes: `ice-blue-home-desktop.mp4` 7.99MB/30s, `florentine-prime-hand-shower-desktop.mp4` 7.52MB/28s, `flexi-nozzle-hand-shower_2026.mp4` 2.70MB/12s, `rotor-hand-shower_2026.mp4` 2.24MB/12s.
**Result:** Gave suggestions (re-encode, shorten loops, mobile-specific sources, WebM alt, true ABR via video CDN). No code changed at this stage (user explicitly said "don't change anything").
**Confirmed/Eliminated:** N/A (advisory only).

### Phase 1 — Video compression + responsive sources (approved implementation)
**Hypothesis:** Large, non-web-optimized video files (H.264 at ~1.5-2.1 Mbps for 1280×542, no mobile variant, single MP4 source, unused audio tracks) are the primary cause of slow load.
**Why suspected:** Direct measurement (`ffprobe`) confirmed bitrate/resolution/audio-track facts above.
**How tested:** Installed `ffmpeg` (winget, `Gyan.FFmpeg`, hash-verified). Probed all 4 files with `ffprobe` — confirmed H.264, yuv420p, 1280×542, bitrates 1.48-2.14 Mbps, AAC audio track present despite the `<video>` being `muted` in code (dead weight). Re-encoded all 4 into 16 variants (desktop/mobile × mp4/webm), first pass at fixed CRF, second pass re-tuning WebM CRF because VP9 output was **larger** than H.264 for `flexi`/`rotor` at the first CRF setting.
**Evidence collected:** Final sizes — see table below. Verified via Playwright (`verify-hero.mjs`) against local dev server: correct file selected per viewport, `readyState: 4` within ~3s, zero console errors, screenshots visually correct on both viewport sizes.

| Slide | Original | Desktop (smaller of mp4/webm) | Mobile (smaller of mp4/webm) |
|---|---|---|---|
| ice-blue | 7.63 MB | 1.57 MB (webm) | 0.52 MB (mp4) |
| florentine | 7.17 MB | 2.35 MB (webm) | 0.53 MB (mp4) |
| flexi | 2.58 MB | 2.71 MB (mp4) | 0.78 MB (mp4) |
| rotor | 2.13 MB | 2.34 MB (mp4) | 0.71 MB (mp4) |

**Result:** File sizes reduced 70-93%. VP9 did **not** consistently beat H.264 on this footage even after retuning — `flexi`/`rotor` desktop H.264 ended up marginally *larger* than their pre-optimization originals (2.58→2.71MB, 2.13→2.34MB) because the originals were already reasonably bitrate-efficient; re-encoding at a fixed CRF for consistency across all four clips didn't shrink those two further.
**Confirmed/Eliminated:** Confirmed as a real, measured improvement to payload size. **Did not, by itself, resolve the symptom the user is now reporting** — this fix predates the "wrong video plays first" and "26-30s delay" reports, which surfaced afterward.

### Phase 2 — First report of "wrong video / 30s delay" (dev server, pre-restart)
**Hypothesis:** The slide auto-advance timer (`setTimeout(next, slides[current].duration)`) started counting down the instant `current` changed, **not** when the video actually became playable. If a video took close to (or longer than) its full designed duration to buffer, the timer would fire on schedule and force-advance to the next slide before the first video ever got to display.
**Why suspected:** The reported ~27-30s numbers matched `slides[0].duration` (30000ms) and `slides[1].duration` (28000ms) almost exactly — too precise to be coincidence.
**How tested:** Re-read the effect in question. Reasoned through the logic (no readiness gate existed at all in the original code).
**Evidence collected:** Source inspection only at this point — no instrumented reproduction yet.
**Result:** Identified as a real logic bug.
**Confirmed/Eliminated: CONFIRMED** as a genuine defect in the pre-fix code (see Code Change History #1 below for the fix, and its own bug).

### Phase 3 — First fix attempt, and a self-introduced regression
**What happened:** Added a readiness gate (`isCurrentReady = ready.has(current)`), but paired it with a blind 15000ms fallback timer for the not-ready case ("in case a video never loads"). This was a mistake: the fallback fires on **any** delay past 15s, not just genuine failures, so a video that's merely slow (not broken) now got force-skipped at the **15s** mark instead of the original 30s mark — the same class of bug, triggered sooner.
**How caught:** User reported the bug was still present after this fix; re-reading the diff surfaced the flaw before further testing was done.
**Fix:** Replaced the time-based fallback with an error-based one: added `errored` state, wired `onError` on the `<video>` element, and rewrote the effect to wait with **no timer at all** while a slide is neither ready nor errored, only scheduling `next()` immediately on a genuine load error, or after the real `duration` once truly ready. This is the **current** code (see Code Change History #2).
**Confirmed/Eliminated:** The 15s-cap version is **eliminated** (reverted/replaced). The current error-gated version has been verified via Playwright not to skip prematurely (see Phase 4), but has **never been confirmed as the fix for the user's real-world report**, because the real-world report was never reproduced in the first place.

### Phase 4 — Verifying the fix under throttled network (local dev server)
**Hypothesis:** The corrected timer logic (wait indefinitely for readiness, only skip on real error) prevents the wrong-video-first symptom regardless of how long loading takes.
**How tested:** Playwright + Chrome DevTools Protocol (`Network.emulateNetworkConditions`).
- First pass: extreme throttle (400kbps down / 200kbps up / 150ms latency). Result: `<video>` element never mounted within 40s (`currentSrc` stayed `null` the entire time). This led to a page-weight investigation (see Phase 5) rather than a video-specific conclusion, because at that throttle level the JS bundle itself (small as it is) plus other page resources hadn't finished loading either.
- Second pass: realistic throttle (4Mbps down / 1.5Mbps up / 40ms latency). Result: `ice-blue-desktop.webm` reached `readyState: 0` at t=4s, `readyState: 4` (playable) at t=8s, and remained the correctly displayed slide through t=40s with no skip.
**Evidence collected:** Full console output of both throttle runs (see raw logs in agent transcript; not re-pasted here for length, but reproducible via the scripts described in Section 3).
**Confirmed/Eliminated:** **Confirmed** — under a realistic (not extreme) throttle, the current code does not skip the first slide. **Not tested:** whether this holds on an actual mobile device on an actual cellular/WiFi connection, since throttling was simulated on a desktop-class machine's network stack, not a real phone's radio/modem/OS network stack.

### Phase 5 — Page-weight investigation (uncovered an unrelated 8.5MB video)
**Hypothesis:** If Hero's own videos are now small (0.5-2.5MB), what else is competing for bandwidth on the same page load?
**How tested:** Playwright response listener summing `content-length` by file extension across a full homepage load (`waitUntil: "networkidle"`).
**Evidence collected:** Total page weight 15.02MB; `.mp4` 8.58MB + `.webm` 3.93MB = ~12.5MB video total; JS chunks only 51KB. Traced the 8.58MB `.mp4` component to `KHS-Video.mp4` referenced in `HomeExtras.tsx` (`AwardsVideo` component) — entirely unrelated to Hero.
**Result:** Confirmed via `ffprobe`: 1920×1080, H.264 at **10.38 Mbps**, 6.81s duration, AAC audio, moov atom near file start (offset 48 — **not** a faststart problem, contrary to an initial assumption). Confirmed via `curl -H "Range: bytes=0-1023"` that the dev server correctly honors HTTP Range requests (206 Partial Content, correct `Content-Range`). Despite `preload="metadata"` in the original markup, a dedicated Playwright test (`check-khs-video.mjs`) showed the **entire file** downloads on a normal page visit with zero user interaction (`Content-Range: bytes 0-9001611/9001612` in a single response) — Chromium did not honor the metadata-only hint for this file in practice.
**Fix applied (user-approved):** Re-encoded to 1280×720, CRF 23, faststart, kept audio (real narrated content, unlike Hero's muted loops) → 8.58MB → 1.55MB. Converted the component from a raw `<video controls preload="metadata">` to a genuine click-to-play pattern (`ClickToPlayVideo.tsx`, new client component) so **zero** video bytes are requested until the user explicitly clicks. Verified via Playwright: 0 requests before click, exactly 1 request (1,623,210 bytes) after a direct DOM `.click()` (a real coordinate-based click was intercepted by an unrelated pre-existing full-screen promo modal at `z-900`; had to bypass via `element.click()` in `page.evaluate`).
**Confirmed/Eliminated: CONFIRMED** as a real, separate weight problem, now fixed and verified. **Not the cause of the Hero-specific symptom** — this video isn't in the Hero component and doesn't block Hero's own video from becoming ready.

### Phase 6 — Console warning investigation
**What was reported:** `The final argument passed to useEffect changed size between renders` with a Turbopack/React Fast Refresh stack trace (`scheduleRefresh`, `performReactRefresh`), immediately after a fresh `npm run dev` restart.
**Hypothesis:** Transient Turbopack persistent dev-cache artifact — a stale compiled chunk (from before the `errored` state was added, when the effect's dependency array had 3 items instead of 4) got served and hot-patched against the current 4-item source on first request post-restart.
**How tested:** Inspected the actual source — confirmed the dependency array is a fixed 4-item literal, structurally incapable of naturally changing size between renders of the same compiled function. This rules out a genuine runtime hook-order bug and is consistent with a cache-reconciliation artifact instead.
**Action taken:** Deleted the `.next` directory (`rm -rf .next`) to force a fully clean rebuild on next start. **Not verified after the fact** — the agent did not confirm the warning is actually gone after a subsequent restart; this was reasoned from first principles about how Turbopack's cache works, not empirically re-tested.
**Confirmed/Eliminated: STILL POSSIBLE this warning is unrelated to the reasoning above** — it was never proven, only inferred. Marked **Not Checked** whether it recurs post-cache-clear.
**Relevance to main bug:** Low — this is a dev-only console warning with no described connection to the 26-30s delay, and it appeared on **desktop** load in the pasted terminal log, not specifically mobile.

### Phase 7 — Production (Vercel) testing
**Hypothesis:** If the bug reproduces on live production (not just dev mode), dev-mode confounds (unminified bundle, HMR overhead) are ruled out, and if it's mobile-specific in production, that points to either a genuine per-viewport code bug or a real device/network factor.
**How tested:** Confirmed via `git status`/`git log`/`git fetch` that the committed code (commit `2c6ac67`, made by the site owner, containing all of the agent's Hero.tsx/HomeExtras.tsx/video changes) matched `origin/main` exactly — i.e., the fix set described above was actually deployed. Obtained the live URL (`https://khs-website-nu.vercel.app/`) from the user. Ran Playwright against the **live URL** with three profiles: plain desktop viewport, `devices["iPhone 13"]`, `devices["Pixel 7"]` (full device emulation: UA string, viewport, DPR, touch).
**Evidence collected:**
- Video-ready timing: Desktop 6824ms, iPhone 13 858ms, Pixel 7 947ms — mobile was **faster**, not slower, from this test vantage point.
- A follow-up, more precise trace tracked the actual visible slide (`<h1>` tagline text) over a 40s window rather than inferring from network requests: Desktop showed ice-blue at t=497ms, switched to florentine at t=32,742ms. iPhone 13 showed ice-blue at t=356ms, switched to florentine at t=31,624ms. Both correct, both matched expected ~30s duration, no skip.
- **Unresolved oddity, flagged but not fully chased down:** in the first (network-request-based) desktop test, four different slide video files (`ice-blue`, `florentine`, `flexi`, `rotor`) all showed up in the response log within under 7 seconds — which looks alarming out of context. The follow-up tagline-based trace strongly suggests this was the "preload next slide once current is ready" mechanism firing for background preloads rather than the visible slide actually skipping through all four — but **this was never explicitly reconciled or re-verified line-by-line**. It is presented here as an open loose end, not a resolved one.
**Result:** Code and deployment both function correctly from the agent's testing vantage point (a cloud sandbox with presumably good connectivity to Vercel's edge network), on both desktop and mobile-emulated profiles.
**Confirmed/Eliminated:** **Eliminated** (from this vantage point only): "the deployed code has a mobile-specific bug that's network-independent." **Not eliminated:** something specific to the user's real device, real network path, or real browser profile.

### Phase 8 — Chrome DevTools device-toolbar reproduction attempts (localhost)
**Hypothesis (user's, at this point):** "Same device, different screen size" via Chrome's inspector-panel device emulation reproduces the bug, therefore it must be a viewport-driven code bug — specifically pointed at the `media="(max-width: 767px)"` breakpoint on the mobile `<source>` tags, since the user's DevTools reported ~440px width (under 767) yet the bug persisted, while ~300px "started working."
**How tested (agent side):**
1. `devices["iPhone 14 Pro Max"]` full emulation (viewport 430×740 per Playwright's device descriptor) against `localhost:3000`. Polled every 1s for 30s.
2. Plain viewport resize (no UA/touch override — closer to Chrome's generic "Responsive" mode) at exactly 440px and exactly 300px against `localhost:3000`, polling every 4s for 32s and additionally reading `window.matchMedia("(max-width: 767px)").matches` directly at each sample.
3. Checked the codebase for a service worker that could be serving stale cached responses (`grep -r serviceWorker|next-pwa|workbox src/`, searched `public/` for `sw*.js`/`worker*.js`) — none found.
**Evidence collected:**
- iPhone 14 Pro Max emulation: `ice-blue-mobile.mp4` reached `readyState: 4` at t=2s, correct tagline held through t=30s. Only 2 video requests total in the whole window (`ice-blue-mobile.mp4` at t=1501ms, `florentine-mobile.mp4` — the next-slide preload — at t=1558ms).
- 440px vs 300px: **identical results at both widths.** `matchMedia("(max-width: 767px)")` returned `true` at both. Both selected `ice-blue-mobile.mp4`. Both reached `readyState: 4` by t=4s. Both held the correct slide through t=28s and correctly advanced to florentine at t=32s (matching the real ~30s duration + short load time).
**Result:** No difference found between 300px and 440px in any way the agent could observe. 767px is mathematically not a relevant boundary for this comparison — both test widths are on the same side of it.
**Confirmed/Eliminated:** **Eliminated (from agent's testing):** "440px specifically triggers different/buggy behavior than 300px due to the 767px breakpoint or any other width-dependent code path." **Not eliminated:** a difference specific to the user's actual DevTools session state (e.g., live-dragging the resize handle without a fresh navigation, versus the agent's scripted fresh-navigation-per-width approach) or their actual Chrome installation/profile.
**Also checked:** User confirmed DevTools Network tab throttling was set to "No throttling." User reported performing a hard reload (Ctrl+Shift+R) and still seeing the delay. The agent has no way to independently verify *how* that hard reload was performed relative to the device-mode toggle (i.e., whether device mode was already active before the reload, or toggled after).

---

## 1. Complete Code Change History

### Change A — Video source restructuring (KEPT)
**Before:** `video: "/assets/khs/hero-video/ice-blue-home-desktop.mp4"` (single flat string per slide, one `<source>` tag).
**After:** `video: { mobile: [{src,type}, ...], desktop: [{src,type}, ...] }` — arrays ordered smallest-file-first per measured size, rendered via `.map()` into multiple `<source>` tags, with `media="(max-width: 767px)"` on the mobile group.
**Problem it solved:** Single oversized file served to all devices regardless of screen size or bandwidth.
**Why believed it would work:** Standard `<video><source media="..."></video>` resource-selection is a documented, universally-supported browser behavior (verified across every test in this document — Chromium always picked the correct source at every tested viewport width).
**Did it improve anything:** Yes, measurably — file sizes down 70-93%, confirmed via direct `ffprobe`/`ls` measurement.
**Still present:** Yes.
**Recommendation:** Keep. This part of the implementation has been tested more thoroughly than any other piece of this codebase in this session and has never shown a defect.

### Change B — Video re-encoding (KEPT)
**Before:** Raw "Save Video As" exports, 1.48-2.14 Mbps H.264, unused AAC audio tracks, no mobile variant, no WebM.
**After:** 16 files (4 slides × {desktop,mobile} × {mp4,webm}), CRF-based re-encode, faststart, audio stripped (Hero videos are `muted` in markup, audio was pure dead weight).
**Problem it solved:** Oversized payload.
**Did it improve anything:** Yes, per the size table in Phase 1.
**Still present:** Yes. Old originals were deleted (user-approved) after confirming no other code referenced them.
**Recommendation:** Keep. Note the honest caveat that `flexi`/`rotor` desktop variants are marginally *larger* than their pre-optimization originals (see Phase 1) — not a functional problem, but worth knowing if someone later asks "why didn't this one shrink."

### Change C — Timer effect, first version (SUPERSEDED — do not reintroduce)
```js
// INTERMEDIATE VERSION — no longer in the codebase, shown for history only
const isCurrentReady = ready.has(current);
useEffect(() => {
  const timer = setTimeout(next, isCurrentReady ? slides[current].duration : 15000);
  return () => clearTimeout(timer);
}, [current, next, isCurrentReady]);
```
**Problem it was intended to solve:** The original code's timer fired at a fixed duration regardless of video readiness, causing a slide to get skipped before its video ever displayed.
**Why believed it would work:** Gating on readiness seemed sufficient; the 15000ms fallback was added defensively "in case a video never loads."
**Whether it actually improved anything:** **No — it made the underlying symptom worse in the case that mattered.** If a video took longer than 15s to become ready (which, per the user's own reports, was happening), this fallback fired and force-advanced the slide, reproducing the exact same "wrong video shows first" bug, just 15 seconds sooner than the original 30-second bug.
**Still present:** No — replaced by Change D.
**Recommendation:** Do not reintroduce a fixed-time fallback cap. If a "carousel must never freeze forever" safety net is wanted, it should be much longer (60s+) or, better, tied to an actual signal (see Change D).

### Change D — Timer effect, current version (KEPT, but unverified against the real-world symptom)
```js
// CURRENT CODE — Hero.tsx lines 144-150
const isCurrentReady = ready.has(current);
const isCurrentErrored = errored.has(current);
useEffect(() => {
  if (!isCurrentReady && !isCurrentErrored) return;
  const timer = setTimeout(next, isCurrentReady ? slides[current].duration : 0);
  return () => clearTimeout(timer);
}, [current, next, isCurrentReady, isCurrentErrored]);
```
Paired with new state and handler:
```js
const [errored, setErrored] = useState<Set<number>>(() => new Set());
// ...
onError={() => setErrored((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))}
```
**Problem it was intended to solve:** Same as Change C, without Change C's regression.
**Why believed it would work:** No timer is ever set while a slide is neither ready nor errored — it waits indefinitely, however long that takes, so slowness (of any duration) can no longer cause a premature skip. Only a genuine browser-reported load failure (`onError`) advances early.
**Whether it actually improved anything:** Verified via Playwright to correctly avoid premature skips under: no throttle, realistic (4Mbps) throttle, live production Vercel (desktop + 2 mobile device profiles), localhost with iPhone 14 Pro Max emulation, and localhost at 440px/300px plain viewport widths. **Never verified against an actual reproduction of the user's reported 26-30s real-world symptom, because that symptom has not been reproduced by the agent at all.** It is therefore unknown whether this fix addresses the user's real problem or is simply a correct-but-irrelevant improvement sitting alongside an unfound separate bug.
**Still present:** Yes, this is the current code.
**Recommendation:** Keep — it's a strict correctness improvement over both prior versions regardless of whether it's the fix for the user's actual complaint. But do not treat it as confirmed to have fixed the reported issue.

### Change E — `onError` handler addition (KEPT, part of Change D)
Same as above — bundled with Change D.

### Change F — HomeExtras.tsx / AwardsVideo → ClickToPlayVideo (KEPT, unrelated to Hero)
**Before:** `<video src="..." controls preload="metadata" poster="...">`, eagerly downloading the full file on every page visit despite `preload="metadata"`.
**After:** New `src/components/HomeExtras/ClickToPlayVideo.tsx` client component; video element only mounts in the DOM after a user click on a poster+play-button overlay.
**Verified:** 0 bytes transferred before click, exactly 1 request (1,623,210 bytes, the re-encoded file) after a direct click.
**Still present:** Yes.
**Recommendation:** Keep. Not related to the Hero bug under investigation, but was part of the same overall performance effort and is confirmed working.

### Environment/tooling changes (not code, listed for completeness)
- `ffmpeg` (Gyan.FFmpeg via winget) installed and later uninstalled **twice** over the course of this session (once for the Hero videos, uninstalled per user request; reinstalled for the `KHS-Video.mp4` work, uninstalled again). **Current state: not installed.**
- `.next` directory deleted once (Phase 6) to clear a suspected stale Turbopack cache. This is not a persistent change — a fresh `.next` is regenerated automatically on next `next dev`/`next build`.
- A stray scratch file (`.ffmpeg-path.txt`) was briefly created in the repo root and deleted before it could be committed.

---

## 2. Complete Root Cause Analysis

| Hypothesis | Classification | Reasoning |
|---|---|---|
| Original timer not gated on video readiness | **Confirmed** (as a real bug that existed) | Directly read from source; matched reported timing to the exact `duration` constants. Now fixed (Change D). |
| 15s fallback cap (agent's own first fix) causing premature skip | **Confirmed** (as a real, self-introduced regression) | Logically follows from the code; user report of "still broken" after this fix is consistent with it. Now fixed (Change D). |
| Oversized video files causing genuinely slow loads | **Confirmed** as a real prior issue, **and fixed** | Directly measured via `ffprobe`/file size before and after. |
| Unrelated 8.5MB `KHS-Video.mp4` competing for bandwidth | **Confirmed** as real, **and fixed**, but **eliminated** as a cause of the Hero-specific symptom (different component, doesn't block Hero's video element) |
| `media="(max-width:767px)"` breakpoint value itself being wrong | **Eliminated** | Directly tested 300px and 440px side-by-side with `matchMedia` instrumentation — identical results at both, both correctly under the only breakpoint that exists in the code. |
| A separate, width-dependent JS code path in Hero.tsx | **Eliminated** (based on source reading) | There is no viewport-conditional JavaScript in `Hero.tsx` — width only affects which native `<source>` a browser selects. Desktop and mobile execute identical React logic. |
| Service worker serving stale cached responses | **Eliminated** | Grepped codebase and `public/` for any service worker registration or `sw.js`/`workbox` file — none exist in this project. |
| Dev-mode overhead (unminified bundle, HMR) | **Eliminated as the sole cause** | Measured JS payload at only 51KB; also reproduced testing directly against production Vercel (no dev-mode) with the same non-reproduction result. |
| Real mobile network/WiFi conditions (phone ↔ router ↔ dev machine) | **Eliminated for the current phase of testing** — this was the leading theory during the LAN-IP dev-server testing phase, but the user has since reproduced the symptom on production Vercel and via localhost + DevTools emulation, where this explanation does not apply (Vercel is a CDN, not the user's home WiFi; localhost+DevTools involves no real network hop at all). |
| Chrome DevTools Network throttling left on from a prior session | **Eliminated** | User explicitly checked and confirmed "No throttling." |
| Stale Turbopack dev cache serving an old JS bundle | **Still Possible, weakly** | `.next` was cleared once (Phase 6), but this was never re-verified afterward, and it doesn't explain the production-Vercel reproduction (no Turbopack dev cache exists in a Vercel production build). |
| Browser extension or real-Chrome-profile-specific interference | **Still Possible** | Not testable by the agent (Playwright uses a clean, extension-free Chromium profile). The only visible extension reference in the whole session was React DevTools, seen once in a stack trace. |
| Live-drag viewport resize without a genuine fresh page load | **Still Possible** | User reports "hard refresh" was performed, but the agent cannot independently verify the exact sequence of actions (device-mode toggle vs. reload timing) on the user's machine. |
| `.play()` promise silently rejecting (autoplay policy edge case) | **Not Yet Tested** | The code does `el.play().catch(() => {})` — any rejection is silently swallowed with no logging and no fallback UI. The poster→video opacity swap is driven by the `canplay` event, not by `.play()` succeeding, so this wouldn't obviously explain a *delay*, but it's an unhandled edge case that has never been specifically instrumented or ruled out. |
| A genuine, still-unidentified code defect | **Not Yet Tested / Cannot Rule Out** | No raw Network-tab data, HAR file, or console output has ever been captured from an actual failing session on the user's real hardware. This is the single biggest evidence gap (see Section 12). |
| Windows Defender / AV real-time scanning affecting the user's actual Chrome process differently than Playwright's separate Chromium binary | **Not Yet Tested** | Raised as a theory earlier in the investigation, never directly tested (would require Defender exclusion toggling + re-test, not performed). |

---

## 3. Browser Investigation

| Browser/condition | Tested? | Detail |
|---|---|---|
| Desktop Chrome (agent) | **Tested** | Via Playwright-driven Chromium (same rendering/JS engine as real desktop Chrome, but a separate, extension-free browser binary/profile). Multiple scripts, multiple times, always correct. |
| Desktop Chrome (user's real browser) | **Tested by user, reported working** | User states desktop works "perfectly." Agent has not seen this session directly. |
| Mobile Chrome (real Android device) | **Not Checked** | No real Android device was used by the agent at any point. |
| Mobile Chrome (via DevTools device toolbar, user's real Chrome) | **Reported by user, not observed by agent** | User describes doing this and seeing the delay; agent has no direct visibility into that session (no HAR, no screenshot, no console log from that specific session). |
| Safari (desktop or iOS) | **Not Checked** | Never tested in any form. WebKit has known historical quirks around `<source media>` and video autoplay that Chromium does not share — genuinely untested territory. |
| Firefox | **Not Checked** | Never tested. |
| Edge | **Not Checked** | Chromium-based, likely to behave like Chrome, but never directly tested. |
| Mobile emulation (Playwright `devices[...]`) | **Tested extensively** | `iPhone 13`, `Pixel 7`, `iPhone 14 Pro Max` device descriptors (full UA/viewport/touch/DPR emulation) against both localhost and production. Always correct. |
| Real devices (any) | **Not Checked by agent** | User tested their own real phone earlier in the session (LAN IP phase) and again later (implied, for the Vercel/production report) — agent never had direct access to a real device's DevTools/console/network panel. |
| Incognito testing | **Not Checked** | Never attempted by agent or reportedly by user. Would rule out extensions and existing site data/cache in one step. |
| Hard reload testing | **Tested by agent** (fresh `page.goto()` per script run, which is a hard/clean load by construction) and **reported by user** (Ctrl+Shift+R) — user's hard reload did not resolve the symptom on their end. |
| Cache disabled testing | **Not Checked** | Neither the agent's Playwright contexts nor the user's DevTools "Disable cache" checkbox state were explicitly verified. Playwright's fresh browser contexts have no prior cache by construction, so this is a soft "effectively yes" for the agent's own tests, but the checkbox itself was never confirmed on the user's end. |
| Network throttling | **Tested by agent** (CDP `Network.emulateNetworkConditions`, both extreme and realistic profiles) and **confirmed by user** (DevTools throttle dropdown = "No throttling"). |
| Viewport testing | **Tested extensively** — 300px, 390px, 430px, 440px, 767px boundary, 1440px desktop. See Section 4. |
| Media query testing | **Tested directly** — `window.matchMedia("(max-width: 767px)").matches` read explicitly in-page at 300px and 440px, both returned `true`. |
| Autoplay testing | **Partially tested** — no autoplay-block console errors were observed in any agent test, and `readyState` reliably reached 4. **Not tested:** whether `el.play()`'s returned Promise ever actually rejects in any scenario (the `.catch(() => {})` means this would be invisible even if it happened — see Section 14). |

---

## 4. Viewport Investigation

The code contains exactly **one** viewport-dependent construct: `media="(max-width: 767px)"` on the mobile `<source>` group (Hero.tsx line 211). There is no other width-conditional logic anywhere in `Hero.tsx` — no `useMediaQuery` hook, no `window.innerWidth` checks, no CSS-in-JS breakpoint logic affecting the video/timer state machine.

**767px breakpoint:** Chosen to match Tailwind's conventional mobile/tablet boundary. Verified functioning correctly at every tested width.

**440px:** User's reported DevTools-measured width where the bug occurs. Tested directly (`test-widths.mjs`, plain viewport resize, no device emulation) against `localhost:3000`: `matchMedia("(max-width:767px)")` → `true`; selected source → `ice-blue-mobile.mp4`; `readyState: 4` by t=4s; correct slide held through t=28s; correct advance to florentine at t=32s. **No anomaly found.**

**300px:** User's reported width where the bug "starts working." Tested identically to 440px, same script, same run. **Result was identical** to 440px in every measured respect — same source selected, same timing, same slide-hold duration.

**matchMedia:** Read directly via `page.evaluate(() => window.matchMedia("(max-width: 767px)").matches)` at both widths — `true` at both, as expected (both are under 767px).

**Source selection:** Confirmed via `video.currentSrc` read directly from the DOM at both widths — `ice-blue-mobile.mp4` at both.

**Why viewport size is not believed to be the cause:** 300px and 440px are on the *same side* of the only breakpoint in the code (both < 767px). For the user's report ("440 broken, 300 works") to be explained by the code as written, there would need to be a second, lower breakpoint somewhere between 300 and 440 — none exists in `Hero.tsx`, and a full-text search of the component confirms `767` is the only pixel breakpoint referenced. This conclusion rests entirely on the agent's own scripted, fresh-navigation-per-width tests; it does **not** rule out something specific to how the user is switching between the two widths in their own DevTools session (see Section 14, live-resize-without-reload).

---

## 5. Video Loading Investigation

**Verified via code + Playwright:**
- `preload`: `"auto"` when the slide is active, `"metadata"` otherwise (Hero.tsx line 201). Verified this value is actually applied via DOM inspection in test scripts.
- `poster`: two separate poster mechanisms exist simultaneously — a `next/image` `<Image>` element (the true LCP element, faded out via `isReady`) AND the native HTML5 `poster` attribute on the `<video>` element itself (Hero.tsx line 202, `poster={s.poster}`). This redundancy has never been flagged as a problem, but it is worth noting as an observation for the next engineer — it's not obviously wrong, just doubled up.
- Source selection: verified extensively (Section 4).
- `canplay` (`onCanPlay`): **the only readiness signal used by the component.** Verified firing via `readyState` reaching 4 in every test.
- `readyState` transitions: sampled directly in test scripts (`0` → `4` observed; intermediate values 1/2/3 were not specifically distinguished/logged, just polled at 1-4s intervals, so any *fast* transition through those intermediate states would not have been individually captured).
- `loadedmetadata`, `loadeddata`, `canplaythrough`: **Not Checked.** No handlers exist in the code for these events, and no test specifically listened for them. `readyState` polling captured the end state (4 = HAVE_ENOUGH_DATA) but not the granular event sequence leading there.
- `play` event / `.play()` resolution: **Not Checked.** The code calls `el.play().catch(() => {})` — the promise's rejection (if any) is silently discarded. No test has ever confirmed whether `.play()` actually resolves successfully in any scenario; only that `readyState` reaches 4 and the tagline/currentSrc report the expected slide. A video could theoretically be "ready" (bytes buffered) but never actually start playing if `.play()` silently rejects, and this would be invisible in every test performed so far.
- Buffering: not measured in detail beyond `readyState` polling. No `progress` event or `buffered` TimeRanges inspection was performed.
- Fade timing: `transition-opacity duration-700` (700ms) on both the poster `<Image>` and the `<video>` element, cross-faded via the shared `isReady` boolean. Visually confirmed correct via screenshots at two points in the session (desktop and mobile, early in the investigation) — not re-verified after the timer-logic changes in later phases.
- Poster-to-video transition timing: same 700ms cross-fade, confirmed via those same screenshots. Not measured with millisecond precision beyond "visually correct in a static screenshot."

---

## 6. Network Investigation

| Item | Status | Detail |
|---|---|---|
| Request timing | **Checked** | Via Playwright `response` event timestamps in multiple scripts. |
| Response timing | **Checked** | Same mechanism. |
| TTFB specifically | **Not Checked precisely** | Playwright's `response` event fires at response-headers-received, which is close to TTFB but was never isolated as its own explicit metric (total request→ready time was measured, not TTFB vs. download-time breakdown). |
| Download duration | **Not Checked precisely** | Same caveat — total elapsed time to `readyState:4` was measured; the split between "waiting for server" and "downloading bytes" was not separately measured by the agent. **This is exactly the data requested from the user in the last unanswered question of this session (Network tab Time/Size/waterfall) and never received.** |
| Waterfall analysis | **Not Checked** | No HAR export or waterfall visualization was captured or reviewed, from either the agent's tests or the user's browser. |
| Response headers | **Partially checked** | Confirmed via `curl -I`/response listener: `Accept-Ranges: bytes`, `Content-Type: video/mp4`, `Cache-Control: public, max-age=0, must-revalidate` (on Vercel), 206 status with correct `Content-Range` on both local dev and Vercel. |
| Accept-Ranges | **Checked** | Present and correctly `bytes` on both local dev server and Vercel production (confirmed via direct `curl` and via Playwright response headers). |
| Content-Length | **Checked** | Matched expected file sizes in every request logged. |
| Content-Type | **Checked** | `video/mp4` / `video/webm` as expected, confirmed in response headers. |
| HTTP version | **Not Checked** | Never explicitly inspected (HTTP/1.1 vs HTTP/2 vs HTTP/3) on either local dev or Vercel. |
| Caching (browser-level) | **Not Checked** | No test explicitly verified whether repeat loads hit browser HTTP cache vs. re-fetching over the network. |
| CDN behavior (Vercel specifically) | **Partially checked** | Response headers showed `server: Vercel` and an `x-vercel-id` routing through a `bom1` (Mumbai) edge region in every observed request — consistent region across tests, not verified against other regions. |
| Streaming support (range requests) | **Checked** | Explicitly confirmed via manual `curl -H "Range: bytes=0-1023"` — server correctly returns 206 with accurate `Content-Range`. |
| Compression (gzip/brotli on the video responses) | **Not Checked** | Video files are already compressed formats; content-encoding headers were not inspected, and this is not expected to be relevant, but was never explicitly ruled out. |

---

## 7. Video File Investigation

All four Hero source videos (pre-re-encode) and the post-re-encode desktop/mobile variants for `ice-blue` specifically were probed with `ffprobe`. The other three slides' post-re-encode variants were **not individually re-probed** after encoding — their correctness was inferred from the `ffmpeg` command succeeding and the resulting file sizes matching expectations, not from a second round of `ffprobe` verification.

| Property | Checked? | Detail |
|---|---|---|
| File size | **Checked**, all files, before and after | See tables in Phase 1 and Phase 5. |
| Resolution | **Checked** (originals: all 1280×542; `KHS-Video.mp4`: 1920×1080 original, re-encoded to 1280×720) | Via `ffprobe -show_entries stream=width,height`. |
| Duration | **Checked** | ice-blue 30.03s, florentine 28.07s, flexi 12.03s, rotor 12.03s (originals); `KHS-Video.mp4` 6.81s. |
| Bitrate | **Checked** (originals and `KHS-Video.mp4`) | Originals 1.48-2.14 Mbps combined; `KHS-Video.mp4` original 10.38 Mbps video-only. **Post-re-encode bitrate was not individually re-probed** for the Hero videos — inferred from final file size ÷ duration, not measured directly per-stream. |
| Codec | **Checked** | All originals H.264/yuv420p + AAC audio. Re-encode targets specified as `libx264`/`libvpx-vp9` explicitly in the `ffmpeg` commands (i.e., known by construction, not re-verified by `ffprobe` after the fact for every output file). |
| Encoding profile (H.264 profile/level) | **Not Checked** | `ffprobe`'s `profile` field was requested in the very first probe command but the output shown did not include it in the captured results; never explicitly re-checked. |
| GOP structure | **Not Checked** | Never inspected keyframe interval/GOP size for any file. |
| moov atom position | **Checked for `KHS-Video.mp4` only** | Confirmed near file start (offset 48) via `ffprobe -v trace`, ruling out a faststart problem for that specific file. **Not checked for any of the 16 Hero video variants** — `-movflags +faststart` was specified in every encode command, which by construction should place moov at the front, but this was never independently verified with the same trace technique used for `KHS-Video.mp4`. |
| Faststart | **Assumed via encode flag, not independently verified** for Hero videos; **directly verified** (moov near front) for `KHS-Video.mp4`, though that file didn't actually have a faststart problem in the first place (the "full download despite `preload=metadata`" issue was something else — see Phase 5). |
| Streaming optimization (general) | **Partially checked** — Range request support confirmed server-side (Section 6); per-file streaming readiness (moov position) only directly confirmed for one file. |
| MediaInfo results | **Not Checked** | `MediaInfo` tool was never used; all analysis used `ffprobe` exclusively. |

---

## 8. Mobile Investigation

| Item | Status |
|---|---|
| Android (real device) | **Not Checked** — no real Android device accessed by agent. |
| iPhone (real device) | **Not Checked** — no real iOS device accessed by agent. |
| Chrome Android | **Not Checked** as a real browser; only Playwright's Chromium with Android-shaped device descriptors (`Pixel 7`), which emulates viewport/UA/touch but runs the same desktop-class Chromium binary underneath, not actual Android Chrome. |
| Safari iOS | **Not Checked at all**, in any form, real or emulated. WebKit is a materially different engine from Chromium/Blink for video/media-query edge cases — this is a real gap if the user's phone is an iPhone. |
| Samsung Browser | **Not Checked.** |
| Autoplay restrictions | **Not directly tested for failure modes** — no test forced an autoplay-block scenario; absence of console errors in passing tests is not the same as confirming the restriction was properly handled under real mobile OS/browser autoplay policies (which can differ from desktop Chromium's). |
| Preload restrictions (carrier/OS-level data saver) | **Not Checked** — raised as a theory (Chrome Data Saver / Lite Mode) in an earlier response to the user, never actually tested or confirmed/denied. |
| Hardware decoding | **Not Checked** — no investigation into whether the video codec/profile is hardware-decodable on the user's actual device; software-decode fallback could plausibly be slower on lower-end hardware, never explored. |
| Battery optimization / background throttling | **Not Checked** — mobile OS power-saving modes that throttle background network/CPU were never considered or tested. |
| Browser Data Saver | **Raised as a hypothesis to the user, never confirmed or denied by them, never independently tested by the agent.** |
| Viewport differences | **Extensively tested** — see Section 4. |
| DPR (device pixel ratio) differences | **Not specifically tested for its own effect** — Playwright device descriptors (`iPhone 13`, `Pixel 7`, `iPhone 14 Pro Max`) include their real DPR values by construction, so DPR *was* present in those tests, but no test specifically varied DPR independent of viewport width to isolate its effect. |

**Key honesty point for this section:** everything under "mobile investigation" that used Playwright device descriptors is genuinely useful for viewport/UA-string-shaped behavior, but it is **still Chromium** underneath — it does not surface real iOS Safari, real Android hardware decoding limits, real carrier network conditions, real battery-saver throttling, or real OS-level data-saver proxying. If the user's actual phone is an iPhone, the single biggest untested variable in this entire investigation is **WebKit/Safari's own video and media-query behavior**, which has historically diverged from Chromium's in exactly the areas this bug touches (`<source media>` re-evaluation timing, autoplay policy specifics, preload hint handling).

---

## 9. Next.js Investigation

| Item | Status | Detail |
|---|---|---|
| App Router vs Pages Router | **Checked** | Confirmed App Router (`src/app/` directory with route folders present). |
| Client Components | **Checked** | `Hero.tsx` and the new `ClickToPlayVideo.tsx` both explicitly marked `"use client"`. |
| Server Components | **Not specifically audited** | Not investigated whether `Hero.tsx`'s parent page/layout is a Server Component and how the client boundary is structured beyond confirming Hero itself is client-side. |
| Hydration | **Not directly instrumented** | No hydration-specific logging or `onHydrated`-style verification was added; the "arm after two rAFs" pattern in the existing code is explicitly designed around not racing hydration (per its own code comment), but this design intent was never independently stress-tested by the agent — it was inherited from the pre-existing implementation, not something the agent verified from scratch. |
| Strict Mode | **Not Checked** | `next.config.ts` does not explicitly set `reactStrictMode`; the framework default was never confirmed, and no test specifically checked for Strict Mode's intentional double-invocation of effects/state-setters possibly affecting this component's several `useState`/`useEffect` interactions. |
| Middleware | **Checked, does not exist** | No `middleware.ts`/`middleware.js` found at the project root. |
| Route handlers | **Not Checked** | Not investigated (not obviously relevant to a static video asset, but not explicitly ruled out either). |
| Static assets / `/public` folder | **Checked extensively** | All video files live under `public/assets/khs/...`; served directly, confirmed via `curl` and Range-request tests on both local dev and Vercel. |
| `next.config.ts` | **Read in full** | Notable finding: contains `allowedDevOrigins: ["192.168.1.*"]` with an existing code comment explaining that without it, "pages load but hydration/HMR silently fail on any device that isn't 'localhost' itself" when accessed via LAN IP. **This is directly relevant prior art for the earlier phase of testing** (when the user was accessing the dev server via `http://192.168.1.8:3000` from a real phone) — it confirms hydration-blocking on cross-origin dev requests was a previously known risk for this exact project, already mitigated for the `192.168.1.*` range specifically. **Not verified:** whether hydration was actually succeeding on the user's real phone during that earlier LAN-IP test phase — the agent never directly inspected that device's console. This mitigation is also irrelevant to the *current* phase of testing (Chrome DevTools device emulation on `localhost` — same origin, not a LAN IP, so this setting doesn't apply either way there). |
| Next.js Image optimization | **Not directly investigated for the Hero poster images**, though the unrelated pre-existing console warnings about `jaquar.webp`/`kohler...webp`/etc. width/height mismatches were noticed and flagged to the user as a separate, unaddressed issue. |
| Asset delivery (general) | **Checked** | Confirmed correct `Content-Type`, `Accept-Ranges`, and successful 206 partial-content responses on both local dev and Vercel. |

**Process note the next engineer should know:** this repository's `AGENTS.md` explicitly instructs: *"This is NOT the Next.js you know. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code."* **This was not done during this investigation.** Given the project is on Next.js 16.2.10 (a very recent major version) with Turbopack as the dev bundler, there may be version-specific behavior (around static asset serving, Range request handling, or dev-server caching) that differs from general Next.js knowledge and was never cross-checked against this project's actual bundled documentation. This is a real process gap, not just a formality — worth doing before further debugging.

---

## 10. React Investigation

**State updates:** Four pieces of state drive this component — `current` (active slide index), `armed` (Set of slide indices with a mounted `<video>`), `ready` (Set of slide indices whose video fired `canplay`), `errored` (Set of slide indices whose video fired `onError`), plus a `lastArmedFor` used to gate the "preload next slide" side effect. All were read directly in test scripts via `page.evaluate` against DOM-visible proxies (`currentSrc`, `readyState`, tagline text) — **the actual internal state values (`armed`/`ready`/`errored` Set contents) were never directly logged or inspected**; only their externally-observable effects (which video plays, which text shows) were checked. This means it's possible for the *internal* state to be behaving unexpectedly in a way that happens to still produce correct *external* behavior in every test run so far, without that being detected.

**Effects:** Three `useEffect` hooks in the component: (1) double-rAF arm-after-paint, (2) the timer/advance effect (heavily modified across this investigation, see Section 1), (3) play/pause management for the active vs. inactive video elements. All three were read and reasoned about in detail; only effect (2) was modified.

**`requestAnimationFrame` usage:** The double-RAF pattern in effect (1) exists specifically to guarantee the poster paints before the video is "armed" (i.e., before a `<video>` element with real `<source>` children is even mounted). This was inherited from the pre-existing implementation; its correctness was never independently re-derived or stress-tested by the agent — it was trusted as-is throughout.

**Rendering:** Standard conditional rendering (`{isArmed && (<video>...)}`) — confirmed via test scripts that `currentSrc` is `null`/element absent before arming and correctly populated after.

**Hydration:** See Section 9 — not independently instrumented.

**Re-renders:** Not profiled. No React DevTools Profiler session or render-count instrumentation was used at any point; all verification was black-box (observed final DOM/network state), not white-box (observed actual render frequency/cause).

**Video refs:** `videoRefs.current[index]` array pattern, used to call `.play()`/`.pause()` imperatively and reset `.currentTime`. Logic was read and reasoned about but not unit-tested in isolation.

**Event handlers:** `onCanPlay` and `onError` on the video element (both added/modified by this investigation); `onClick` on the dot-navigation buttons (pre-existing, unrelated, not investigated).

**Transitions:** `framer-motion`'s `AnimatePresence`/`motion.div` for the text content overlay — not investigated at all in this session; assumed unrelated to the video-loading symptom (the reported bug is specifically about the video, not the text animation) but this assumption was never explicitly tested.

**Why React is/isn't believed to be responsible:** No specific evidence points to React itself (versus the video/network layer) as the culprit. The component's state machine has been read closely and reasoned through multiple times across this investigation, and the current version's logic is sound *as reasoned through* — but "sound on paper, confirmed via black-box DOM/network testing" is not the same as "confirmed via internal state inspection," which was never done. This is a gap, not a clean bill of health.

---

## 11. Performance Optimizations Already Implemented

| Optimization | Why it exists |
|---|---|
| Poster-first strategy (separate `next/image` poster + native `poster` attribute) | Ensures a real photo is the LCP element and paints immediately, rather than competing with video fetch/decode on first paint. Pre-existing design, inherited not authored by this investigation. |
| Delayed arming (video `<source>` not mounted until after paint) | Keeps the main thread free for hydration instead of starting a video fetch from frame one. Pre-existing. |
| Double `requestAnimationFrame` | Guarantees a committed paint has actually occurred before arming, more reliable than a single RAF or a timeout. Pre-existing. |
| `preload="auto"` for active / `"metadata"` for inactive | Only the visible slide aggressively preloads; others fetch minimally until their turn. Pre-existing, though Phase 5's finding (that `preload="metadata"` didn't actually limit `KHS-Video.mp4`'s download in Chromium) casts some doubt on how much this hint is actually honored in practice — not re-tested specifically for the Hero videos' `preload="metadata"` state. |
| Next-slide buffering (`armed` gains `current+1` once `current` is ready) | Avoids a cold fetch at the moment of transition, while never having more than two videos loading at once. Pre-existing. |
| Fade animation (700ms cross-fade, poster↔video) | Visual polish, masks the exact moment of readiness. Pre-existing. |
| Pause inactive videos | Prevents inactive slides' videos from competing for bandwidth/decode resources. Pre-existing. |
| Readiness-gated auto-advance timer (this investigation's fix) | Prevents a slide from being skipped before its video ever displayed. New in this investigation (Change D). |
| Error-based (not time-based) skip fallback | Avoids the previous fix's own regression (Change C → D). New in this investigation. |
| Responsive multi-format sources, smallest-file-first ordering | Reduces payload per device class; avoids blindly preferring WebM when it doesn't actually win. New in this investigation (Change A). |
| Video re-encoding (size/bitrate reduction) | Reduces absolute payload size. New in this investigation (Change B). |
| Click-to-play for the unrelated Awards video | Eliminates ~1.5-8.5MB of unnecessary eager download on every homepage visit. New in this investigation (Change F), unrelated component. |

---

## 12. Unknowns

These are the open questions with **no evidence either way** at handoff time:

1. **What does the actual Network tab waterfall look like during a real failing repro on the user's machine?** This was explicitly requested from the user and never received. This is almost certainly the single most valuable missing piece of evidence — without it, every hypothesis in this document is inference, not proof.
2. **Is the user testing on iPhone (Safari engine, even if "Chrome" is installed — iOS forces WebKit under the hood for all browsers) or Android?** Never established. This materially changes which hypotheses are even plausible.
3. **Was the "hard reload" performed with device mode already active, or did device mode get toggled after an initial desktop load, without a subsequent fresh navigation?** Never confirmed.
4. **Does the console warning (Section, Phase 6) still occur after the `.next` cache clear?** Action was taken, but never re-verified.
5. **Does `.play()` ever actually reject in any tested or real scenario?** Never instrumented — the `.catch(() => {})` makes this invisible by design.
6. **Is there a real difference between the user's actual installed Chrome (version, flags, extensions, profile data) and Playwright's clean Chromium instance?** Never compared directly.
7. **What exactly did the "four videos in under 7 seconds" network log from Phase 7's first production test represent?** A plausible explanation (background preloading, not visible skipping) was inferred from a follow-up test, but the two tests were never directly reconciled against each other line-by-line.
8. **Has this project's own bundled Next.js 16 documentation (`node_modules/next/dist/docs/`) been checked for version-specific static-asset-serving or dev-cache behavior that could explain any of this?** Per the project's own `AGENTS.md` instructions, this should have been done and was not.
9. **Is Chrome's Data Saver / Lite Mode enabled on the user's phone?** Raised as a question to the user, never answered.
10. **What does `MediaInfo` (as opposed to `ffprobe`) report for any of these files?** Never checked; unlikely to reveal anything `ffprobe` wouldn't, but technically a different tool the user's original request asked about.

---

## 13. Remaining Possible Causes (Ranked)

These confidence percentages are the agent's own rough estimate given the evidence gathered, **not a statistical calculation** — they should be read as "how surprised would I be if this turned out to be the cause," not as a rigorous probability.

1. **Something specific to the user's real device/browser/network path that cannot be observed remotely (real Safari/iOS behavior, a real extension, real carrier/WiFi conditions, real Data Saver mode) — ~30%.** Supporting evidence: every controlled, scripted, fresh-navigation test the agent has run (across dev server, throttled dev server, production Vercel, multiple device profiles, multiple exact viewport widths) has failed to reproduce the symptom. Evidence against: this is somewhat unfalsifiable as stated and risks becoming a catch-all; needs the Network tab data from Section 12 to move from "leading theory" to "confirmed."
2. **A genuine code defect not yet identified, possibly React-internal-state-related (see Section 10's gap around never inspecting actual `armed`/`ready`/`errored` Set contents) — ~20%.** Supporting evidence: black-box testing (external DOM/network observation) has passed every time, but internal state was never directly inspected, so a bug that happens to still produce correct external behavior in short scripted test runs (but not in a longer, more organic real usage session) cannot be ruled out. Evidence against: the logic, read closely multiple times, is straightforward and has no obvious hidden state-thrashing path.
3. **Live-resize-without-fresh-navigation on the user's end, muddying the width-vs-outcome correlation they observed — ~20%.** Supporting evidence: this exact mechanism would perfectly explain "300px seems to fix it" without 300px actually being causal. Evidence against: user states they did perform a hard reload; agent cannot verify the precise sequence.
4. **Something in `.play()` silently failing under specific conditions — ~10%.** Supporting evidence: it's a genuinely unhandled/unlogged edge case. Evidence against: doesn't obviously produce a *time delay* symptom (readiness/opacity swap doesn't depend on `.play()` succeeding), so it's a plausible *secondary* bug at best, unlikely to be *the* explanation for "26-30 second delay."
5. **Stale Turbopack dev-server cache/bundle on the user's specific dev-server process — ~10%.** Supporting evidence: the console warning in Phase 6 shows this class of issue is real for this project. Evidence against: doesn't explain the Vercel-production reproduction (no Turbopack dev cache exists there), and the user reports the *same* symptom in both environments.
6. **Antivirus/Defender or OS-level interference specific to the user's Chrome process — ~5%.** Supporting evidence: none direct, purely theoretical. Evidence against: never tested, and doesn't obviously explain why desktop viewport in the same browser would be unaffected.
7. **A genuine, reproducible-in-principle bug that simply requires a longer/more organic test session than any of the ~30-40 second scripted tests performed so far — ~5%.** Supporting evidence: none of the agent's tests ran longer than ~40 seconds; if there's a slow-onset issue (memory pressure, a leak, a very-delayed timer conflict) it could be invisible in short runs. Evidence against: user's own reports describe the delay happening on the *first* slide, immediately, not after extended use.

---

## 14. Hidden Assumptions

Things assumed true but never experimentally verified in this investigation:

- That the user's phone/browser is Chromium-based (never confirmed — could be Safari/iOS, which was never tested at all).
- That the user's "hard reload" was performed at the same viewport width as the observed failure, with device mode already active before reloading.
- That Playwright's Chromium (extension-free, clean profile) behaves identically to the user's actual installed Chrome (with whatever extensions/profile data/flags it has).
- That `readyState: 4` (as observed in every agent test) is equivalent to "the user perceives the video as visible and playing" — the opacity-based cross-fade and `.play()` success were never independently confirmed alongside `readyState`.
- That the `.next` cache-clear in Phase 6 actually resolved the console warning (action taken, never re-verified).
- That the four-videos-in-seven-seconds anomaly from Phase 7 was definitely just background preloading and not a real (if currently harmless-looking) over-eager-preload issue — inferred, not proven.
- That no browser extension, security software, or corporate/ISP-level network middleware is involved on the user's end.
- That the `-movflags +faststart` flag actually produced a front-loaded moov atom for all 16 re-encoded Hero video files (only independently verified for the unrelated `KHS-Video.mp4`, not for any Hero video).
- That React Strict Mode's status (on/off, and its double-invocation behavior in dev) has no bearing on this component's effect-heavy state machine — never checked either way.

---

## 15. Project-Wide Investigation

| Area | Could it be responsible? | Reasoning |
|---|---|---|
| CSS / Tailwind | **Unlikely, not deeply checked** | The `aspect-video`, `object-cover`, opacity-transition classes were read and appear correct; no CSS-driven layout thrashing was specifically profiled. Not a strong suspect given the symptom is about *video loading*, not layout. |
| Global styles | **Not Checked** | No global stylesheet was audited for anything that could affect video rendering/loading. |
| `next.config.ts` | **Partially responsible historically (LAN IP hydration), checked and understood** | See Section 9 — the `allowedDevOrigins` setting is directly relevant prior art but doesn't apply to the current DevTools-emulation testing phase. |
| Vercel (platform-level) | **Checked, found correctly configured** | Range requests work, headers correct, CDN region consistent (`bom1`), production reproduction attempts all passed. |
| Asset hosting / CDN | **Checked for Vercel specifically; not checked for any other layer** (e.g., if there's a corporate proxy, ISP-level transparent proxy, or DNS-level filtering between the user's phone and either localhost or Vercel — none of this is visible to a remote agent). |
| DNS | **Not Checked** | Not investigated at all; unlikely to matter for `localhost` testing specifically, more relevant for the Vercel domain, but never checked (e.g., DNS resolution time, whether the user's phone resolves the Vercel domain to a suboptimal edge region). |
| MIME types | **Checked** | Confirmed `video/mp4` / `video/webm` in response headers on both local dev and Vercel. |
| Server configuration | **Checked for the two servers actually used** (Next.js dev server, Vercel) — no other server configuration (e.g., a reverse proxy) is known to be in the picture, but this was never explicitly asked about. |
| HTTP headers (general) | **Checked, see Section 6.** |
| Video encoding | **Checked extensively, see Section 7.** |
| Browser caching | **Not Checked** — see Section 6. |
| Network conditions | **Checked via simulation (CDP throttling), not via real measurement of the user's actual connection.** |

---

## 16. If I Had One More Hour

In priority order, each step chosen because it directly targets the biggest evidence gap (Section 12, item 1) rather than adding another scripted reproduction attempt that's likely to pass again without new information:

1. **(15 min) Get a real HAR file or screen recording from the user's actual failing session.** Ask them to open DevTools → Network tab → check "Preserve log," reproduce the bug once (fixed width, hard reload, wait for the delay), then right-click the network panel → "Save all as HAR with content," and send the file. This is the single highest-value action possible — every hypothesis in this document becomes either confirmed or eliminated once the actual waterfall is visible. *Tests: literally everything at once — TTFB vs download time, which exact resource is slow, whether it's even a video request that's slow versus something else entirely (e.g., a blocking font/JS resource delaying hydration first).*
2. **(10 min) Ask the user directly: iPhone or Android?** If iPhone, immediately elevate Safari/WebKit-specific behavior (Section 8's biggest gap) to the top suspect, since it has never been tested in this investigation at all — not even via emulation. *Tests: whether the "Chromium-only testing" blind spot (Section 3, Section 8) is actually the explanation.*
3. **(15 min) If Safari/iOS is confirmed, test directly:** either find a physical iOS device or an online BrowserStack/LambdaTest-style real-device session, load the exact same localhost tunnel (e.g., via `ngrok` or Vercel's own preview URL) on real Safari, and watch what happens. *Tests: Safari-specific `<source media>` re-evaluation timing, autoplay policy differences, and `preload` hint handling — all previously "Not Checked."*
4. **(10 min) Instrument the component temporarily** with visible on-screen debug text (not just console.log, since the user may not have console open) showing live `current`, `armed`, `ready`, `errored`, and `video.readyState` values, deploy or run locally, and have the user reproduce the bug while watching that overlay. *Tests: Section 10's biggest gap — whether internal state actually matches what black-box DOM observation has been implying.*
5. **(10 min) Confirm exactly how the user is toggling device mode + reloading.** Screen-share or a recorded video of the exact click sequence (open DevTools → toggle device toolbar → select/type width → reload) would immediately confirm or eliminate the "live-resize without fresh navigation" hypothesis (Section 13, #3). *Tests: whether the reported width correlation (440 broken / 300 works) is causal or coincidental.*

---

## 17. Engineering Handoff Summary

**Current implementation:** `Hero.tsx` is a 4-slide autoplaying muted video carousel. Each slide has a real poster photo (LCP element, `next/image`) that cross-fades to a background video once that video's `canplay` event fires. Videos are served as responsive multi-format sources (mobile/desktop × mp4/webm, ordered smallest-file-first per measured size) via native `<source media="(max-width:767px)">` selection — verified working correctly at 300px, 390px, 430px, 440px, and 1440px in every test performed. The slide-advance timer waits indefinitely for a slide's video to become ready (no fixed timeout), and only advances early on a genuine `onError` load failure. Video assets were re-encoded to cut payload 70-93%; a separate, unrelated 8.5MB video elsewhere on the homepage was also fixed (compressed + converted to click-to-play).

**What has already been ruled out** (with real testing, not assumption): the `767px` breakpoint value itself; any width-dependent JavaScript code path (none exists); a service worker; DevTools network throttling (user confirmed off); dev-mode-specific overhead (reproduced identically on production Vercel); the originally-oversized video files (already fixed and verified); the unrelated `KHS-Video.mp4` competing for bandwidth (fixed, and it's a different component anyway).

**What still needs investigation, in priority order:** (1) a real Network-tab HAR/waterfall from an actual failing session — never obtained despite being requested; (2) whether the user's phone is iOS (Safari engine) — never confirmed, and Safari has literally never been tested in any form in this entire investigation; (3) whether `.play()` is silently rejecting in some scenario (unhandled, unlogged); (4) direct inspection of the component's actual internal state (`armed`/`ready`/`errored`) during a real failing session, rather than only inferring from external DOM/network observation.

**Biggest risks:**
- The investigation has been entirely Chromium-based (Playwright). If the real device is an iPhone, an entire class of browser-engine-specific behavior has never been tested, and everything in this document's "no bug found" conclusions should be treated as **Chromium-specific**, not universal.
- No raw evidence (HAR, screen recording, or direct console access) has ever been obtained from the user's actual failing session. Every conclusion in this document is inference from either (a) the agent's own scripted, non-reproducing tests, or (b) the user's verbal description of symptoms and settings.
- The fix history includes one self-introduced regression (Change C) that was caught only because the user re-reported the bug — a reminder that "should work" reasoning was insufficient once already in this exact investigation, and the current fix (Change D) has the same unverified-against-reality status Change C had before it was disproven.

**Most likely root causes, per the agent's own ranking (Section 13):** something specific to the user's real, unobserved device/browser/network (~30%); an as-yet-unidentified code defect, possibly in internal state handling that hasn't been directly inspected (~20%); a testing-methodology artifact (live-resize without fresh navigation) on the user's end, making the 300-vs-440 correlation coincidental rather than causal (~20%); with several lower-confidence possibilities behind those.

**Recommended next debugging step:** stop writing new reproduction scripts against clean, scripted, short-duration test conditions — that path has been run at least eight distinct ways (Sections 3, 4, 8) and has not once reproduced the symptom. The highest-value next action is obtaining a real HAR file or screen recording from the user's actual failing browser session, and separately confirming whether their device is iOS or Android. Everything else in this document is downstream of that missing evidence.

**Observations that should not be overlooked:**
- `next.config.ts`'s existing `allowedDevOrigins` comment is a pre-existing acknowledgment that this exact project has previously had a real hydration-blocking bug for non-localhost dev access — worth re-reading in full before assuming today's bug is unrelated to that class of issue.
- This repository's `AGENTS.md` explicitly instructs reading `node_modules/next/dist/docs/` before writing code, due to this being a non-standard/bleeding-edge Next.js version. That was not done during this investigation and should be done before further changes.
- The component's own code comments (poster-first strategy, double-RAF, next-slide preloading) describe deliberate, non-obvious design decisions inherited from before this investigation began — read them before changing that logic further, since they encode reasoning that isn't restated in this handoff.
