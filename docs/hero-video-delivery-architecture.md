# Hero Video Delivery Architecture — Production-Grade Redesign

## 1. Audit of current assets (real `ffprobe` data)

| File | Resolution | Codec/Profile | Bitrate | FPS | Duration | Size | Audio |
|---|---|---|---|---|---|---|---|
| ice-blue-mobile.mp4 | 640×272 | H.264 High | **143 kbps** | 30 | 30.0s | 0.52 MB | none |
| ice-blue-desktop.mp4 | 1280×542 | H.264 High | 562 kbps | 30 | 30.0s | 2.02 MB | none |
| florentine-mobile.mp4 | 640×272 | H.264 High | **155 kbps** | 30 | 28.1s | 0.53 MB | none |
| florentine-desktop.mp4 | 1280×542 | H.264 High | 704 kbps | 30 | 28.1s | 2.37 MB | none |
| flexi-mobile.mp4 | 640×272 | H.264 High | 543 kbps | 30 | 12.0s | 0.78 MB | none |
| flexi-desktop.mp4 | 1280×542 | H.264 High | 1889 kbps | 30 | 12.0s | 2.71 MB | none |
| rotor-mobile.mp4 | 640×272 | H.264 High | 492 kbps | 30 | 12.0s | 0.71 MB | none |
| rotor-desktop.mp4 | 1280×542 | H.264 High | 1634 kbps | 30 | 12.0s | 2.34 MB | none |

Faststart: confirmed on all files (moov atom near file start) from earlier verification. Pixel format `yuv420p` throughout, GOP/keyframe interval not explicitly set at encode time (left to `libx264` defaults).

**Verdict: yes, this is over-compressed, and it's inconsistent, not just aggressive.** Two things are wrong, not one:

1. **143–155 kbps for `ice-blue`/`florentine` mobile is genuinely too low** for premium visual quality at any resolution, let alone displayed at 2–3× scale on a modern phone. That's roughly a third the bitrate of `flexi`/`rotor` at the *same resolution and CRF setting*.
2. That inconsistency is explained by how CRF encoding works: it targets constant *perceptual quality*, not constant bitrate — a slow-moving ice-cave shot gets fewer bits than a fast-moving water-spray shot to hit the same quality target. That's normally correct behavior, but the CRF value chosen (28, from the earlier bandwidth-focused optimization pass) was tuned to minimize file size, not to hit a "looks premium" quality floor. For low-motion content, that quality floor came out visibly soft.

**A finding that changes the whole plan:** I checked whether higher-resolution source material exists to re-encode from. It does — but only as far as the original raw downloads (`C:\Users\progr\Downloads\ice-blue-home-desktop.mp4` etc.), which I confirmed via `ffprobe` are **also 1280×542**, at 1.48–2.0 Mbps. That is Jaquar's own delivered resolution for this content. **1280×542 is the real quality ceiling — not a limitation we introduced, a limitation of the source video itself.** Any tier requesting resolution above that is not "higher quality," it's upscaling: interpolated, not real detail, and it costs bandwidth for a file that will look softer than letting the browser's GPU scale a smaller, sharp source at display time. I'm flagging this explicitly because pretending otherwise — inventing a "4K retina" tier from 542p source — would be exactly the kind of unfounded claim this whole investigation has been trying to eliminate.

## 2. Encoding strategy

Given the 1280×542 ceiling, I'm deviating from the example five-tier structure in the request (mobile-small/mobile-large/tablet/desktop/desktop-large) down to **three real tiers**, because two of the suggested five would be fabricated:

| Tier | Condition | Resolution | CRF | Maxrate/Bufsize | Preset | Use case |
|---|---|---|---|---|---|---|
| **Mobile standard** | viewport ≤767px, DPR ≤2 | 720×304 | 21 | 1100k / 2200k | slow | Budget/mid-range phones, most Android |
| **Mobile retina** | viewport ≤767px, DPR >2 | 1024×434 | 21 | 1900k / 3800k | slow | iPhone Pro-class, flagship Android |
| **Desktop** (all sizes) | viewport ≥768px, any DPR | 1280×542 (native) | 20 | 3000k / 6000k | slow | Tablet, laptop, desktop, large/retina monitors alike |

**Why one "desktop" tier covers tablet through 4K/retina monitors:** none of those categories can be served anything sharper than the native 1280×542 master — there's nothing higher to give them. A 4K monitor gets the same file a 13" laptop gets; the browser's GPU upscales it at display time, which looks at least as good as (often better than, since it avoids a lossy re-encode generation) a pre-upscaled file, for zero extra bandwidth cost.

**CRF choice reasoning:** raised from the prior CRF 28 (mobile) / CRF 26 (desktop) to CRF 21 / CRF 20. `-maxrate`/`-bufsize` caps are added as "capped CRF" — CRF still adapts per-scene efficiently, but peak-complexity scenes can't run away in file size, and every tier now gets a bitrate floor high enough that low-motion content (the exact failure case that produced 143 kbps) can't fall through the cracks the way it did before.

