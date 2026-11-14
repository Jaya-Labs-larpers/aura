# Events page: space feedback (handover)

Client feedback on the four space splits on the Events page (deck slides 14–17). All copy below is signed off. Apply it exactly; do not reword.

Read `AGENTS.md` first. Files:

- `src/content/events.ts`: space copy, tags, slides, Included grid
- `src/components/features/events/EventTags.tsx`: maps tags to icons (`iconFor`)
- `src/components/ui/Icons.tsx`: tag icons (`MicIcon` etc.)
- `assets/photos/spaces/`: source photos. Publish with `npm run photos`

`NBSP` below means the `NBSP` constant already used in `events.ts`. Keep the existing NBSP pattern inside tags (`Up${NBSP}to${NBSP}25`).

## 1. AURA Pavilion (`value: "pavilion"`)

- **Tags:** `Up to 25`, `Air-conditioned`, `KTV`, **`Presentation screen`** (new, last)
- **Body:** change "a 75-inch screen for slides" to "a 75-inch screen for presentations". The rest of the sentence stays the same:
  > Our principal indoor private room, tucked away from the bustle. Set it as one long table or in cabaret-style clusters, with a 75-inch screen for presentations and karaoke for later in the night.
- **bestFor:** `Private dining, VIP groups, business dinners, intimate celebrations, karaoke nights`
- **Slides:** no change.

## 2. The Terrasse (`value: "terrasse"`)

- **Tags:** no change (`Up to 20`, `Covered`, `Semi-private`)
- **Body:**
  > Long tables under a Khmer-timber pergola, just off the main dining floor, with a direct view of the event stage. Private enough for intimate conversations, and it combines seamlessly with the Main Deck for bigger nights.
- **bestFor:** `Client dinners, team gatherings, happy hours`
- **Slides:** move `venue/25-venue-image.jpg` to the first slide. It shows the most of the Terrasse. New order:
  1. `venue/25-venue-image.jpg`
  2. `spaces/terrasse-long-tables.jpg`
  3. `venue/22-venue-image.jpg`

  Keep each slide's existing `label`.

## 3. The Main Deck (`value: "main-deck"`)

- **Tags:** `60 seated`, `150 standing`, **`Semi-covered`**, **`Fan-cooled`**. Remove `Outdoor`.
- **Body:** no change.
- **bestFor:** `Company parties, product launches, networking events, concerts, buffet dining, happy hours & live music`
- **Slides:** no change.

## 4. Upper Rooftop (`value: "upper-rooftop"`)

- **Tags:** **`Up to 60 (2 wings of 30)`** (one tag; replaces `Up to 25 per wing`), `Covered`, **`Fan-cooled`**. Put NBSPs between all words, as in the other tags, so the tag never breaks across lines.
- **Body:** no change.
- **bestFor:** `Private groups, intimate business dinners, team parties, banquets, flexible table set-ups`
- **Slides:** the client says the current first photo does not show the character of the space. New order:
  1. `spaces/upper-rooftop-wing-day.jpg` (new). Label: `A covered wing of the Upper Rooftop under its timber roof, with rattan lanterns, frangipani trees and planters`
  2. `spaces/upper-rooftop-wing-louvres.jpg` (existing label)
  3. `venue/20-venue-image.jpg` (existing label)

  Remove `spaces/upper-rooftop-wing-dinner.jpg` from the slides. Leave the source file in `assets/`.
- `upper-rooftop-wing-day.jpg` is in `assets/photos/spaces/` but is not published yet (not in `src/content/photos.json`). Run `npm run photos` to publish it. Check that it now appears in `photos.json` and `public/images/photos/spaces/`. Publish only this photo; do not add photos for other pages.

## 5. Included grid (`included.items`)

- `TV screen`: change the text `75-inch screen, for slides & videos` to `75-inch screen, for presentations & videos`. The client asked for "presentations" instead of "slides".

## 6. Whole-venue capacity

The spaces now add up to 165 seated (25 + 20 + 60 + 60), so the whole-venue figure changes to match. Standing stays at 200.

- `buyout.tags`: change `125 seated` to `165 seated`. Leave `200 standing` as it is.
- `meta.description`: change "for up to 125 seated or 200 standing guests" to "for up to 165 seated or 200 standing guests".
- `125` appears nowhere else in `src/`. Search again after the edit to confirm.

## 7. Icons

In `Icons.tsx`, follow the existing tag-icon style: 24×24 viewBox, `stroke="currentColor"`, `strokeWidth="1.5"`, no fill, `aria-hidden`, default `className = "h-4 w-4"`. Each icon renders at 16px inside a 28px cream circle (12px inside 20px at `md`), so keep shapes simple.

- **`MicIcon`, redraw.** The current icon is a capsule on a stand with a U-shaped yoke. It reads as a studio/laptop mic. Draw a **handheld singing mic** instead: a round ball/grille head (mesh lines optional) on a tapered handle, tilted about 30–45°. Keep the name `MicIcon`.
- **`ScreenIcon`, new.** A monitor/TV: a rounded rectangle with a short stand and base. Used for `Presentation screen`.
- **`FanIcon`, new.** A ceiling or desk fan: three or four blades around a small hub. Must read clearly at 16px. Used for `Fan-cooled`.

In `EventTags.tsx` `iconFor`:

- Add `if (t.includes("screen")) return ScreenIcon;`
- Add `if (t.includes("fan")) return FanIcon;`
- Import both icons.
- `Semi-covered` already matches `covered` → `UmbrellaIcon`, so no change is needed. Make sure it does not hit the `private` check first. It will not, because `semi-covered` does not contain "private". `Semi-private` still matches the lock icon.
- `Up to 60 (2 wings of 30)` matches the `up to` check → `UsersIcon`.
- Update the doc comment above `iconFor` to list screen and fan.
- After this change, `SunIcon` is used by no tag. Leave the `outdoor` mapping in place; it costs nothing.

## Out of scope / do not change

- Intro / spaces header copy, occasions grid, form.

## Check

1. `npm run check` (lint + typecheck + build) passes.
2. Open `/events` with `npm run dev`. Check each of the four splits at desktop, `md` and phone widths:
   - The tags wrap cleanly. Main Deck and Upper Rooftop now have 3–4 tags each.
   - The new mic, screen and fan icons read clearly inside the cream circles.
   - Terrasse and Upper Rooftop open on their new first photos.
