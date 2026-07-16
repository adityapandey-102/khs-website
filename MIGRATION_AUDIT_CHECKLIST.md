# Krishna Home Studio Migration Audit Checklist

Audit date: 2026-07-16 (Jaquar-style Tailwind redesign pass)

## Sources Reviewed

- Live old site: `https://krishnahomestudio.com` — `wp-json/wp/v2/pages` (21 pages) and `wp-json/wp/v2/media` (418 attachments), fetched directly, paginated.
- Current Next.js 16 codebase under `src/` and `public/`.
- Jaquar.com design system extraction (near-black navy `#0A1628` + white + off-white + gold accent, clean sans-serif, no serif — user-selected direction).

## What changed in this pass

- **Tailwind v4 migration complete.** Every `.module.css` file has been deleted; all components and pages are rebuilt with Tailwind utility classes. `postcss.config.mjs` added, `globals.css` now holds only the `@theme` design tokens (Jaquar palette) and a minimal base layer. No CSS Modules remain anywhere in `src/`.
- **Typography**: switched from Playfair Display (serif) + CDN `@import` to a single self-hosted `next/font/google` Inter, no serif anywhere.
- **Full re-scrape and reorganization of assets.** `scripts/migrate-assets.mjs` pulls the complete live media library (418 attachments vs. the previous 315), downloads exactly one file per attachment (no WordPress thumbnail-size duplicates), and buckets each by the real page it's attached to via the WordPress `post` parent field into `public/assets/khs/<bucket>/`. Manifest at `public/assets/khs/asset-map.json`. The old flat `public/assets/old-site/` (315 files, no page association) has been removed from the repo — nothing references it anymore.
- **Real page copy captured verbatim.** `scripts/fetch-page-copy.mjs` pulls `content.rendered` for all 21 live pages into `src/data/pageCopy.ts` (HTML/CSS-stripped, entity-decoded). Used directly on About, Founder, Safe Essentials, and every bathware category page instead of paraphrased copy.
- **Removed `src/data/products.ts` (fabricated SKUs).** All 32 entries used Unsplash stock photos and invented product names/brands that never existed on the real site — the old site itself has no SKU-level product catalog, only category pages with photography and brand-partner logos. Replaced with `src/data/categoryGalleries.ts`, built from the real re-scraped, page-associated photos (`scripts/build-category-galleries.mjs`), excluding anything matching the brand/clientele logo-carousel signature.
- **Fixed category image assignments.** Several categories previously used brand-partner *logos* (Grundfos.png, AO Smith.png, Hafele.png) as if they were product photography, and four hardware sub-categories all shared the exact same thumbnail. Every category now has a distinct, real, non-logo photo.
- **Fixed `categoryBrandMap` key-mismatch bugs** in both `[slug]/page.tsx` routes (e.g. `"showers-faucets"` vs. the real id `"shower-faucets"`; hardware map referenced categories that didn't exist) — partner-brand display now actually matches real category ids.
- **Fixed hardware sub-category routing.** `door-handles`, `hinges-channels`, `security-systems`, `glass-fittings`, `cabinet-hardware` previously all linked to `/hardware` regardless of card clicked; each now has its own real route and real content (mapped to the matching themed paragraph from the live `/hardware` page copy, since the old site never split hardware into sub-pages — no content was invented, only reorganized).
- **New shared components** matching the Jaquar structural pattern: `Breadcrumb`, `PageHero`, `FAQAccordion` (single-expand, rotating icon), `NumberedFeatureBlock`, `CertificationStrip` (reuses real brand-partner logos).
- **Header rebuilt** with a real two-level mega-menu (image + CTA panel left, multi-column subcategory list right) and a revived utility bar (previously dead/commented-out code) with phone numbers, WhatsApp, and store-locator link.
- **Home page recomposed** to follow Jaquar's homepage rhythm: hero carousel → split category grid → brand story → value props → featured products → awards/recognition banner → testimonial carousel → clientele logo grid → press strip → showroom CTA cards → brand partner marquee.
- `next.config.ts`: removed the now-unused `images.unsplash.com` remote pattern (all imagery is local).

## Old Website Page Inventory (all 21 confirmed present)

- [x] `/` Home · `/about/` · `/about-prakash-chaudhary/` (→ `/about/founder`) · `/product/` (→ `/bathware`) · `/hardware/` · `/clientele/` · `/media/` · `/contact/` · `/blog/` (0 live posts → redirects to `/media`)
- [x] All 11 bathware category pages · `/safe-essentials/`

## Verification performed

- [x] `npm run lint` — clean, zero warnings.
- [x] `npm run build` — compiles clean, all 29 routes prerender successfully.
- [x] Live browser verification (Playwright + Chromium) of homepage (desktop 1440px + mobile 390px), a category detail page, the founder page, the mega-menu hover state, the mobile drawer, and the FAQ accordion — all render and interact correctly.
- [x] Full-page scroll + DOM check for broken images (`naturalWidth === 0`) and console errors — zero found after fixing the initial logo-contrast and category-image issues found during review.
- [x] Fixed: white-mark brand logo was invisible against the new white header background — now shown on a navy chip.

## Known, intentionally out-of-scope items

- Contact form remains client-side only (simulated submit, no backend/email wiring) — flagged for the client, not built without an explicit request.
- Clientele page stats (500+ homeowners / 40+ architects / 15+ complexes) are pre-existing marketing copy inherited from the prior build, not independently verifiable against the live site — left as-is.
