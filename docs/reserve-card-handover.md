# Reserve card (home, section 8): implementation handover

Status on 2026-11-05: designed, not built. Build it in the next session, as its own task (separate from the Location handover).

Read first: `AGENTS.md`, this file. Design reference: the hi-fi mock, section "8 Reserve band", at https://claude.ai/artifact/8wUyQPYuhWaHY3uSzSrn1a (v3) AND the newer "Part 7" mock at https://claude.ai/artifact/404b5f72-e6a9-4528-b2ab-2b3dd657268d. **This doc overrides both mocks on height — the Part 7 mock's `.m-band` is a tall, full-bleed band (padding up to `136px` top, `18–27cqi + 56px` bottom, "slides over Visit"). Do not build that. Build the compact card below instead.**

## Job of the section

The Reserve section is the last ask before the footer. It gives three ways to book: online reservations, WhatsApp and Telegram. One short proof line (Google rating, Tripadvisor award) supports the ask.

## Height is the point of this task

The mock renders this as a tall full-width band. **Do not.** Build a short, centred card:

- About **260px tall on phone**, about **160px tall on desktop**. That is the content height — title, buttons, proof line, with the card's own padding. Treat this as a hard ceiling, not a suggestion.
- No section padding stacked on top of card padding on both sides — the section (`py-16 md:py-24`) gives the breathing room around the card; the card's own padding (`px-6 py-10 md:px-12 md:py-12`) is for the content inside it. Don't add extra wrapper margins that push the total past the numbers above.
- No sticky behavior, no "slides over" effect, no arc animation tied to scroll. The card fades up once and stays in the normal flow.
- If a build ends up visibly taller than the ceiling (check by screenshot at 390px and 1280px), that's a bug in this task, not a future tweak — fix it before calling the task done.

## What changes from the mocks

1. **A card, not a full-width band.** Both mocks run a band edge to edge at full section height. Build a compact card instead, centred on the green ground, with space around it.
2. **Green, the same as the site.** The card uses the site's green ground: the leaf tile and the fine grain from `body::before` / `body::after` in `globals.css`. The card fill is one step lighter (`bg-forest`) than the page (`jungle`), so the card edge reads against the ground. The pattern looks the same; only the base tone lifts.
3. **No rim arc.** Remove the mocks' decorative arc. A thin rim-green ring (`ring-1 ring-rim/50`) marks the card edge instead. It echoes the plate rim.

## Build

### Files

| File | Change |
|---|---|
| `src/components/sections/Bands.tsx` | Add `ReserveCard`. Leave `CtaBand` as it is (no page uses it today, but inner pages may). |
| `src/app/globals.css` | Add `.leaf-card` (leaf tile + grain inside the card, see below). |
| `src/content/home.ts` | Add `reserve: { title: "Reserve your table" }`. |
| `src/app/(home)/page.tsx` | Render `<ReserveCard {...HOME.reserve} />` after `<Location>`, the last section before the footer. |

Links and proof come from existing content. Do not hard-code them:
- Reservations: `RESERVE` (`site.ts`), label "Reservations".
- WhatsApp and Telegram: `SOCIALS` in `site.ts`, found by `icon === "whatsapp"` / `"telegram"`.
- Rating: `SITE.rating`. Keep its `// TODO before push: re-check` comment. Render the rating only when `score` and `reviews` are set, as `Story.tsx` does.
- Award: `HOME.story.award` ("Tripadvisor Travelers' Choice"). Move it to `HOME.reserve.award` in the clean-up pass that deletes `Story`, not now.

### Section and card

- Section: `<section id="reserve" className="scroll-mt-20 px-3 py-16 md:px-6 md:py-24">`. No background, so the body's green ground shows around the card.
- Card: `relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-forest px-6 py-10 text-cream ring-1 ring-rim/50 md:px-12 md:py-12`.
- Leaf layer: first child `<div aria-hidden="true" className="leaf-card" />`. Content wrapper after it: `relative`.