**Expected sizes** (from the actual encode, see Section 10) land meaningfully larger than the previous aggressive pass but still small relative to typical hero imagery/JS payloads for a 12–30 second loop — full numbers in the deliverables section.

**GOP:** set explicitly to `-g 60 -keyint_min 60` (2-second keyframe interval at 30fps) — irrelevant to a straight-through autoplay loop with no seeking, included for encoding consistency and because it slightly helps compression efficiency versus leaving it to encoder defaults.

**Audio:** stripped (`-an`) in every tier, as before — every use is `muted`, audio is pure dead weight regardless of quality tier.

## 3. Asset selection strategy

React resolves a **tier**, not just mobile/desktop, from three signals:

- **Viewport width** — the primary axis, via the same `useSyncExternalStore` + `matchMedia` pattern already in place.
- **`window.devicePixelRatio`** — splits the mobile bucket into standard vs. retina.
- **`navigator.connection`** (Network Information API: `effectiveType`, `saveData`) — when available, overrides the resolution choice downward on `saveData: true` or `effectiveType` of `'2g'`/`'slow-2g'`, regardless of viewport/DPR. This API is **not available in Safari at all**, and partially available elsewhere — it's a progressive enhancement, not a dependency; absence of the API simply means viewport/DPR alone decide the tier, same as today.

**Orientation is deliberately not a separate signal.** Rotating a phone changes its reported CSS viewport width (portrait 390px → landscape 844px for the same device), which the existing width-based tiering already picks up via the `resize` listener. Adding a distinct orientation check would be redundant state tracking the same underlying value a second way — exactly the kind of unnecessary complexity to avoid.

**Codec support:** since the format decision below settles on H.264/MP4 only, there's no codec branching to perform. A defensive `canPlayType('video/mp4; codecs="avc1.640020"')` check is worth keeping as a last-resort fallback (skip the video, show the poster only) for the vanishingly rare case of a browser without H.264 support — not worth building real branching logic around in 2026.

## 4. WebM vs. MP4

**Recommendation: MP4/H.264 only. No WebM.**

This reverses the earlier phase's split-format experiment, and the reasoning is now stronger, not weaker:

- **Our own measurements already showed WebM doesn't reliably win.** In the prior optimization pass, VP9/WebM beat H.264 on two of four clips and lost on the other two, after retuning. There's no clean, universal size advantage to defend the added complexity.
- **Safari's WebM/VP9 support has been historically inconsistent** — a real risk for a "must work identically across Chrome, Safari, Edge" requirement (Section 8).
- **Every additional format doubles the encode/QA/storage matrix** — 3 tiers × 4 slides is already 12 files to maintain; adding WebM would make it 24, for previously-proven inconsistent gains.
- **Determinism**: with React explicitly picking the URL (no `<source>` negotiation), adding a codec dimension means adding *another* explicit decision axis (a `canPlayType` check) for a benefit our data says isn't reliably there.

AV1 would, in principle, beat H.264 on compression — but AV1 encoding is CPU-intensive and browser decode support, while now broad (Chrome, Firefox, Safari 17+), doesn't universally include *efficient hardware decode* on mid-range phones, which matters for the exact "avoid quality-limited/battery-costly software decode" concern a premium mobile experience should care about. I'm noting it as a future candidate worth revisiting, not implementing it now — the file-count multiplication problem applies here too, and the source ceiling (1280×542) limits how much there is to gain either way.

## 5. Adaptive streaming (HLS/DASH) — not justified, here's why

| Factor | HLS/DASH reality for this use case |
|---|---|
| Startup latency | Requires fetching + parsing a manifest before any playback starts — an extra round trip that a plain progressive MP4 with faststart doesn't pay. For a 12–30 second clip, this typically **increases** time-to-first-frame, the opposite of the goal. |
| Implementation complexity | Needs either a segmenting/packaging pipeline (ffmpeg + manifest generation, self-maintained) or a third-party service (Mux, Cloudflare Stream) — a new operational dependency for four looping clips. |
| CDN support | Vercel (the current host) does not provide adaptive packaging natively. This would mean adding a vendor, not just a config flag. |
| Browser compatibility | Native HLS exists only in Safari; Chrome/Firefox/Edge require a JS player (`hls.js`), adding real bundle weight to a page whose whole point is fast first paint. |
| Caching | Plain MP4 already caches trivially at Vercel's edge (`Cache-Control`/`ETag`, verified working in earlier investigation). HLS adds manifest + multi-segment cache invalidation complexity. |
| SEO | Minor for a background hero specifically, but plain MP4 is more directly indexable/embeddable than segmented adaptive streams if that ever matters later. |
| Is it justified for 4 looping hero videos? | **No.** Adaptive bitrate's real value is adapting *during* long-form playback under changing network conditions. A 12–30 second loop, sized correctly per-device *before* the request even starts (our tiering), gets the practical benefit people actually want from "adaptive" — the right asset for the device — without any of this operational cost. |

## 6. Progressive MP4 with faststart — the right choice, and why

