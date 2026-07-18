# Phase 2 Investigation — Evidence Collected

**Critical framing, read before anything else:** I still cannot reproduce the 29-second delay. Every number below comes from a run where the video loaded fast and correctly. That means this data is a **clean baseline** — useful for ruling things out, useless as a direct dissection of your actual failure. Wherever I only have baseline data instead of failure data, I've labeled it explicitly. I have not padded any section with guesses.

Three test conditions used throughout, all via Playwright-driven Chromium (still not a real device, still not Safari — see the caveats in every section):
- **LOCAL DEV** — `http://localhost:3000/`, iPhone 14 Pro Max emulation (430×932, real UA string, touch, DPR)
- **PRODUCTION** — `https://khs-website-nu.vercel.app/`, same device emulation
- **LOCAL DEV (desktop)** — 1440×900, no device emulation, for comparison

---

## 1. Network Waterfall Investigation

**What I tested:** Real per-request timing via Playwright's `request.timing()` API (backed by Chrome's own network timing, the same underlying data DevTools' waterfall renders from) plus full response/request headers, for the `ice-blue` video request on all three conditions.

**How I tested it:** Injected a `response` listener, captured `req.timing()` (which exposes `domainLookupStart/End`, `connectStart/End`, `secureConnectionStart`, `requestStart`, `responseStart`, `responseEnd` — the same fields as DevTools' DNS/Connection/SSL/TTFB/Content-Download breakdown) plus all response and request headers.

**Raw data:**

| Condition | File | Status | DNS | Connect | SSL | Request→Response(TTFB) | Content Download | Content-Length | Content-Range |
|---|---|---|---|---|---|---|---|---|---|
| LOCAL DEV desktop | `ice-blue-desktop.webm` (initial) | 206 | -1 (n/a, loopback) | -1 (n/a) | -1 (n/a) | 13.4ms | 179.4ms | 1,650,330 | `bytes 0-1650329/1650330` |
| LOCAL DEV desktop | same, follow-up range request | 206 | -1 | -1 | -1 | 2.3ms | 0.9ms | (partial) | `bytes 1638400-` |
| LOCAL DEV mobile | `ice-blue-mobile.mp4` | 206 | -1 | -1 | -1 | 4.8ms | 4.2ms | 549,540 | `bytes 0-549539/549540` |
| PRODUCTION mobile | `ice-blue-mobile.mp4` | 206 | -1 | -1 | -1 | 92.9ms | 101.3ms | 549,540 | `bytes 0-549539/549540` |

`-1` for DNS/Connect/SSL is Chrome's own timing API reporting "not applicable" — on `localhost` there's no real DNS/TCP handshake to measure, and on the Vercel request the connection was evidently reused/pooled (no fresh handshake for this particular request in this run). This is a genuine limitation: **I did not capture a cold/first-ever connection's DNS+Connect+SSL breakdown**, only warm-connection numbers.

**Response headers (production, full):**
```
HTTP/1.1 206 Partial Content
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 27443
Cache-Control: public, max-age=0, must-revalidate
Content-Disposition: inline; filename="ice-blue-mobile.mp4"
Content-Length: 1024   (this is the Range-limited response; full file is 549540)
Content-Range: bytes 0-1023/549540
Content-Type: video/mp4
Etag: "7e011e374bbfd695dc95514d36e8eb3a"
Last-Modified: Sat, 18 Jul 2026 09:56:43 GMT
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /assets/khs/hero-video/ice-blue-mobile.mp4
X-Vercel-Cache: HIT
X-Vercel-Id: bom1::448g9-1784396046355-c9432f4a5a1f
```
`X-Vercel-Cache: HIT` and `Age: 27443` confirm this file is being served from Vercel's edge cache (cached ~7.6 hours at request time), not re-fetched from origin per-request.

**Request headers:** Browser sent `Range: bytes=0-` (open-ended, i.e. "give me everything from byte 0") for the initial fetch in every test — consistent across local and production.

**HTTP version:** **Not Checked.** The `curl` binary available in this environment doesn't support `--http2` (`the installed libcurl version does not support this`), and Playwright's `timing()` API doesn't expose the negotiated HTTP version directly. I did not find a reliable way to confirm HTTP/1.1 vs HTTP/2 vs HTTP/3 for the Vercel connection in this session.

**Compression:** No `Content-Encoding` header present on any video response (local or production) — compression is correctly not applied to already-compressed video, as expected.

**Where is the time actually being spent, per this baseline data:** Effectively nowhere — total TTFB+download for the mobile file was under 10ms locally and ~194ms on production (mostly TTFB, likely first-byte latency to Vercel's Mumbai edge (`bom1`) from wherever this sandbox is networked). **This says nothing about where your real 29 seconds go** — it only proves the server/CDN side is fast when the request behaves normally. If your real device takes 29 seconds, either the request never starts promptly (something upstream of the network request itself — JS execution, hydration, a blocking earlier resource) or the request behaves completely differently on your device than it did here (different route, different connection reuse, different regional edge, a proxy in between, etc.) — I have no data confirming or ruling out either.

---

## 2. Chrome Media Panel — Full Event Timeline

**What I tested:** The complete HTML5 media element event sequence (`loadstart`, `durationchange`, `loadedmetadata`, `loadeddata`, `canplay`, `canplaythrough`, `progress`, `suspend`, `waiting`, `stalled`, `error`, `abort`, `emptied`) via `addEventListener`, not the DevTools Media panel UI itself (see caveat below).

**Important caveat on methodology:** The DevTools "Media" panel is a UI feature, not something Playwright can screen-record or export programmatically. What I captured instead is the same underlying browser events that panel displays, via direct JS instrumentation injected before page load. This is equivalent data, not the same tool — flagging so nobody assumes I opened and recorded the actual Media panel.

**Raw event timeline — LOCAL DEV, iPhone 14 Pro Max emulation:**
```
[1373.7ms] loadstart        { readyState: 0, currentSrc: 'ice-blue-mobile.mp4' }
[1449.6ms] durationchange   { readyState: 1, currentSrc: 'ice-blue-mobile.mp4' }
[1450.9ms] loadedmetadata   { readyState: 1, currentSrc: 'ice-blue-mobile.mp4' }
[1454.1ms] progress         { readyState: 1, currentSrc: 'ice-blue-mobile.mp4' }
[1454.3ms] suspend          { readyState: 1, currentSrc: 'ice-blue-mobile.mp4' }
[1460.5ms] loadeddata       { readyState: 4, currentSrc: 'ice-blue-mobile.mp4' }
[1461.2ms] canplay          { readyState: 4, currentSrc: 'ice-blue-mobile.mp4' }
[1461.3ms] canplaythrough   { readyState: 4, currentSrc: 'ice-blue-mobile.mp4' }
[1482.3ms] loadstart        { readyState: 0, currentSrc: 'florentine-mobile.mp4' }  ← next-slide preload starting
...
```

**Raw event timeline — PRODUCTION, iPhone 14 Pro Max emulation:**
```
[368.2ms]  loadstart        { readyState: 0, currentSrc: 'ice-blue-mobile.mp4' }
[495.2ms]  durationchange   { readyState: 1, currentSrc: 'ice-blue-mobile.mp4' }
[496.5ms]  loadedmetadata   { readyState: 1, currentSrc: 'ice-blue-mobile.mp4' }
[503.9ms]  loadeddata       { readyState: 3, currentSrc: 'ice-blue-mobile.mp4' }
[504.7ms]  canplay          { readyState: 3, currentSrc: 'ice-blue-mobile.mp4' }
[511.5ms]  loadstart        { readyState: 0, currentSrc: 'florentine-mobile.mp4' }  ← next-slide preload starting
[522.0ms]  canplaythrough   { readyState: 4, currentSrc: 'ice-blue-mobile.mp4' }
[644.6ms]  progress         { readyState: 4, currentSrc: 'ice-blue-mobile.mp4' }
...
```

**waiting / stalled / error events:** **None occurred in either run.** This is real, direct evidence from these two runs specifically — not an assumption — but it only tells us these failure-indicating events didn't fire in a run that already wasn't failing. It says nothing about whether they'd fire during your actual 29-second delay.

**`play` / `playing` events:** **Not reliably captured — this is a gap in my own instrumentation, not a finding.** Neither event appears in either timeline above, but the component's own effect calls `el.play()` imperatively very early (right as the video becomes active), and my `MutationObserver`-based listener attachment can lose a race against that call in some cases. I am not claiming `play`/`playing` didn't fire — I'm reporting that my method failed to reliably capture them, and this should be redone with earlier instrumentation (e.g., patching `HTMLMediaElement.prototype.play` itself) if it matters.

**Conclusion:** In both baseline runs, the full `loadstart → canplaythrough` sequence completes in under **100ms** of wall-clock time once the request starts. No stalling, no errors. Confidence: **high, for these specific runs**; **zero bearing on your actual failure**, which this data cannot see.

---

## 3. chrome://media-internals

**What I tested:** Attempted to navigate a Playwright-controlled browser tab directly to `chrome://media-internals/` to scrape its logs programmatically.

**Result: this is impossible via automation.** Chromium blocks scripted/automated navigation to internal `chrome://` pages as a security measure — Playwright's `page.goto("chrome://media-internals/")` failed with `net::ERR_FAILED`. This is not a bug in my approach; it's a hard restriction that applies to any automation tool (Playwright, Puppeteer, Selenium) driving Chromium, not something I can work around.

**This entire section requires a human, manually, in a real browser window.** Exact steps for you to collect this:
1. Open Chrome (real Chrome, not a DevTools device-emulation tab — device emulation doesn't change which engine is running, so this isn't strictly necessary, but do it on the actual device/mode where the bug occurs).
2. In a **new tab**, go to `chrome://media-internals/`. Leave that tab open.
3. In **another tab**, load the site and reproduce the delay.
4. Switch back to the `media-internals` tab — it should now show a player entry for the video. Click it.
5. Copy the "Info" and "Log" panels' full text (there's usually a way to select-all/copy, or just screenshot every section) and send it over.

**Confirmed/Eliminated:** Neither — **Not Checked, not checkable by me at all.** This is one of the two or three highest-value pieces of evidence still missing, because it's Chrome's own internal record of exactly what the media pipeline did, including hardware/software decoder selection and any internal buffering stalls.

---

## 4. Video Decode Investigation — Download vs. Decode vs. Render vs. React vs. Autoplay-policy delay

**What I tested:** Cross-referenced the network timing (Section 1) against the media event timeline (Section 2) to see which phase, if any, shows a gap.

**Evidence:** In both baseline runs, network response completion and `canplay`/`loadeddata` firing are within single-digit-to-low-double-digit milliseconds of each other — there is no visible gap between "bytes arrived" and "browser says it can play," which would be where a decode-specific delay would show up. There's also no gap between `canplaythrough` and the component's slide staying visually correct, which is where a rendering-pipeline delay would show up.

**Conclusion for these baseline runs:** The delay, when it doesn't occur, is not concentrated in decode or render — it's just fast everywhere. **This cannot tell you which phase is slow in your actual failure**, because none of these phases are slow in the data I have. If you get the `chrome://media-internals` log (Section 3) or a real HAR (Section 1's missing piece), that would directly show whether a real slow case has a gap between network-complete and decode-complete (pointing at hardware/software decoder issues) versus a gap before the network request even starts (pointing at React/hydration/JS delay) versus a gap in the request itself (pointing at network/server).

**Autoplay-policy delay:** Not identified as a factor in either baseline — `.play()` is called on an already-muted video, which every current mobile/desktop autoplay policy permits without a user gesture. No autoplay-block console warnings were observed. This doesn't rule it out for your device with certainty, but there's no positive evidence for it either.

**Confidence:** **Low-to-none, specifically because I don't have failure data to decode-map.** This section can only be answered properly once a slow run is actually captured.

---

## 5. ffprobe Analysis

**What I tested:** Full technical dump of `ice-blue-mobile.mp4`, `ice-blue-desktop.mp4`, and `ice-blue-desktop.webm` (the three variants actually served in the tests above). **I did not re-run this for `florentine`/`flexi`/`rotor`'s variants** — no evidence suggests they differ meaningfully from `ice-blue`'s encode settings (same `ffmpeg` command template was used for all four in an earlier phase), but that is an inference, not a re-verified fact for these three files specifically.

| Property | ice-blue-mobile.mp4 | ice-blue-desktop.mp4 | ice-blue-desktop.webm |
|---|---|---|---|
| Codec | H.264 | H.264 | VP9 |
| Profile | High | High | Profile 0 |
| Level | 3.0 | 3.1 | -99 (not applicable/reported for VP9) |
| Resolution | 640×272 | 1280×542 | 1280×542 |
| FPS | 30/1 | 30/1 | 30/1 |
| Bitrate (video) | 143.3 kbps | 562.0 kbps | N/A reported by ffprobe (container-level bitrate 439.6 kbps) |
| Pixel format | yuv420p | yuv420p | yuv420p |
| Color space | smpte170m | smpte170m | smpte170m |
| B-frames | 2 (has_b_frames) | 2 | 0 |
| Reference frames | Not explicitly isolated (ffprobe didn't return a distinct `refs` value in this run's output — would need `-show_frames` with reference-frame-specific parsing to get an exact count) | same caveat | same caveat |
| GOP / keyframe interval | ~65-70 frames between I-frames at 30fps (~2.2s) based on a 100-frame sample | ~65-70 frames similarly | Only **one** I-frame observed in the first ~100-frame sample — long GOP |
| Duration | 30.03s | 30.03s | 30.03s |
| Audio tracks | **None** | **None** | **None** |
| Container | MP4 (isom) | MP4 (isom) | WebM/Matroska |
| moov position | Near file start (offset 40, size 11,505 — file is 549,540 total) → effectively faststart-correct | Near file start (offset 40, size 11,537 — file is 2,121,501 total) → faststart-correct | N/A — WebM doesn't use MP4's moov/mdat box structure; it has its own (Cues/SeekHead) mechanism, not inspected with the same tool call. |
| Faststart | Effectively yes (moov before mdat, confirmed via `ffprobe -v trace`) | Effectively yes, same method | Not applicable in the same sense — **not separately verified for WebM's equivalent mechanism** |

**Is anything suboptimal for web playback?** Two observations, neither confirmed as causal to your symptom:
1. The WebM's very long GOP (possibly a single keyframe for the whole 30s clip, based on the sample) means seeking within the file would require decoding from the start — irrelevant for this specific use case (always plays linearly from frame 0, never seeks), but worth knowing if it's ever repurposed.
2. `ice-blue-mobile.mp4` at 143kbps/640×272 is very low bitrate — likely fine visually given it's a blurred/covered background element, but flagging that this is towards the aggressive end of compression, in case visual quality (not load time) becomes a separate future concern.

Neither of these plausibly explains a 29-second delay on their own — both files are small (0.5-2.1MB) and, per Section 1, transfer in well under a second once requested.

---

## 6. Browser Rendering Timeline

**What I tested:** First Paint, First Contentful Paint, Largest Contentful Paint, and navigation timing (`domainLookupStart` through `loadEventEnd`) via the Performance API — the same data DevTools' Performance panel visualizes, though not captured as an actual `.json` trace file/flamegraph.

**Raw data — LOCAL DEV (iPhone 14 Pro Max):**
```
first-paint: 1576ms
first-contentful-paint: 1576ms
LCP: 1576ms, element = poster <Image> (/_next/image?url=...pexels-max-vakhtbovycn...)
domainLookupStart: 2ms → domainLookupEnd: 4.1ms
connectStart: 4.1ms → connectEnd: 5.1ms
requestStart: 5.4ms → responseStart: 216.3ms → responseEnd: 274.5ms
domContentLoadedEventEnd: 285ms
loadEventEnd: 591.9ms
```

**Raw data — PRODUCTION (iPhone 14 Pro Max):**
```
first-paint: 484ms
first-contentful-paint: 484ms
LCP: 484ms, same poster image element
domainLookupStart: 4.8ms → domainLookupEnd: 9.1ms
connectStart: 9.1ms → connectEnd: 191.1ms   (TLS handshake included in this span)
requestStart: 191.5ms → responseStart: 284.3ms → responseEnd: 286ms
domContentLoadedEventEnd: 392.2ms
loadEventEnd: 530.5ms
```

**Poster paint / video request start / video response finish / first decoded frame / first rendered frame:** Cross-referencing with Section 2's event timeline — LCP (poster) paints at 484ms (production) or 1576ms (local dev); the video's `loadstart` fires shortly after (368ms production, 1373ms local — actually *before* the reported LCP timestamp in both cases, which makes sense since the poster image and video element mount around the same render cycle, and LCP is reported once layout/paint settles, not necessarily before every subsequent resource request begins).

**React hydration:** **Not directly instrumented** — no explicit hydration-start/hydration-end marker exists in the app, and I did not add one. The `domContentLoadedEventEnd` figures above are a proxy at best, not a direct hydration measurement.

**Long tasks / main-thread blocking:** **This section has a real gap I need to own.** My script referenced a `window.__longTasks` variable that I never actually populated — I forgot to register a `PerformanceObserver` for the `longtask` entry type. The "empty" result you'd see if you read my raw script output is **not evidence of no long tasks** — it's evidence my instrumentation had a bug. This needs to be redone properly before anyone concludes main-thread blocking isn't a factor.

**Where does the delay occur, per this baseline data:** Nowhere — total time from navigation start to `loadEventEnd` was under 600ms in both conditions. Same caveat as every other section: this is a fast run, not your slow one.

---

## 7. Browser Video Behavior — Direct Answers

**Does the browser wait for more buffering before autoplay?** No evidence of this in either baseline — `canplay`/`canplaythrough` fire within ~10ms of each other in both runs (Section 2), and `.play()` is called immediately after in the component's existing effect. No visible additional buffering wait.

**Is `preload="auto"` actually respected?** Partially confirmed, partially contradicted by earlier investigation: for the Hero videos specifically, `preload="auto"` on the active slide does appear to result in prompt, full-file range requests (`Range: bytes=0-`, confirmed in Section 1). However, in an **earlier, separate investigation this session** (documented in the prior handoff, not re-tested here), a different video (`KHS-Video.mp4`, `preload="metadata"`) was empirically shown to download in full despite the `metadata`-only hint — meaning Chromium's actual behavior for these hints is not strictly literal in this codebase's testing. I have not re-tested whether `preload="metadata"` on the Hero component's *inactive* slides similarly over-fetches — this is a real, specific, previously-flagged, still-open question (see Section 12).

**Does the browser ignore preload on mobile?** **Not specifically tested.** No comparison was run between `preload` behavior on the mobile-emulated profile versus desktop in this phase.

**Does `canplay` occur much later than `loadeddata`?** No — in both baseline timelines, they're within 0.1-0.8ms of each other. Effectively simultaneous in these runs.

**Would using `loadeddata` instead of `canplay` reduce perceived startup time?** Based on this baseline data, **no meaningful difference** — the two events fire close enough together that switching wouldn't be a measurable win here. This could differ under real slow conditions (where the two might diverge more), but that hasn't been observed.

---

## 8. Device-Specific Investigation

**This entire section is Not Checked, and cannot be checked without your physical device.** I have no access to any real Android or iOS hardware. Everything in prior phases used either Playwright's Chromium (a desktop-class binary with device-shaped UA/viewport/touch emulation, not real mobile hardware) or your own verbal reports.

**Exact steps for you to collect this yourself:**
1. **Device model / OS version:** Settings → About Phone (Android) or Settings → General → About (iOS).
2. **Browser + version:** Whatever browser you're using → menu → Help/About, or for Chrome: `chrome://version`.
3. **RAM/CPU:** Android: Settings → About Phone → often under "Device specs" or via a free app like CPU-Z; iOS doesn't expose this easily in Settings, but the model name (e.g., "iPhone 14 Pro Max") maps to known specs.
4. **Hardware acceleration status:** On desktop Chrome, `chrome://gpu` shows this directly; there is no exact mobile equivalent, but `chrome://gpu` still loads on Android Chrome and shows relevant info.
5. **Data Saver status:** Chrome menu (⋮) → Settings → Data Saver (Android) — confirm on/off.
6. **Battery Saver status:** Android/iOS system settings — confirm on/off at the time of the failing test specifically, since these can auto-toggle based on battery level.
7. **Reproducibility across devices:** if you have access to a second phone (different model, different OS, or even a friend/colleague's phone), testing there would immediately tell us whether this is specific to one physical device or general to "mobile" as a class.

**Confirmed/Eliminated:** Neither — 100% open.

---

## 9. Server Investigation

**Does the server support byte-range requests?** **Confirmed, both environments.** `curl -H "Range: bytes=0-1023"` against both local dev and production returned `206 Partial Content` with accurate `Content-Range: bytes 0-1023/<full-size>` and `Content-Length: 1024`.

**Are 206 Partial Content responses being returned?** **Confirmed** — every video request captured in every test this session (local dev and production) returned status 206, never 200, whenever a `Range` header was present (which is every request the browser's video element makes by default).

**Is the video streamed correctly?** As far as byte-range mechanics go, yes — confirmed above. Whether the *player* experiences this as smooth streaming on your device is a separate, unverified question.

**Is compression disabled (expected for MP4/WebM)?** **Confirmed** — no `Content-Encoding` header present on any video response in either environment, which is correct (double-compressing already-compressed video wastes CPU for no size benefit).

**Is the MIME type correct?** **Confirmed** — `Content-Type: video/mp4` and `video/webm` matched file extensions correctly in every response, both environments.

**Any redirects?** **Confirmed none** — `curl -w "%{redirect_url}"` returned empty on both local dev and production; direct 200/206 responses only.

**Any middleware?** **Confirmed none exists** — no `middleware.ts`/`middleware.js` file exists at the project root (checked in the prior investigation phase, re-confirmed by file structure being unchanged since).

**Any caching issues?** Partially checked — Vercel is serving this file from edge cache (`X-Vercel-Cache: HIT`, `Age: 27443` seconds ≈ 7.6 hours old at request time), which is the expected, correct behavior for a static asset under `/public`. **Not checked:** whether a *cold* (cache-miss) request to a Vercel edge region behaves differently — every request observed this session happened to hit a warm cache.

---

## 10. Final Root Cause Table

Only causes not already disproven in this or the prior investigation phase are listed.

| Possible Cause | Evidence Supporting | Evidence Against | Confidence % |
|---|---|---|---|
| Something specific to your real device/browser that neither Chromium emulation nor production/dev-server testing can surface (real Safari/iOS engine, real hardware decoder behavior, a real extension, real Data Saver/Battery Saver state) | Every automated test this session and the prior session — across 10+ distinct conditions now — has failed to reproduce the symptom | Somewhat unfalsifiable as stated; needs Section 8's data to move from theory to fact | ~30% |
| An as-yet-unidentified defect in this codebase's `preload="metadata"` handling for **inactive** Hero slides (parallel to the confirmed-real, separate over-fetch issue found earlier for `KHS-Video.mp4`) | Direct precedent exists in this exact codebase: `preload="metadata"` was empirically shown not to limit download for a different video in an earlier phase | Never actually re-tested for Hero's own inactive-slide videos specifically in either investigation phase | ~15% |
| Something in the actual JS execution path before the video request even starts (hydration timing, a long task, React Strict Mode double-invocation interacting with this component's several effects) | Never ruled out — the "long tasks" measurement in Section 6 has a confirmed bug (my own instrumentation gap), so this is genuinely unmeasured, not measured-and-clean | No positive evidence either — genuinely unknown, not suspected for a specific reason beyond "unmeasured" | ~15% |
| `chrome://media-internals`-visible decoder/pipeline issue (e.g., falling back to software decode slowly, or an internal buffering stall not visible via the standard DOM events) | Cannot be ruled in or out — this is exactly the tool that would show it, and it has never been checked (Section 3) | No evidence either way — genuinely unknown | ~15% |
| Testing-methodology artifact on your end (viewport resized live without a fresh navigation, muddying any width-based correlation you observed) | Raised in the prior investigation phase; never fully resolved | You report having performed hard reloads | ~10% |
| A real, reproducible defect that simply requires longer/more organic use to surface (something that doesn't show up in ~30-40 second scripted tests) | No scripted test has run longer than ~40 seconds | Your own reports describe the delay on the very first slide, immediately — not after extended use | ~5% |
| Network-layer difference for a genuinely cold/first connection to a Vercel edge region (never captured — all observed requests hit a warm cache) | Section 1 explicitly notes this gap | No specific reason to suspect it beyond "untested" | ~10% |

(Percentages don't sum to 100 — they're independent rough confidence estimates per hypothesis, not a partition of probability space.)

---

## 11. If I Had to Bet My Reputation

Based only on the evidence actually collected across both investigation phases — not intuition — my honest answer is: **I don't have enough evidence to name a single most-likely cause with real confidence, and saying otherwise would be exactly the kind of unsupported guess you told me not to make.**

If forced to pick the *least-unlikely* option among what's on the table: it's **something specific to your real device/browser environment that automated Chromium testing structurally cannot see** (Section 10, ~30%) — not because I have positive evidence for it, but because it's the only hypothesis consistent with the fact that ten-plus independent, methodologically-different automated tests across two full investigation phases have all failed to reproduce a bug you can reproduce reliably and repeatedly. That asymmetry is itself the strongest signal in this entire investigation: **the bug is real for you and absent for every automated approach tried so far**, which means the missing variable is something those automated approaches don't share with your actual test environment. The two most likely candidates for that missing variable, per Section 8's gap, are **(a) this is actually Safari/iOS and no Chromium-based test was ever going to catch it**, or **(b) something in `chrome://media-internals`, which has never been looked at.**

I'm not betting on a specific root cause. I'm betting that the next single action most likely to break this open is getting data from one of the two things that have never been checked at all: Section 3 (media-internals) or Section 8 (confirming iOS vs. Android, and if iOS, testing on real Safari).
