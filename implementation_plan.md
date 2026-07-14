# Krishna Home Studio — Premium Storytelling Website

## Overview

Rebuild krishnahomestudio.com as a **Next.js 14 + TypeScript** luxury storytelling website, inspired by the Jaquar.com design language — full-bleed hero imagery, cinematic scroll sections, mega-menu navigation, premium dark/neutral palette — while carrying all of the client's existing brand content, photos, logo, categories and contact details.

---

## Design Direction (Jaquar-Inspired)

| Element | Jaquar Pattern | KHS Application |
|---|---|---|
| **Hero** | Full-viewport video/image with large overlaid text | Rotating Bathware / Hardware hero slides |
| **Navigation** | Dark slim top bar + main nav with mega-drop | Same structure: top utility bar + category mega-menu |
| **Typography** | Serif headline + thin sans body | Playfair Display headlines + Inter body |
| **Palette** | Deep charcoal `#1a1a1a`, warm white `#f5f0eb`, gold accent `#c9a96e` | Same |
| **Storytelling** | Full-width alternating text+image sections | About, Category features, Awards |
| **Category Grid** | Large card grid with hover zoom + label | 10 product categories |
| **Footer** | Dark multi-column with logo | Store addresses, social, links |

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — hero slider, about teaser, category grid, awards, news, contact |
| `/about` | About Us + Founder story |
| `/bathware` | Bathware category hub |
| `/hardware` | Hardware category hub |
| `/clientele` | Client logos / gallery |
| `/media` | Press & news |
| `/contact` | Contact form + store info |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS custom properties (no Tailwind)
- **Animations**: Framer Motion
- **Font**: Google Fonts — Playfair Display (serif) + Inter (sans)
- **Icons**: Lucide React

---

## Open Questions

> [!IMPORTANT]
> **Photos/Logo**: The client's images live on `krishnahomestudio.com`. I will use all public image URLs directly via `next/image` with `remotePatterns`. If images need to be hosted locally, please provide the assets.

> [!NOTE]
> **About Founder page**: I found the general About Us text. If there's specific content for Prakash Choudhary's founder page you want highlighted, please share it.

> [!NOTE]
> **WhatsApp number**: The site uses `+91 63620 68331` for Bathware and `+91 7892507179` for Hardware. Should the floating WhatsApp button use the Bathware number?

---

## Proposed Changes

### Project Scaffold

#### [NEW] `d:/Code Space/WorkSpace/KHS/` (entire Next.js project)

Created with `npx create-next-app@latest` using TypeScript, App Router, no Tailwind.

---

### Core Structure

```
src/
  app/
    layout.tsx          ← Root layout with Header + Footer
    page.tsx            ← Home page
    about/page.tsx
    bathware/page.tsx
    hardware/page.tsx
    clientele/page.tsx
    media/page.tsx
    contact/page.tsx
  components/
    Header/             ← Sticky nav with mega-menu
    Hero/               ← Full-bleed slider
    AboutSection/       ← Story section
    CategoryGrid/       ← Product category cards
    AwardsSection/      ← Awards & USPs
    NewsSection/        ← Press articles
    ContactSection/     ← Store addresses + map links
    Footer/
    WhatsAppButton/     ← Floating CTA
  styles/
    globals.css         ← Design tokens, resets
    variables.css       ← Color/type/spacing tokens
  data/
    categories.ts       ← Category data
    navigation.ts       ← Nav structure
    awards.ts
    news.ts
```

---

### Key Components

#### Header
- Slim utility top bar: Phone numbers | Social links
- Logo centered (or left-aligned)
- Main nav: Home · About ▼ · Bathware ▼ · Hardware · Clientele · Media · Contact
- Mega-drop for Bathware with 11 sub-categories
- Mobile hamburger with slide-in drawer

#### Hero Slider
- Two slides: "Bathware" and "Hardware"
- Full-viewport with fixed/parallax background images
- Bold headline, subtitle, "Discover More" CTA button
- Auto-play with dot navigation

#### About Section
- Split layout: text left, image right
- Content from the existing site — established 2018, Prakash Choudhary, sourcing Hindware/Kohler/Grohe

#### Category Grid (10 cards)
- Shower & Faucets, Countertop Basin, Standalone Basin, Vanity & Mirrors, Sink, Pressure Pump & Water Heater, Faucets, Bathroom Accessories, Spa & Wellness, Hardware
- Hover: scale + golden overlay with "Explore" link

#### Awards / USPs Section
- 5 pillars: Award Winning · Featured In · Affordable Luxury · Quality · Customized Solutions · After Sales Support
- Icon + heading + short description layout

#### News Section
- 4 press articles (The Print, Daily Hunt, Business Standard, ANI News)
- Card layout with publication logo, excerpt, "Open Article" link

#### Contact Section
- Two store cards: Bathware & Hardware
- Address, phone, email for each
- Floating WhatsApp button (bottom-right)

#### Footer
- Dark background `#111`
- Logo + tagline
- Navigation links
- Social: Facebook, Instagram
- Copyright © 2026 Krishna Home Studio

---

## Verification Plan

### Automated Tests
- `npm run build` — TypeScript compile + Next.js build succeeds with no errors
- `npm run lint` — No ESLint errors

### Manual Verification
- Run `npm run dev` and verify all 7 pages render correctly
- Check hero slider auto-play and manual dot navigation
- Verify mega-menu opens/closes correctly on desktop and mobile drawer works
- Confirm all external links (press articles, social, WhatsApp) open correctly
- Verify images load from krishnahomestudio.com via `next/image`
- Test responsive layout at 375px, 768px, 1280px, 1920px breakpoints
