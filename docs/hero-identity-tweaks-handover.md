# Hero + identity card tweaks: handover

Status on 2026-11-04: the user gave 9 notes on the home page hero, header and identity card. Nothing is built yet. The next session builds them in the order below.

Read first: `AGENTS.md`, this file, `src/content/home.ts`, `src/components/layout/Header.tsx`, `src/components/sections/HeroFilm.tsx`, `src/components/sections/Identity.tsx`, `src/app/globals.css` (`kenburns` keyframes).

## 0. Ask the user first (one message, three questions)

1. **Paragraph 1 to 3 lines?** It is about 300 characters. Widening alone gets it to about 4 lines. 3 lines needs the copy cut by about a third, and copy changes need the user's sign-off. Default: keep the copy and accept 4 lines.
2. **"View Menus" on the "From lunch to late" cards too** (`home.ts`, the `cards[].cta` labels), or the hero only? Default: hero only.
3. **"world-open" or "world open"?** The identity slide says "Khmer-rooted, world-open". Default: the slide's hyphen.

Build part A with the defaults while waiting. Change it if the user answers otherwise.

## A. Mechanical changes (no design input)

1. **Header stays transparent longer.** The rule today is `setSolid(window.scrollY > 40)` in `Header.tsx`. On the home page (`pathname === "/"`), turn it solid only when the top of `#identity` reaches the bottom of the header. Other pages keep the 40 px rule. Use the shared `subscribeScroll` loop that is already there.
2. **Hero button label.** `home.ts` `hero.ctas[0].label`: "View menu" → "View Menus".
3. **Identity: remove the logo.** Delete the `<Image>` reveal in `Identity.tsx`. Remove the `logo` prop from the component and from `src/app/(home)/page.tsx`. The header logo stays.
4. **Identity: move the text up.** Cut the section padding (`py-24 md:py-36` → about `pt-16 pb-10 md:pt-24 md:pb-14`). Goal: on a 1280×800 desktop screen, the photo strip below starts to show on the same screen as the identity text, as on Amazónico.
5. **Identity: new title, slightly bigger.** Two lines, one per line (change `lead`/`accent` to a two-string title, like `Card.title`):
   - Line 1: "Discover the world of Mekong Modern dining."
   - Line 2: "Khmer-rooted, world-open."
   - Size `md:text-lg` → about `md:text-2xl`. Keep the uppercase and tracking. Widen the container (`max-w-3xl` → `max-w-4xl`) if line 1 wraps. The user said: if line 2 does not fit in the title, move it to the start of paragraph 1. At these sizes it fits.
6. **Identity: no orphan in paragraph 2.** Body width `max-w-[52ch]` → about `max-w-[75ch]`, and add `text-pretty`. Paragraph 2 must sit on 2 lines at 1280 px.
7. **Strip: remove the duplicate bar shot.** `site/rooftop-bar-day.jpg` and `site/rooftop-bar-night.jpg` show the bar from the same angle. Remove the day shot from `HOME.strip`. It moves to the hero (B3). Rule from the user: never show the same shot twice in the carousel.
8. **Strip: re-frame the carving shot.** `menu/chef-carving.jpg` is a tight crop of the chef's torso, and the dish is cut off. Replace it with `site/front-of-house.jpg` (the same scene, with the whole dish on the red table). If the strip's 5:4 crop still cuts the dish, add an optional `position` field to `Slot` (`src/content/types.ts`) and pass it to `object-position` in `Photo.tsx`. Then frame the photo on the dish (about `center 75%`).

## B. Build a default, then tune it live with the user

The user wants to try these out in the browser. Build the default and run `npm run dev`. Show it, then adjust.

1. **Stronger hero zoom.** Today the `kenburns` keyframes go from 1.02 to 1.14 over 18s (`globals.css`). Have 3 versions ready to try:
   - Soft: 12s, 1.0 → 1.18
   - **Medium (default):** 10s, 1.0 → 1.22
   - Strong: 8s, 1.0 → 1.28, with a small pan
   - Keep the slide interval (9000 ms in `HeroFilm.tsx`) close to the zoom duration so each slide zooms in once. Keep the zoom off under `prefers-reduced-motion`.
2. **Hero title contrast.** The gradient (`from-jungle/90 via-jungle/25 to-jungle/10`) is dark at the bottom, but the title sits in the middle, over about 25% dark. Default: add a soft radial dark glow behind the title area (jungle, about 40–55%, fading to 0 at the edges) and a light `text-shadow` on the `h1` and the tagline. Do not darken the whole photo: that flattens it. Use tokens, not raw hex.
3. **More hero photos.** `hero.slides` is typed `[Slot, Slot]`, and `HeroFilm` switches between them with a boolean. Change it to a `Slot[]` with an index that cycles. Default order:
   1. `site/hero-slide-2.jpg`: the front at night (current)
   2. `site/hero-slide-3.jpg`: from above at night (current)
   3. `site/rooftop-bar-day.jpg`: the bar by day (the user's idea, moved from the strip)
   4. Try with the user: `venue-highlights/04.jpg` (rooftops by day) or `venue-highlights/03.jpg` (bar inside at night).
   - Do not use these, because they repeat other shots: `venue/05`, `venue-highlights/05` (the Location section uses that shot); `venue/06`, `venue-highlights/06`, `site/where-it-all-began.jpg` (the same as slide 1).
4. **Add a vibe/staff photo to the strip.** Default: `site/heart-of-the-house.jpg`, the kitchen team in AURA aprons. It is the only staff group shot, and it carries the brand's "charming team" service style. Backup: `site/private-dining.jpg` (guests toasting). It is close to `events/guest-toast.jpg`, which the strip already has, so check the two side by side for a duplicate.
   - In the strip, keep day and night shots in turn and never put two similar shots next to each other.

## Photos

These photos are not published yet: `site/front-of-house.jpg`, `site/heart-of-the-house.jpg`, `venue-highlights/04.jpg`. Add them to `home.ts`, then run `npm run photos`. The script reads the photos from `home.ts`. Publish photos for the home page only.

## Scope

Change only the files listed above. Do not touch other sections, other pages or the plate/leaf work. Copy comes from the user's notes and the identity slide (`docs/home-redesign-handover.md` §4). Never invent copy.

## Verify

1. Run `npm run check` (lint + typecheck + build).
2. Take screenshots at 1280 px and 400 px wide, and check:
   - The header stays transparent over the hero and turns solid at the identity section.
   - The identity title is on 2 lines and paragraph 2 is on 2 lines (desktop).
   - The strip starts to show on the identity screen (1280×800).
   - No photo appears twice in the strip, and none appears in both the hero and the strip.
   - There is no horizontal scroll.
3. Turn on `prefers-reduced-motion` (DevTools rendering panel) and check that the zoom and slide changes stop.
