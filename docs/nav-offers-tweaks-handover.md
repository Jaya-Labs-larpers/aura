# Nav + Offers carousel tweaks: handover

Status on 2026-11-04: all three changes below are made and confirmed by the user. This doc is a record for the next session picking up `npm run check` / review, not a pending task list.

Read first: `AGENTS.md`, this file.

## Changes made

1. **Offers carousel controls** — `src/components/sections/Offers.tsx`
   - Removed the prev/next arrow buttons (was a `.ml-auto hidden gap-3 md:flex` block with two `<button>`s).
   - Dots: now plain small round dots (`h-1.5 w-1.5 rounded-full`), active = solid `bg-cream`, inactive = `bg-cream/35 hover:bg-cream/60`. Previously the active dot stretched into a `w-6` pill.
   - Dots moved to bottom right (`flex justify-end`), was bottom-left-aligned flex row with arrows pushed right via `ml-auto`.
   - Autoplay/crossfade logic untouched.

2. **Header nav type size** — `src/components/layout/Header.tsx:62`
   - Section tab list: `text-[13px]` → `text-[15px]`.
   - The "Reservations" pill button next to it was left at `text-[13px]` (not asked to change).

3. **CTA label: "Book a table" → "Reservations"** — `src/content/site.ts:33`
   - `RESERVE.label` changed from `"Book a table"` to `"Reservations"`.
   - This is the single source used by: header pill (`Header.tsx`), mobile full-screen menu (`Header.tsx`'s `MobileMenu`), footer CTA pill and footer link list (`Footer.tsx`), and the `Bands` section default CTA (`Bands.tsx`).
   - **Left unchanged on purpose**: two hard-coded CTAs in `src/content/home.ts` — hero CTA (`home.ts:21`, "Book a table") and the "Lunch" card CTA (`home.ts:30`, "Book a table"). These read as in-context actions, not nav, so they kept their own copy. Also left unchanged: "Reserve your table" copy in the Offers section (`home.ts:74`/`81`) and page title `"Reserve Your Table"` in `src/content/pages.ts:150` and `src/app/(classic)/reservation/page.tsx` — out of scope, not nav-label copy.

## Scope

Touched only: `Offers.tsx`, `Header.tsx`, `site.ts`. No other sections, no content files beyond the one `RESERVE.label` string. Home page content plan in `docs/home-redesign-handover.md` / `docs/home-build-handover.md` is otherwise unaffected.

## Verify

Run `npm run check` (lint + typecheck + build). If it fails, the likely spots are:
- `Offers.tsx` — unused imports if any arrow-button-only helpers existed (none did; the arrows were inline SVG, no separate icon import removed).
- Any snapshot/test asserting old "Book a table" header/footer copy.
