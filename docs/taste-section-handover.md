# Taste section (home, section 4): implementation handover

Status on 2026-11-05: designed, not built. Build it in the next session.

Read first: `AGENTS.md`, this file. Design reference: the hi-fi mock, section "4 Taste", at https://claude.ai/artifact/8wUyQPYuhWaHY3uSzSrn1a (v3). This doc overrides the mock where they differ.

## Job of the section

Taste comes right after the photo strip. It tells the guest what AURA cooks, makes them hungry, and sends them to the menu. It names one signature dish: the charcoal-grilled Kampong Chhnang Wagyu.

## What changes from the v3 mock

1. **Remove the caption under the photo.** Delete the dish name line ("Charcoal-grilled Khmer Wagyu rib-eye") and the meta line ("200g · Kampong Chhnang grass-fed Wagyu"). Keep the "Signature" badge on the photo. Keep the dish name in the image `alt` text.
2. **New title and lead copy.** The copy now carries the story: Mekong Modern cooking, Wagyu from Kampong Chhnang farms, the charcoal grill. It must make the reader want to eat.

## Copy (draft: needs sign-off before launch)

Put the copy in `HOME.taste` in `src/content/home.ts`. Components never hard-code copy.

| Field | Text |
|---|---|
| eyebrow | Taste |
| title | Mekong Modern, fired over charcoal. |
| lead | Our Wagyu is raised on pasture in Kampong Chhnang, grazed slowly for over two years until the marbling runs deep. We grill it over local charcoal, crust crackling, then finish it with a Kampot green peppercorn sauce. Smoke, spice and a Khmer soul in every bite. |
| badge | Signature |
| photo alt | Charcoal-grilled Khmer Wagyu rib-eye on the plate |
| tag 1 | Food |
| tag 2 | Cocktails |

Alternative titles, if the user prefers one:
- "Fired over charcoal, rooted in the Mekong."
- "From Kampong Chhnang pasture to our grill."

Where each fact comes from (so nothing is invented):
- "Mekong Modern": AURA's own term, in `home.ts` (hero `text`, identity `title`).
- "Kampong Chhnang grass-fed Khmer Wagyu", "charcoal-grilled": `menu.json` Wagyu items and `SITE.description`.
- "Kampot green peppercorn sauce": `menu.json`, Wagyu Tomahawk description.

Revised 2026-11-05: rewritten as storytelling copy from AURA's own Cambodian-beef sourcing material (pasture-raised in Kampong Chhnang, 2+ years grazing, marbling, local charcoal). Drops "straight from the farm" so it no longer claims direct sourcing — TODO resolved, no sign-off blocker left for this line.

## Build

### Files

| File | Change |
|---|---|
| `src/components/sections/Taste.tsx` | New. Copy of the `Story.tsx` glaze panel, with the layout below. |
| `src/content/home.ts` | Add `taste` (copy above, the photo slot, two tag links). |
| `src/content/types.ts` | Add the `Taste` content type, if the file keeps one type per section. |
| `src/app/(home)/page.tsx` | Render `<Taste {...HOME.taste} />` right after `<PhotoStrip>`. Remove `<Story>` from the homepage (Option A: Taste takes the Story panel). |

Keep `Story.tsx` and `HOME.story`. The Reserve card reads `HOME.story.award` until the clean-up pass (see `docs/reserve-card-handover.md`). Do not touch `Offers` or `StackedCards` in this task.

### Content shape

```ts
taste: {
  eyebrow: "Taste",
  title: "Mekong Modern, fired over charcoal.",
  // TODO: AURA to confirm "straight from the farm" (direct sourcing).
  lead: "Our grass-fed Wagyu comes straight from the farm in Kampong Chhnang. …",
  badge: "Signature",
  slot: {
    label: "Charcoal-grilled Khmer Wagyu rib-eye on the plate",
    photo: "menu/signature/charcoal-grilled-khmer-wagyu-rib-eye-200g.jpg",
  } satisfies Slot,
  tags: [
    { label: "Food", href: "/menu", slot: { label: "Khmer sharing platter", photo: "site/welcome-experience-1.webp" } },
    { label: "Cocktails", href: "/menu", slot: { label: "Aura Sling cocktail", photo: "menu/signature-cocktail/aura-sling.jpg" } },
  ],
},
```

All three photos are already published in `src/content/photos.json`. Do not run `npm run photos`.

