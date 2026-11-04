# Home page photo gallery review: handover

Status on 2026-11-04: Part A of `hero-identity-tweaks-handover.md` is built. A8 swapped the strip's carving shot (`menu/chef-carving.jpg`, a tight crop that cuts off the dish) for `site/front-of-house.jpg`, framed with `object-position: center 75%`. That photo is referenced in `home.ts` but **not yet published** — `npm run photos` has not run.

This doc is for the next session to do two things: publish that photo, and sanity-check the rest of the home page's photo choices against the full gallery before publishing more.

## 1. Publish what A8 already picked

```
npm run photos
```

Reads `home.ts`, publishes any referenced-but-unpublished photo (WebP, `public/images/photos/`), registers it in `src/content/photos.json`. Confirm `site/front-of-house.jpg` renders for real (not a placeholder) and the `center 75%` crop keeps the dish in frame at both 1280px and 400px.

## 2. Review the gallery for better fits

Full gallery: `assets/photos/` — `events/` (40 shots), `menu/` (dishes, drinks, one chef shot), `site/` (hero/venue singles), `venue/` (01–25) and `venue-highlights/` (01–12).

Already spoken for on the home page (`src/content/home.ts`) — don't propose these again as a "new" fit elsewhere on the page:

| Section | Photo |
|---|---|
| hero.slides | `site/hero-slide-2.jpg`, `site/hero-slide-3.jpg` |
| cards | `venue-highlights/02.jpg`, `menu/signature/charcoal-grilled-khmer-wagyu-rib-eye-200g.jpg`, `venue-highlights/03.jpg` |
| strip | `site/rooftop-stairway-view.jpg`, `site/rooftop-bar-night.jpg`, `events/guest-toast.jpg`, `site/front-of-house.jpg` |
| offers | `menu/signature-cocktail/mango-colada.jpg`, `site/event-catering.jpg`, `events/14-meeting-and-event.jpg`, `events/32-meeting-and-event.jpg` |
| location | `venue/05-venue-image.jpg` |

Also used elsewhere on the site (other pages) — treat these as "spent" too, since reusing them on the home page would read as the same photo appearing twice across the site a visitor can click between in one session:

- `site/where-it-all-began.jpg`, `site/our-philosophy.jpg` — About
- `site/welcome-experience-1.webp` — Menu hero
- `venue/16-venue-image.jpg` — Events hero
- `site/private-dining.jpg`, `events/01/33/34/39-meeting-and-event.jpg`, `venue/24-venue-image.jpg`, `venue/22-venue-image.jpg` — Events page
- `venue/11-venue-image.jpg` — Gallery hero
- `site/heart-of-the-house.jpg` (×2), `site/chef-dun-sophol.jpg`, `events/38-meeting-and-event.jpg` — Team page
- `venue/12-venue-image.jpg` — Reservation panel
- `venue/02-venue-image.jpg` — Contact hero
- Everything already walled in `src/content/gallery.json` (132 entries — effectively most of `venue/`, `venue-highlights/` and `events/`) is the gallery page's full wall. Don't treat "it's in the gallery wall" as disqualifying — that page is meant to show everything — but do treat it as a flag worth surfacing if the same shot would now also anchor a home-page section.

What's worth a fresh look, because the handover doc already named them as live candidates or open questions:

- **B3 (hero slides)**: `site/rooftop-bar-day.jpg` is slated to move from the strip into the hero rotation. `venue-highlights/04.jpg` (rooftop by day) and `venue-highlights/03.jpg` (bar inside at night) are "try with the user" — `venue-highlights/03.jpg` is already used on the cards section above, so if you bring it into the hero, flag that as a repeat within the same page, not a clean addition.
- **B4 (strip vibe/staff shot)**: default is `site/heart-of-the-house.jpg`, flagged above as already used twice on the Team page. Before proposing it for the home strip too, look at it side by side with the backup (`site/private-dining.jpg`) and with `events/guest-toast.jpg` (already in the strip) for closeness, and check `venue-highlights/` and unused `events/` numbers (05–13, 15–20, 35–37, 40 aren't in the table above — verify against the live `gallery.json` before calling anything "unused") for a staff/vibe shot that isn't already carrying weight on another page.
- **Carving shot, more broadly**: `menu/chef-carving.jpg` (the one A8 replaced) and `events/34-meeting-and-event.jpg` ("Chef carving", used on the Events page) are two different carving shots. Confirm `site/front-of-house.jpg` is still the best fit for "a dish served at the table" once published and viewed at full size — if it isn't, that's worth flagging too, not just auto-accepted because it's what the prior handover doc specified.

## 3. Propose, don't decide

For any slot where you find a stronger or more distinctive photo than what's currently in `home.ts`, bring it to the user as 2–3 named candidates with a one-line reason each (lighting, crop, what it says about the brand, whether it repeats a shot elsewhere on the site) — the same way `hero-identity-tweaks-handover.md` framed B3's "try with the user" options. Don't edit `home.ts` on your own judgment call; the user picks.

## Scope

Home page only (`src/content/home.ts`, `src/components/sections/*` if a crop/position tweak is needed). Don't touch other pages, don't invent copy, don't publish photos for pages the user hasn't asked for (see `AGENTS.md`).
