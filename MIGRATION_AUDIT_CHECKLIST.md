# Krishna Home Studio Migration Audit Checklist

Audit date: 2026-07-14

## Sources Reviewed

- Implementation plan: `C:\Users\progr\Downloads\implementation_plan.md`
- Current Next.js codebase under `src/` and `public/`
- Old website WordPress page inventory from `https://krishnahomestudio.com/wp-json/wp/v2/pages?per_page=100`
- Downloaded old-site asset manifest: `public/assets/old-site/asset-map.json`

## Old Website Page Inventory

- [x] `/` Home
- [x] `/about/` About
- [x] `/about-prakash-chaudhary/` About Founder
- [x] `/product/` Bathware hub
- [x] `/hardware/` Hardware
- [x] `/clientele/` Clientele
- [x] `/media/` Media
- [x] `/contact/` Contact
- [x] `/blog/` Blog
- [x] `/shower-faucets/` Shower, Faucets & Extensions
- [x] `/washbasins-waterclosets-urinals/` Washbasins, Waterclosets & Urinals
- [x] `/countertop-basin/` Designer Countertop Basin
- [x] `/standalone-basin/` Designer Standalone Basin
- [x] `/vanity-mirrors/` Vanities, Mirrors & Cabinets
- [x] `/kitchen-sinks-faucets/` Kitchen, Faucets & Sinks
- [x] `/shower-enclosures/` Shower Enclosures
- [x] `/booster-heat-pumps/` Booster & Heat Pumps
- [x] `/pressure-pump-water-heater/` Water Softeners, Heater & Purifiers
- [x] `/bath-accessories/` Bathroom Accessories
- [x] `/spa-wellness/` Spa & Wellness
- [x] `/safe-essentials/` Safe Essentials

## Already Completed In Current Implementation

- [x] Next.js app-router project exists with TypeScript, CSS Modules, global design tokens, Header, Footer, WhatsApp button, and core pages.
- [x] Current UI follows the implementation plan direction: premium dark/neutral palette, Playfair/Inter typography, full-bleed hero, sticky header, mega-menu, category cards, footer columns.
- [x] Core routes exist: `/`, `/about`, `/about/founder`, `/bathware`, `/bathware/[slug]`, `/hardware`, `/clientele`, `/media`, `/contact`.
- [x] Old-site assets have been downloaded locally: 315 assets, 0 failures, stored in `public/assets/old-site/`.
- [x] Asset manifest is preserved at `public/assets/old-site/asset-map.json`.
- [x] Supplied KHS logo copied to `public/assets/brand/khs-logo.png`.
- [x] Opaque checkerboard background removed from the supplied logo while preserving the white KHS mark.
- [x] Header and Footer now use the supplied local KHS logo path.
- [x] `src/app/icon.png` and `src/app/apple-icon.png` exist from the transparent supplied logo.
- [x] Stale default `src/app/favicon.ico` removed so it cannot override the transparent app icons.
- [x] Hotlinked image references to Unsplash and WordPress have been removed from `src/` and `next.config.ts`.
- [x] Home includes the missing Brand/Product carousel below Hero with expanded old-site partner logos.
- [x] Home includes Featured Products beside/under About.
- [x] Home includes a Clientele preview section.
- [x] Home includes Awards/Success video using local `KHS-Video.mp4`.
- [x] Home includes Customer Reviews/Testimonials.
- [x] News/Media data includes local publication logos.
- [x] Clientele page uses migrated old-site reviews and expanded old-site logo grid.
- [x] `/safe-essentials` has been migrated as a dedicated page with old-site copy and local image.
- [x] Old-site category slugs are redirected to the new `/bathware/[slug]` routes in `next.config.ts`.

## Still Missing / Needs Completion

- [x] Logo transparency: verified `public/assets/brand/khs-logo.png` has alpha range 0-255.
- [x] Replace/remove `src/app/favicon.ico`; new transparent `icon.png` and `apple-icon.png` are active.
- [ ] Add or verify a Loading Screen only if the current app has one; no loading screen component/page was found in the current codebase.
- [x] Old `/blog/` page audited: rendered text length is 0, so it redirects intentionally to `/media`.
- [x] `/safe-essentials/` audited and migrated as a dedicated page.
- [ ] Verify all 315 downloaded assets are either represented where relevant or intentionally archival in `asset-map.json`.
- [ ] Improve old-site category pages with more of the migrated page-specific product imagery where available, not just one hero image per category.
- [ ] Verify all article logos/images render on `/media` after build.
- [ ] Verify local video controls/poster render correctly on desktop and mobile.
- [ ] Verify Header/Footer logo display after transparent-logo cleanup.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run local dev server and inspect responsive layouts at mobile/tablet/desktop widths.
- [ ] Manually compare every new page to the old page inventory before marking complete.

## Implementation Plan Alignment

- [x] Uses Next.js App Router and TypeScript.
- [x] Uses CSS Modules and CSS custom properties.
- [x] Uses Lucide React icons.
- [x] Preserves current premium UI instead of redesigning from scratch.
- [x] Header, Hero, About, CategoryGrid, Awards, News, Contact, Footer, WhatsAppButton structure exists.
- [x] Missing requested sections have been added to Home.
- [ ] The plan originally allowed remote image URLs; current user requirement supersedes that and local assets are now required.
- [ ] Plan listed Next.js 14, but installed project is Next 16.2.10; local Next 16 docs have been consulted for image/icon/redirect conventions.