Both tags go to `/menu`. `MenuTabs.tsx` has no deep link to a tab today. A `/menu#signature-cocktail` link for Cocktails would need new code in `MenuTabs`, so it is out of scope unless the user asks.

### Panel (same as Story)

- Outer: `<section id="taste" className="scroll-mt-20 py-8 md:py-12">`. The green ground shows above and below the panel.
- Panel: `relative overflow-hidden bg-glaze text-ink`, padding `px-6 pt-36 pb-14 md:px-12 md:py-24 lg:px-16 lg:py-28`.
- `<LeafTone clear="radial-gradient(ellipse 60% 75% at 50% 58%, transparent 45%, #000 100%)" />`, the same as Story.
- `<PlateLeaf>`: `absolute rotate-[-14deg] opacity-40 mix-blend-multiply`.
  - Phone: `top-5 right-4 w-[120px]`. It sits in the space above the copy, never behind text.
  - md: `md:top-6 md:-right-[2%] md:w-[24vw] md:opacity-35`.
  - lg: `lg:top-2.5 lg:-right-14 lg:w-[20vw]`. It tucks behind the photo's top corner.
  - `sizes="(min-width: 1024px) 20vw, (min-width: 768px) 24vw, 120px"`.
- This is the only leaf motif on screen in this section.

### Layout

Inner wrapper: `relative mx-auto grid max-w-[1120px] gap-9`.

| Width | Layout |
|---|---|
| Phone (< 768) | One column, in DOM order: copy, photo (4:5), tags (two pills side by side). |
| Tablet (768–1023) | Same order. Photo turns 16:10. Tags row `max-w-[460px]`. |
| Desktop (≥ 1024) | `lg:grid-cols-[5fr_7fr] lg:gap-x-16`. Copy top-left (`lg:self-end`), tags bottom-left, photo on the right across both rows (`lg:col-start-2 lg:row-span-2 lg:row-start-1`), photo 5:4. |

### Parts

- **Eyebrow:** `<Eyebrow className="text-ink/60">`.
- **Title:** `<RevealText>`, `font-display text-4xl leading-[1.08] md:text-5xl lg:text-6xl`, `max-w-[13ch]`, `text-wrap: balance`. This is the one title size used by every new section.
- **Lead:** `mt-5 max-w-md text-[15px] leading-relaxed opacity-80`, in `<Reveal delay={400}>`. The lead is longer than in the mock, so it uses `max-w-md` (not 34ch). Keep it to about five lines on a 390px phone.
- **Photo:** `<figure>` with a `relative overflow-hidden rounded-[2px] bg-moss` box at the aspect ratios above. `<Photo slot sizes="(min-width: 1024px) 58vw, 100vw" bare className="h-full w-full">` with `object-position: 64% 62%` (this crop shows the steak, not the plate edge, on phone). No `<figcaption>`.
- **Badge:** `absolute top-3.5 left-3.5 rounded-full bg-rim px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream`.
- **Tags:** `<ul aria-label="Menus" className="grid grid-cols-2 gap-2.5">`. Each tag is a link pill:
  - `flex min-h-[58px] items-center gap-2.5 rounded-full border border-ink/20 py-1.5 pr-3.5 pl-1.5 transition-colors hover:border-ink hover:bg-ink/5`.
  - A round photo, `h-11 w-11 rounded-full object-cover` (md: `h-[46px] w-[46px]`), with `alt=""`.
  - The label, `text-[15px] font-medium`.
  - `<ArrowIcon className="ml-auto h-4 w-4 opacity-55" />`.
  - The whole pill is the link (Next `<Link>`), so the tap target is 58px high.

### Motion

- Entrances only: eyebrow `fade`, title word split, photo `<Reveal delay={200}>`, tags `<Reveal delay={520}>`.
- No scroll effect and no parallax. `<Reveal>` already respects `prefers-reduced-motion`.

## Check before you finish

- `npm run check` passes.
- 390px: leaf above the copy, not behind it; steak centred in the 4:5 crop; both tags on one row, labels not cut.
- 768px and 1280px: the layouts in the table above; on desktop the photo top aligns with the panel's content top.
- No caption under the photo. The badge still shows.
- `git diff` touches only the files in the Files table.

## Open (not for this task)

- AURA to sign off the title and lead copy (storytelling rewrite, 2026-11-05).
- The Dinner card in `StackedCards` still shows the same Wagyu photo. The section 5 pass (Lunch · Sunset · Late night) replaces it.
