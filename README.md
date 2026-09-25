# AURA — auracambodia.asia clone

A Next.js 16 rebuild of [auracambodia.asia](https://auracambodia.asia/) with all 8 pages, real content and every photo stored locally.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
# or production
npm run build && npm start
```

## Pages

| Route          | Source page                              |
| -------------- | ---------------------------------------- |
| `/`            | https://auracambodia.asia/               |
| `/about`       | https://auracambodia.asia/about          |
| `/menu`        | https://auracambodia.asia/menu           |
| `/events`      | https://auracambodia.asia/events         |
| `/gallery`     | https://auracambodia.asia/gallery        |
| `/reservation` | https://auracambodia.asia/reservation    |
| `/contact`     | https://auracambodia.asia/contact        |
| `/team`        | https://auracambodia.asia/team           |

## Photos

Web-sized copies (max 2400px long edge) live in `public/images/`. The untouched full-resolution originals, up to 7008×4672, are kept in `assets-original/` with the same folder layout.

```
public/images/
  brand/                 logo + favicon
  home/                  hero slides, welcome photos, venue, chef
  about/                 history, philosophy, Tripadvisor badge
  events/                private dining, event catering
  team/                  heart of the house, front of house
  menu/<category>/       one photo per dish, named after the dish (67)
  gallery/highlights/    the 12 homepage gallery photos
  gallery/venue/         "The Venue" tab (25)
  gallery/meetings-events/ "Meetings & Events" tab (40)
```

The gallery's "Menu" tab reuses the dish photos in `menu/`, because the live site shows the same files there.

- `docs/research/asset-manifest.json` maps every local file to its original URL.
- `scripts/optimize-images.mjs` regenerates the web copies from `assets-original/`.

## Content data

- `src/data/menu.json` holds all 10 menu categories and 67 dishes with prices and descriptions.
- `src/data/gallery.json` holds all 132 gallery photos with their filter category.

## Fidelity notes

The live site uses the Tailwind v3 CDN with Alpine.js. This clone uses Tailwind v4 and React, and `src/app/globals.css` pins the v3 behavior that differs:

- v3 hex colors and shadows.
- Multi-value drop shadows.
- Responsive font sizes resetting line height (applied by `scripts/v3-leading-fix.mjs`).
- `space-y` margin direction.
- Native date-input padding.
- Font Awesome 6.4.0 sitting below utilities in the cascade.

Fonts (Miranda Sans and Kantumruy Pro) and Font Awesome are self-hosted.

The contact form, table booking and "Check Status" lookup post to a Laravel backend on the live site. Here they show the same loading states and then a local confirmation, since there is no backend.
# aura