```css
/* The site's green ground inside the Reserve card: same leaf tile and grain
   as body::after / body::before, on the forest fill. */
.leaf-card {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.leaf-card::before,
.leaf-card::after {
  content: "";
  position: absolute;
  pointer-events: none;
}
.leaf-card::before {
  inset: 0;
  background-image: /* same grain SVG data URI as body::before */;
}
.leaf-card::after {
  inset: -25%;
  background: url("/images/brand/leaf-pattern.webp") 0 0 / 360px 360px repeat;
  opacity: 0.04; /* body uses 0.0242 on jungle; the lighter fill needs a little more */
  transform: rotate(-6deg);
}
```

Tune the leaf opacity by eye at 1280px against the page ground. The card pattern must look like the same pattern as the page, never stronger. Keep the copy area readable: if the tile shows behind the title, add a radial mask the same way as `.leaf-tone` (`--leaf-clear`).

### Layout

| Width | Layout |
|---|---|
| Phone (< 768) | Centred, stacked: title, buttons, proof line. Reservations button full width. WhatsApp and Telegram share the next row, half width each. |
| Tablet and desktop (≥ 768) | One row: `md:flex md:items-center md:justify-between md:gap-10 md:text-left`. Left: title, proof line under it. Right: the three buttons in one row (`flex-nowrap`). |

The card is short on purpose — see "Height is the point of this task" above. Do not add a photo, an eyebrow or body copy; any of those would push past the ceiling.

### Parts

- **Title:** `<RevealText text={title} className="font-display text-3xl leading-[1.1] md:text-4xl" />`. This is a card, so it is one step smaller than the section titles (`text-4xl md:text-5xl lg:text-6xl`).
- **Buttons:** `<Reveal delay={300}>`, wrapper `mt-7 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0`.
  - `<Pill href={RESERVE.href} className="col-span-2">Reservations</Pill>`: solid, the main action.
  - `<Pill tone="outline" href={wa.href} className="gap-2"><SocialIcon name="whatsapp" />WhatsApp</Pill>`.
  - `<Pill tone="outline" href={tg.href} className="gap-2"><SocialIcon name="telegram" />Telegram</Pill>`.
  - `Pill` already opens `https:` links in a new tab with `rel="noreferrer"`. All pills are `h-11` (44px), which is a safe tap target.
- **Proof line:** `<Reveal delay={420}>`, `mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm opacity-75 md:mt-3 md:justify-start`. Two underlined links, as in `Story.tsx`: "★ 4.7 Google" (`SITE.rating.href`) and "Tripadvisor Travelers' Choice" (`award.href`), both `target="_blank" rel="noreferrer"`.

### Motion

- The card fades up once with `<Reveal>`; the title uses the word split; buttons and proof follow with the delays above.
- No scroll effect, no sticky, no parallax. `<Reveal>` already respects `prefers-reduced-motion`.

## Check before you finish

- `npm run check` passes.
- 390px: card has a 12px side gutter (`px-3`) on the ground; Reservations full width; WhatsApp and Telegram on one row with labels not cut; the proof line wraps cleanly; **measured card height is close to 260px, not more.**
- 768px and 1280px: one row; the buttons do not wrap; the title stays on one line at 1280px; **measured card height is close to 160px, not more.**
- The card edge is visible against the page ground, and the leaf tile matches the page tile in size and angle.
- WhatsApp opens `https://wa.me/85598663389`; Telegram opens `https://t.me/auraphnompenh`.
- `git diff` touches only the files in the Files table.

## Open (not for this task)

- **Duplicate Reservations button.** The locked footer also has a Reservations pill, right below this card. The user has not decided yet. Keep both for now.
- **Rating:** re-check 4.7 / 998 on AURA's Google profile before push (`site.ts` TODO).
- **Clean-up pass:** when `Story` is removed for good, move `award` into `HOME.reserve` and delete `HOME.story`.
