# Home page redesign: handover plan

Status on 2026-11-03: the user has picked a variation for each home element. Nothing is built yet, and no files in `src/` have changed. The next session does the work below in order and stops at each **sign-off** gate.

Read first: `AGENTS.md`, `README.md`, `src/content/home.ts`, `src/content/site.ts`, `src/app/(home)/page.tsx`, `src/app/globals.css`.

## 1. Sources

| What | Where |
|---|---|
| Blueprint artifact (references, storyline, A/B/C variations, mockups) | https://claude.ai/artifact/3WTz7GxaTkJuavD9FYjbpk. Read it with the Artifact tool `read` action, not WebFetch. |
| Blueprint source + reference screenshots | `C:\Users\WORLDT~1\AppData\Local\Temp\claude\D--Sak-Projects-AURA-aura\1cf74dd7-58d8-427e-ba66-7618611a6725\scratchpad\` (`template.html`, `shots/*`, `plate_full.jpg`, `plates.jpg`). This is a temp folder. If it is gone, rebuild from the artifact. |
| AURA identity slide | `C:\Users\WORLDTECH COMPUTER\Pictures\Screenshot 2026-11-03 223405.png`. The full text is in section 4. |
| Plate photos | `assets/photos/menu/**` (see section 5) |
| Main reference | Amazónico (amazonicorestaurant.com). Other references: CÉ LA VI, Tichuca, Zuma, High House, Peridot HK, KA'TEEN. |

## 2. The user's picks (final)

| # | Element | Pick |
|---|---|---|
| 00 | Header and navigation | A · Quiet bar |
| 01 | Hero film + brand statement | B · Plate portal → full screen |
| 02 | Location | B · Zoom to the rooftop |
| 03 | Moving pictures strip | A · Self-moving strip, mixed widths |
| 04 | From lunch to late | A · Stacked cards, as now |
| 05 | Offers slideshow | B · Text panel + pushing photo |
| 06 | Events | **Dropped from the home page for now.** Keep the Events link in the nav. |
| 07 | Our story | A · Statement with a cursive turn |
| 08 | Footer | A · Textured brand footer |

Variation details and mockups are in the artifact, under each element.

## 3. The user's requirements for this round

- Build it hi-fi, not wireframe-quality. It must look good.
- Make the plate visual extraction (section 5) the top-quality item.
- Keep every background pattern subtle. It must blend in and never pop.
- Check the storyline before implementing it. Take the good parts from the 7 references.
- Make the copy crisp. Align it with the AURA identity (section 4) and with best practice. Use Amazónico as the model for tone and copy length.
- Leave the hero video for later. Build the plate portal with the existing stills/slides for now.

## 4. AURA identity slide (transcribed)

- **Our identity:** AURA (logo: pink dot + AURA wordmark)
- **Line:** "Mekong Modern: Khmer-rooted, world-open"
- **Core concept:** "We are an Accessible Premium, Khmer-rooted rooftop lounge, where discerning travellers and locals come to experience Modern Khmer cuisine, centered around signature steaks and Pan-Asian specialities, unique localized craft cocktails with a local touch, set in a warm, vibrant and charming social atmosphere in the heart of Phnom Penh."
- **6 target groups:** Cultural Explorers · Business Tourists · Package Tour Groups · Affluent Locals "A&B" · Corporate Event Groups · Urban Young Professionals
- **Food:** Khmer-first menu focus. Signature steak menu and pan-Asian specialties.
- **Drinks:** Khmer signatures as a magnet. Localized craft cocktails, mocktails, supported by strong classics.
- **Service style:** Charming, personal, fun. Customers feel seen and cared for by a charming team.
- **Price level:** Accessible Premium. Value for money, $18–25 average spend.

Copy rules that come from this slide:
- The slide is internal positioning. Do not put "Accessible Premium", the target groups or the $18–25 spend on the site.
- "Mekong Modern" and "Khmer-rooted, world-open" are the strongest candidates for the hero or story statement. They still need **sign-off** before they go live.
- Every line of copy must trace back to the slide or to `src/content/`. Never invent offers, prices, hours, awards or claims.
- Facts already approved in `src/content/`: Bassac Lane rooftop, charcoal grill, Kampong Chhnang grass-fed Wagyu, Fish Amok, Saraman, cocktails, lunch until late, Tripadvisor Travelers' Choice, hours in `HOURS`.
- Amazónico copy pattern: one short statement per section (3–8 words), an optional single supporting sentence, and one action. No paragraphs on the home page.

## 5. Plate visual extraction (top priority)

The side plate with the monstera leaf shows in many menu shots. The best views:
- `assets/photos/menu/signature/pork-knuckle-and-bbq-ribs.jpg` (bottom right). It is the clearest, but the cutlery covers part of the leaf. A crop is in the scratchpad as `plate_full.jpg`.
- `assets/photos/menu/main-course/fish-amok.jpg` (bottom left)
- Also visible in `aura-healthy-salad`, `cheese-and-charcuterie-platter`, `chicken-popcorn`, `fruitti-di-calamari`, `grilled-chicken-lollipops`, `oven-baked-oysters-and-mussels`, `trio-carpaccio`, `xl-smoked-duck-and-shrimp-spring-roll`, `authentic-beef-saraman`, `cobe-fish-fillet-180g`, `lamb-rack`, `seared-salmon-steak`, the `spaghetti-*` shots, `aura-chef-s-platters-4-people`, `duck-a-l-orange-4-people`, `oven-baked-rosemary-chicken-half`, `pork-knuckle-and-bbq-ribs`.

What the plate is made of:
- **Glaze:** warm off-white centre, about `#EFEEE2`.
- **Rim:** a solid green band (about `#226F39`) with a softer, lighter inner edge that fades into the glaze. The outer edge has a worn, speckled lip.
- **Leaf:** a monstera leaf painted in loose watercolour. It has two tones: a deep green (about `#3E8952`, with shadow `#114715`) and lime-yellow patches (about `#ACBC15`) that bleed into the green. It has rounded holes near the midrib and deep slits to the edge. The tip points down-right.

Steps:
1. Build the leaf as a real vector traced from the photo, not a hand-drawn guess. The blueprint's leaf is a rough placeholder; replace it.
   - Segment the leaf from `plate_full.jpg` and `fish-amok.jpg` with OpenCV colour masks (cv2 5.0 is installed; potrace is not).
   - Fill the parts the cutlery covers by using the other photos and mirroring the leaf's symmetry.
   - Save two layers: a deep-green layer and a lime layer, so the two-tone bleed survives.
   - Keep it lightweight: a clean SVG under about 15 KB.
2. Show the user the traced leaf next to the photo. **Sign-off** before using it. Recommend that AURA supply a flat top-down photo of a clean plate (or the original artwork) for the final trace.
3. Use the plate in these places only (from the blueprint):
   - **Rim:** the hero plate-portal frame (pick 01-B), plus thin rules and button rings.
   - **Leaf:** a tonal background pattern, plus one leaf that drifts down the page.
   - **Glaze:** the light background for "Our story".
   - Green marble behind offers (05-B). The black-and-white floor tile as a thin strip in the footer (08-A).

Rules for subtle backgrounds:
- Pattern = one tone on its own background: a slightly lighter green on `jungle`/`forest`, or a slightly darker cream on glaze. Never put lime or full-contrast leaf on a background.
- Start at 4–6% opacity. Test it on a normal laptop screen and a phone. If you notice it before the content, lower it.
- Keep text areas pattern-free or masked.
- The drifting leaf and the patterns must stop under `prefers-reduced-motion`.

## 6. Storyline check (do this before building)

The blueprint storyline is one evening at AURA: Arrive → Find → Feel → Taste → Return for → Believe → Visit. Dropping Events leaves this order:

00 Header → 01 Hero (Arrive) → 02 Location (Find) → 03 Strip (Feel) → 04 Lunch to late (Taste) → 05 Offers (Return for) → 07 Story (Believe) → 08 Footer (Visit)

Problems to resolve, with my suggestions:
- **The identity statement comes too late.** Amazónico states who it is right under the hero. Suggestion: put a one-line "Mekong Modern" statement in the hero, and keep 07 as the fuller story.
- **Location in slot 2 may be too early.** People need to want to come before they need to find you. Suggestion: test the order Hero → Strip → Lunch to late → Offers → Story → Location → Footer, and compare it with Amazónico's live home page.
- **Offers has no content yet.** If AURA supplies no offers, hide the section rather than ship placeholders.
- **Service style ("charming, personal, fun") does not show anywhere.** Suggestion: carry it in the story section and in the photo choices (staff photos), not in claims.

Deliver this as: the proposed order, one headline (+ optional one line) per section, each line tagged with its source (slide / `src/content` / new). **Sign-off** before building.

## 7. Build (after both sign-offs)

- Content goes in `src/content/home.ts`. Tokens go in `globals.css` (`@theme`). Add plate colours as tokens; no raw hex in components.
- Motion uses the shared loop in `src/lib/scroll.ts`, plus `<Reveal>`/`<RevealText>`. Respect `prefers-reduced-motion`.
- Remove from the home page: "The rooftop" split feature, "Chef and team" (merge into Story), the separate award band and booking band (merge into Story/Footer). The events section is not built.
- Hero: plate portal with the current slides. Leave a clear slot for the future video.
- Publish photos only for the home page (`npm run photos`).
- Run `npm run check`. Then screenshot at 1280 px and 400 px, and check that there is no horizontal scroll.

## 8. Still needed from AURA

- Sign-off on the hero/story statement ("Mekong Modern: Khmer-rooted, world-open" or another line)
- Offers content (titles, dates, terms), or a decision to hide the section
- A flat top-down photo of a clean plate, or the original leaf artwork
- Photos for the offline slots: Wagyu on stone, drink pouring, event table, staff serving
- The cursive font choice for 07 (three options in the artifact)
- Opening-hours facts F1–F4 (the Getting here band stays hidden until then)
- Hero video footage (later)
