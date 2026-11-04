# Hero + identity: Part B handover

Status on 2026-11-04: Part A of `hero-identity-tweaks-handover.md` is done and checked (`npm run check` clean). Part B — the live-tune items — was explicitly deferred. This doc hands it off.

Read first: `hero-identity-tweaks-handover.md` (full doc, especially §0 and §B), `home.ts`, `HeroFilm.tsx`, `globals.css` (`kenburns` keyframes).

Also still open from §0 of that doc (answered with defaults for Part A, not yet confirmed by the user):

1. Identity paragraph 1 at 4 lines (default, kept) vs. cutting the copy ~⅓ for 3 lines.
2. "View Menus" on the "From lunch to late" cards too, or hero-only (default: hero-only — cards still say "View menu").
3. "world-open" vs "world open" in the identity title (default: hyphen, as built).

Fold these into the same proposal round as B — the user should see all open questions together, not in separate drip messages.

## What to build before showing the user

Build the stated defaults for all 4 items below, run `npm run dev`, and have it ready to show — don't just describe it in prose.

1. **Hero zoom.** `kenburns` in `globals.css` currently 1.02 → 1.14 over 18s. Build the medium default: 10s, 1.0 → 1.22. Keep soft (12s, 1.0 → 1.18) and strong (8s, 1.0 → 1.28 + small pan) as alternates to switch to live, not three permanent variants in the codebase. Match `HeroFilm.tsx`'s slide interval (currently 9000ms) to the zoom duration so each slide completes one zoom. Zoom must be off under `prefers-reduced-motion` — verify in DevTools' rendering panel.
2. **Hero title contrast.** Add a soft radial dark glow behind the title (jungle token, ~40–55% opacity, fading to 0 at the edges) plus a light `text-shadow` on the `h1` and tagline. Don't darken the whole photo. Use `@theme` tokens, not raw hex.
3. **More hero photos.** Widen `hero.slides` from `[Slot, Slot]` to `Slot[]` with a cycling index. Default order: `site/hero-slide-2.jpg` (current), `site/hero-slide-3.jpg` (current), `site/rooftop-bar-day.jpg` (moved here from the strip per A7). Hold `venue-highlights/04.jpg` and `venue-highlights/03.jpg` as options to try live, not built in by default — see `docs/photo-gallery-review-handover.md` for why `venue-highlights/03.jpg` needs a flag (it's also on the cards section). Do not use `venue/05`/`venue-highlights/05` (Location section), `venue/06`/`venue-highlights/06`/`site/where-it-all-began.jpg` (same as slide 1).
4. **Strip vibe/staff photo.** Default: `site/heart-of-the-house.jpg`. Check `docs/photo-gallery-review-handover.md` first — that shot is already used twice on the Team page, so confirm with the user it's still the right call before publishing it a third time, or swap in whatever that review session proposed instead. Backup named in the original doc: `site/private-dining.jpg`, but check it against `events/guest-toast.jpg` (already in the strip) for closeness first.

## Then propose, don't ship

This is a live-tune round, not a build-and-done. Show the user the default build (dev server, screenshots, or both) and ask, item by item:

- Zoom: keep medium, or switch to soft/strong?
- Title contrast: glow + text-shadow enough, or stronger/different treatment?
- Hero photos: keep the 3-slide default, or add `venue-highlights/04.jpg` / `03.jpg`?
- Strip vibe shot: `heart-of-the-house.jpg` ok despite the Team-page repeat, or swap?
- Plus the 3 carried-over §0 questions above.

Don't commit to a final answer on any of these without the user's sign-off — that's the whole point of Part B being separate from Part A.

## Scope

Home page only: `home.ts`, `HeroFilm.tsx`, `globals.css` (kenburns keyframes + any new glow/shadow tokens). Don't touch other sections, other pages, or the plate/leaf work. Copy is already fixed from Part A — no new copy decisions here, only motion/photo/contrast tuning.

## Verify

1. `npm run check`.
2. `prefers-reduced-motion` on (DevTools rendering panel): zoom and slide transitions stop.
3. Screenshots at 1280px and 400px: title readable over all 3 hero photos, no horizontal scroll, strip still has no duplicate photo and nothing that repeats the hero.