This is the inverse of Section 5's conclusion: everything that makes HLS/DASH unjustified here is exactly what makes progressive MP4 correct — one HTTP request, faststart lets playback begin before the full file arrives, trivial CDN caching, zero extra JS, universal support, and (via our tiering) the device gets an appropriately-sized file chosen deterministically instead of negotiated at runtime. The trade-off progressive MP4 accepts, and it's the right one to accept here: no *mid-playback* quality adaptation if network conditions change during the 12–30 second loop. For content this short, that scenario is a non-issue — the file either arrives promptly (it's a few megabytes) or the poster simply holds a little longer, which the existing `requestVideoFrameCallback`-gated fade already handles gracefully.

## 7. Existing UX — untouched

Layout, animations (`framer-motion` `AnimatePresence`/`motion.div`), CTA, typography, slide timing (`duration` per slide), and crossfade transitions are unchanged. The only modification is to the `Slide` type's video fields (three tier URLs instead of two) and the tier-resolution function — everything downstream (`HeroVideo`, `HeroPreloadVideo`, the crossfade/timer effects) is untouched.

## 8. Performance targets — realistic assessment

| Target | Assessment |
|---|---|
| Poster visible immediately | **Already true**, unaffected by this change — `next/image` with `priority` on the first slide. |
| First video frame within ~1–2s on 4G/Wi-Fi | **Realistic and should improve.** Mobile-standard tier files are a few MB for a 12–30s clip; on a real 4G connection (typically several Mbps+), that's comfortably inside 1–2s for `requestVideoFrameCallback` to fire. |
| Smooth playback | **Realistic** — bitrate is now set with headroom above the complexity floor that caused visible softness. |
| No noticeable quality degradation on modern phones | **Realistic within the 1280×542 ceiling.** I want to be precise about what this promises: it means "as good as this source video gets," not "indistinguishable from a native 1080p/4K asset" — that second bar is not achievable without new source footage, and claiming otherwise would be the unfounded-confidence problem this whole investigation exists to avoid. |
| Minimal unnecessary bandwidth | **Realistic** — three tiers, no dead-format duplication (no WebM), no upscale waste. |
| Consistent across Chrome, Safari, Edge | **Realistic** — single deterministic MP4/H.264 source, no `<source>` negotiation, no adaptive-streaming player dependency. This is the one target the architecture change most directly and confidently guarantees. |

## 9. Comparison against Jaquar's likely implementation

Grounded in what's actually observable (the file we downloaded from them, and standard practice for sites at that production tier), not speculation:

- **Their source asset is also 1280×542.** We know this directly — it's the file that was downloaded from their site. Whatever CDN/pipeline they run, their *content* has the same resolution ceiling ours does. This is a genuinely useful finding: it means matching or exceeding their asset quality is achievable with correct encoding of what we have, not something permanently out of reach.
- **They likely still deliver via some form of adaptive streaming** (the "starts soft, sharpens" behavior originally reported at the very start of this investigation is a classic ABR signature) — but that's ABR selecting *between renditions of a video whose ceiling is 1280×542*, not evidence of a fundamentally higher-quality master. A large brand with a dedicated video CDN (Mux, Akamai, a custom pipeline) can justify that operational cost across many more assets and much more traffic than a four-clip regional homepage hero; Section 5 explains why that trade-off doesn't carry over here.
- **Net assessment:** a well-executed three-tier deterministic MP4 strategy, at the *encoding quality* level we're now targeting, should look comparable to what Jaquar actually serves for this specific content — because the content's own ceiling is the same. What we can't and shouldn't claim to match is a large enterprise's ABR *infrastructure* — that's a different investment for a different scale of asset library, not a visual-quality gap in this specific case.

## 10. Encoding results

Real output from the actual encode — file sizes below are the final on-disk artifacts, not estimates.

| Slide | Duration | Mobile standard (720×304) | Mobile retina (1024×434) | Desktop (1280×542) |
|---|---|---|---|---|
| ice-blue | 30.0s | 1.48 MB (411 kbps) | 2.64 MB | 4.20 MB |
| florentine | 28.1s | 1.71 MB (507 kbps) | 3.20 MB | 5.20 MB |
| flexi | 12.0s | 1.27 MB (885 kbps) | 2.23 MB | 3.19 MB |
| rotor | 12.0s | 1.34 MB (929 kbps) | 2.29 MB | 3.18 MB |

**The consistency problem is measurably fixed.** Mobile-standard bitrate now ranges 411–929 kbps (2.3× spread) versus the previous 143–543 kbps (3.8× spread) — `ice-blue` specifically went from 143 kbps to 411 kbps, nearly 3× more data for its lowest-motion content, which is exactly the clip that looked worst before.

**Trade-off, stated plainly:** these files are larger than the prior aggressively-optimized versions (roughly 2–3× on mobile, 1.5–2× on desktop) and larger than what a pure bandwidth-minimization pass would produce. That's the direct, deliberate cost of the quality target this task asked for — "premium visual quality" and "minimal bandwidth" pull in opposite directions past a certain point, and this is where I judged the balance should sit: still small enough (1.3–5.2 MB for a 12–30s loop) to load within the ~1–2s target on a real 4G/Wi-Fi connection, while no longer bottoming out at a bitrate that looks visibly soft.
