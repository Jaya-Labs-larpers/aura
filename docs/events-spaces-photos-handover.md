# Events page — space photos handover

Goal: replace the placeholder slides in the four space splits on `/events` (`spaces` array, `src/content/events.ts`) with the venue-space photos from AURA's corporate events deck.

Source: `AURA_Corporate_Events_Deck_v315AN.pptx` (Downloads), section 5 "Spaces", slides 17–21. All photos were extracted and matched against the repo. The best available file for each slot is listed below. Every file is already in `assets/photos/`, so no download is needed.

## What the deck has

- **Slide 17** "Find your place at AURA": one overview card per space (4 photos).
- **Slides 18–21**: one slide per space, 3 photos each, in this order: large top-right, bottom-left, bottom-right.
- Slide 22 (floor plan) has no photos. Slides 27–28 (Golden Season / buyout appendix) show event and drinks photos, not spaces. Do not use them here.

The deck's 3 photos per space, in deck order, already match the 3 slide `label`s in `events.ts` one for one. Keep the labels and add the `photo` field. The one exception is Pavilion slide 2: it gets a new photo and label (see below).

## Slide → photo mapping (do this)

Rule (user's call): where the repo has a clearer version of a deck photo, use the repo version. Where the deck's image is a low-res crop of a gallery photo, use the gallery photo instead. Its full-res original is in `assets-original/gallery/...` (local, gitignored), and `scripts/photos.mjs` picks it up when publishing.

### AURA Pavilion (deck slide 18)

| # | Existing label (keep) | `photo` | Size | Notes |
|---|---|---|---|---|
| 1 | The AURA Pavilion dressed for a private celebration… | `spaces/pavilion-private-celebration.jpg` | 2000×1333 | Only source. Deck crops 13% top, 10% bottom. |
| 2 | **Change label to** "The AURA Pavilion" (deck alt text) | `venue/19-venue-image.jpg` | original 6224×4672 | The deck's own Pavilion photo from slide 17. Replaces the deck's slide-18 photo, which is a crop of `events/32-meeting-and-event.jpg`. That photo is already intro slide 4 on `/events` (`events.ts:124`), and the user wants no repeated photos. Do not use `events/32` or `spaces/pavilion-celebration-service.jpg`. |
| 3 | An AURA chef carving at the table… | `spaces/pavilion-chef-carving.jpg` | 2400×1191 | Only source. |

### The Terrasse (deck slide 19)

| # | Existing label (keep) | `photo` | Size | Notes |
|---|---|---|---|---|
| 1 | Long tables on the Terrasse, beside the glass walls… | `spaces/terrasse-long-tables.jpg` | 2400×1232 | Only source. |
| 2 | A long candlelit table dressed for a client dinner… | `venue/22-venue-image.jpg` | original 6140×4609 | Replaces `spaces/terrasse-candlelit-table.jpg` (1288×639 crop of it). |
| 3 | The Terrasse's long table set for a dinner… | `venue/25-venue-image.jpg` | original 6224×4672 | Replaces `spaces/terrasse-dinner-table.jpg` (1288×639 crop of it). |

### The Main Deck (deck slide 20)

| # | Existing label (keep) | `photo` | Size | Notes |
|---|---|---|---|---|
| 1 | Guests gathered on the Main Deck during an evening event | `spaces/main-deck-evening-event.jpg` | **1307×670** | Only source (also checked all older decks). Low-res: it may look soft in the full-height desktop column. Ask AURA for the original if it does. |
| 2 | The open-air main dining floor at AURA, beneath the AURA sign | `spaces/main-deck-open-air-floor.jpg` | 3200×2400 | Deck crops 17% top and bottom. |
| 3 | Guests raising a toast with their host in the band corner… | `spaces/main-deck-band-corner-toast.jpg` | 2048×1365 | Deck crops 26% off the bottom. |

### Upper Rooftop (deck slide 21)

| # | Existing label (keep) | `photo` | Size | Notes |
|---|---|---|---|---|
| 1 | A covered wing of the Upper Rooftop set for dinner… | `spaces/upper-rooftop-wing-dinner.jpg` | 2400×1232 | Only source. |
| 2 | A covered wing of the Upper Rooftop with marble tables under timber louvres | `spaces/upper-rooftop-wing-louvres.jpg` | 2400×1191 | Only source. |
| 3 | A wing of the Upper Rooftop set up with a balloon arch… | `venue/20-venue-image.jpg` | original 6092×4573 | Not in `spaces/`. The deck file is a 1288×952 crop of this photo. Deck crops 11% top, 21% bottom. |

### Slide 17 overview photos (optional, not wired)

These are not used by default. They are listed in case the user wants a 4th, "empty room" lead slide per space.

| Space | `photo` | Size | Deck alt text |
|---|---|---|---|
| AURA Pavilion | — (`venue/19` is now Pavilion slide 2) | | |
| The Terrasse | `spaces/terrasse-pergola-night.jpg` | 1344×789 | The Terrasse at night |
| The Main Deck | `spaces/main-deck-bar-night.jpg` | 1172×689 | The open-air main floor at night, set around the bar |
| Upper Rooftop | `spaces/upper-rooftop-wing-day.jpg` | 1280×960 | A covered wing of the Upper Rooftop, lit warm among tropical planting |

The three `spaces/` files above were added in this session (slide-17 images, no larger version in any deck or in the repo).

## Steps

1. In `src/content/events.ts`, add `photo: "<path>"` to each of the 12 `slides` entries, per the tables above. Change the one label marked above (Pavilion slide 2).
2. Update the file's top comment: remove "Space photos are placeholders for now."
3. Publish: `node scripts/photos.mjs src/content/events.ts`. (`npm run photos` only reads `home.ts`.) Run it on this machine, so the full-res originals in `assets-original/` are used.
4. Check crops at 1440×900 and 390×844. From `md` up, each photo fills a half-width, full-height column (portrait). Below `md` it is 26:21. Most deck photos are about 2:1 landscape, so the portrait column keeps only the centre. Where the subject is cut, set `position` (desktop) or `mobilePosition` on the slot (`src/content/types.ts`).
5. `npm run check`.

Leave unchanged: the hero/intro slides, the catering slides (still placeholders, no deck photos), the buyout block (text only), and all other copy.

## Open questions for the user

Rule (user's call): no photo may appear twice on `/events`. All 12 picks above are unique on the page. Recheck if any slot changes.

1. **Low-res Main Deck slide 1** (1307px). Keep it, or ask AURA for the original?
2. Add the slide-17 overview photos as a 4th lead slide per space? Default: no.
