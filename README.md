# AURA — website

Website for **AURA Phnom Penh**, a rooftop garden restaurant and lounge. The design takes its structure and motion from [Amazónico Dubai](https://www.amazonicorestaurant.com/dubai/): a full-screen film hero, short editorial statements, a draggable photo strip, full-height feature cards that stack as you scroll, and a sand-coloured footer.

**Current stage: wireframe + motion.** Every photo and video position is a labelled placeholder that names the photo planned for it. Real imagery and the hero film come next.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, design tokens in `src/app/globals.css` |
| Motion | Lenis smooth scroll + a small shared scroll loop (`src/lib/scroll.ts`) + CSS transitions |
| Fonts | Playfair Display (display), Miranda Sans (body), Kantumruy Pro (Khmer), self-hosted by `next/font` at build time |
| Output | Static export (`out/`) |
| Hosting | Cloudflare Workers static assets (`wrangler.jsonc`) |

There is no backend. Booking, status check and contact forms show a local confirmation.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + build
npm run preview    # build, then serve out/ through Wrangler at http://localhost:8787
npm run deploy     # build, then wrangler deploy (needs `npx wrangler login` once)
```

Node 24 (`.nvmrc`). The build downloads the Google fonts, so it needs network access.

## Project structure

```
src/
  app/                      routes: / about menu events gallery team reservation contact
    globals.css             design tokens, reveal + wireframe styles
    layout.tsx              fonts, smooth scroll, header, footer
  content/                  everything editable — copy, links, slots
    site.ts                 brand, navigation, contact, hours, socials
    home.ts                 homepage: hero, intro, strip, stacked cards, award
    pages.ts                inner pages
    menu.json               10 categories, 67 dishes
    gallery.json            132 gallery entries
    types.ts
  components/
    layout/                 Header (+ mobile menu), Footer, SmoothScroll
    sections/               HeroFilm, PageHero, IntroBlock, PhotoStrip,
                            StackedCards, SplitFeature, Bands (Section, AwardBand, CtaBand)
    features/               menu, gallery, reservation, contact, forms
    ui/                     Placeholder, Reveal, Parallax, Buttons, Icons
  lib/                      cn(), scroll loop
public/
  images/brand/             logo + favicon (the only images shipped today)
  _headers                  Cloudflare cache headers
assets/photos/              photo library, NOT deployed (site, venue, venue-highlights, events, menu)
```

## Page map

| Page | Sections |
| --- | --- |
| Home | Hero film · intro statement · photo strip · stacked cards (Menu, Events, The Venue, Chef) · award band |
| About | Page hero · mission · history / philosophy splits · values · award · reserve band |
| Menu | Page hero · sticky category bar with scroll-spy · category columns · reserve band |
| Events | Page hero · Private Dining / Event Catering splits · photo strip · enquiry band |
| Gallery | Page hero · filters (Venue / Events / Menu) · masonry · lightbox |
| Team | Page hero · Chef / Heart of the House / Front of House splits · careers band |
| Reservation | Pinned media panel · booking form · status check · hours and policies |
| Contact | Page hero · details + form · map slot |

## Motion

| Effect | Where | Implementation |
| --- | --- | --- |
| Smooth inertia scroll | Whole site | `SmoothScroll` (Lenis) |
| Word-by-word headline rise | All headings | `RevealText` |
| Fade / rise / blur / clip-wipe entrances | Text, media | `Reveal` + `[data-reveal]` CSS |
| Slow Ken Burns drift, pausable | Home hero | `HeroFilm` |
| Hero lifts and fades on scroll | Home and page heroes | `HeroFilm`, `PageHero` |
| Auto-drifting strip, drag or flick, pauses on hover | Home, Events | `PhotoStrip` |
| Pinned stacking cards, shrink and dim beneath | Home | `StackedCards` |
| Image parallax inside frames | Split features | `Parallax` |
| Transparent header turns solid; full-screen mobile menu | Global | `Header` |

All motion switches off under `prefers-reduced-motion`.

## Going from wireframe to photos

1. Pick the final images in `assets/photos/` (each slot's `photo` field shows the current plan).
2. Resize to web size (about 2000px long edge, WebP or AVIF) and copy them into `public/images/`.
3. Add a `src` to the slot and render an image in `Placeholder`'s place. For the hero, add a muted looping MP4 (under 8 MB) with a poster image.

## Deploying on Cloudflare

`npm run deploy` uploads `out/` to the Worker named in `wrangler.jsonc`. For Git-connected builds, set the build command to `npm run build` and the deploy command to `npx wrangler deploy`. Unknown paths serve `404.html`, and `public/_headers` sets long-lived caching for hashed assets.
