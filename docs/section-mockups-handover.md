# Handover: hi-fi mockups for the remaining Option A sections

**Date:** 2026-11-05
**For:** a fresh Claude session (or designer) picking up the homepage build
**Read first:** `AGENTS.md`, `docs/home-redesign-handover.md`, `docs/home-build-handover.md`
**Reference artifact:** "AURA Homepage Playbook" — https://claude.ai/artifact/8k7CYgdW168aV2GEXvvWGM (Parts 5–6 document exactly what this repo already has built; this doc picks up where that stopped)

## Why this doc exists

The homepage follows a locked structure ("Option A — Day to Night", 8 sections: Hero → Identity → Photo strip → Lunch-to-late cards → Offers → Music/after dark → Story/proof → Visit/Reserve). An audit of this repo (`src/app/(home)/page.tsx`) found sections 1–3, 5 and 7 already built and polished. Two sections are not resolved:

1. **Section 6, "Sounds" / after-dark** — zero content or component exists anywhere in the codebase.
2. **Section 8, "Reserve"** — a working `CtaBand` component exists (`src/components/sections/Bands.tsx`) but was deliberately left out of the home render per `home-build-handover.md`'s decision to fold reserve into Story/Footer instead.

Your job: **produce hi-fi mockups** for both, styled to match the rest of the home page, so the user can pick a direction before anything gets coded. Do not write production code yet — this is a design pass. Use an HTML artifact for the mockup(s), not a code change in this repo.

## Hard rules (carried over from `AGENTS.md` / the other handover docs — still apply)

- Frontend only. No invented business facts, prices, hours, or offer content — if real copy doesn't exist yet, mock it up clearly labeled as placeholder, same convention as `src/content/home.ts`'s existing `offers` placeholder comment.
- Don't touch anything outside this design pass. Nothing in this repo needs to be committed or changed for the mockup step.
- Motion must look like it respects `prefers-reduced-motion` (static fallback should be implied in the mockup, doesn't need to be literally interactive).
- Never use raw hex in your reasoning about "what this would be built with" — name the design tokens below.

## Design system to match (read these files before mocking up anything)

- `src/app/globals.css` — `@theme` tokens. Palette already in use:
  - `--color-jungle #04201a`, `--color-forest #083b2c`, `--color-moss #17352f`, `--color-leaf #0d4f3b` (greens, dark→mid)
  - `--color-cream #f2fff7`, `--color-ivory #fcfaf6`, `--color-sand #e6dcc3` (light neutrals)
  - `--color-ink #10231e` (near-black text)
  - `--color-bloom #d92b78` (accent — used sparingly only)
  - `--color-glaze #efeee2` (the Story section's panel background)
  - `--color-rim #226f39`, `--color-plate #3e8952`, `--color-plate-shadow #114715` (the plate/leaf motif greens)
  - `--color-lime #acbc15`
- `src/components/ui/LeafMotif.tsx` — `LeafTone` (background leaf pattern, 4–6% opacity rule, never over text), `PlateLeaf` (single drifting leaf), `LeafMark` (larger decorative silhouette). Reuse one of these, don't invent a new motif.
- `src/components/ui/Reveal.tsx` — `<Reveal>` / `<RevealText>` entrance pattern; every section on the live build uses staggered `delay` props on these.
- `src/components/ui/Buttons.tsx` — `Eyebrow`, `Pill` CTA style.
- `src/lib/scroll.ts` — scroll-driven effects (`subscribeScroll`, `useScrollProgress`, `clamp`) — this is how `Location.tsx` does its scroll-zoom and `StackedCards.tsx` does its Ken Burns/dimming. If your mockup proposes scroll-reactive motion, describe it in these terms so it's buildable later.

Look at `Story.tsx` and `Location.tsx` directly (already read into this session) — they're the two most recent, most refined sections and are the best visual reference for "what AURA's rooftop-at-night, editorial, Amazónico-inspired look" means in code. `Offers.tsx` is explicitly modeled on "Céla Vi's offerings slider" — same bar for polish.

## Section 6: "Sounds" / after-dark

**What exists:** nothing. No content field in `src/content/home.ts`, no component, no photos tagged for it.

**What it needs to communicate:** AURA has a late-night / bar / music identity (`hero.chips` already includes "Late drinks"; one of the `cards` is "Late drinks at the bar"). This section is the one true differentiator gap flagged by competitor benchmarking (Part 5 of the playbook artifact: Tichuca's "Sounds" block was the inspiration, "biggest gap, no existing content").

**What you don't have (flag, don't invent):** no DJ nights/resident-DJ schedule, no music-genre info, no after-dark-specific photography confirmed separate from the existing `venue-highlights/03.jpg` (bar at night) and `site/rooftop-bar-night.jpg` strip photo. Mock up with the photos that already exist in `public/images/photos/` (grep for "night" to find them) rather than placeholder-labelled fake ones, and note in your mockup caption that real content (schedule, DJ names, genre) is still needed from AURA before this can ship.

**Starting ideas worth mocking up (pick one or offer 2):**
- A dark, full-bleed night-photo panel (same treatment as `Location.tsx`'s sticky aerial) with a short "After dark" eyebrow + one-line copy + a `LeafMark` silhouette, no carousel — the simplest, lowest-content-risk option.
- An `Offers.tsx`-style carousel reused for "what's on after dark" (DJ nights / live music / happy hour) if the user wants it slide-based like section 5 — but this needs real recurring-event content, flag that dependency clearly.

## Section 8: "Reserve"

**What exists:** `CtaBand` in `src/components/sections/Bands.tsx` — default title "Reserve your table", `tone="forest"`, centered `Pill` CTA sourced from `RESERVE` in `src/content/site.ts`. It's used on inner pages today but intentionally not imported into `(home)/page.tsx`.

**The actual open decision (not a design question — surface it to the user, don't resolve it yourself):** `home-build-handover.md` green-lit merging Reserve into Story/Footer instead of a standalone band. `Story.tsx` already closes with the rating + Tripadvisor award line, and the footer (`src/components/layout/Footer.tsx`) carries the plate-rim leaf treatment per the Nov 4 footer work (see memory `aura-website-audit.md`). So there are two legitimate directions:
1. **Reinstate `CtaBand` as a real section 8** between Story and Footer — lowest-effort, component already built and already on-brand (uses the same tone/`Pill` system as every other section).
2. **Keep Reserve folded into Story + Footer** and instead mock up a *stronger* version of that merge — e.g. a reserve CTA integrated directly into `Story.tsx`'s bottom row (alongside the rating/award links) rather than left purely implicit in the footer.

Also related and still blocked: `GettingHereBand` in `Bands.tsx` renders `null` until `HOME.gettingHere` is set — it exists and is on-brand but needs AURA to confirm real hours first (the footer-vs-reservation-page hours mismatch flagged in the playbook's Part 5 `.bugs` box is the blocker). Mention this in your mockup notes as a dependency, don't try to resolve the hours conflict yourself.

**Deliverable for section 8:** mock up both directions side by side so the user can pick, using the real CTA copy/link already in `src/content/site.ts`'s `RESERVE` field (don't invent new reserve copy).

## What to hand back

One HTML artifact (or a couple, your call) showing hi-fi, on-brand mockups for:
- Section 6 (Sounds) — at least one direction, photos pulled from the repo's real `public/images/photos/` assets, clearly flagging what content is still missing.
- Section 8 (Reserve) — both directions (reinstated `CtaBand` vs. strengthened Story/Footer merge).

Use the existing palette/token names and existing component behavior (don't invent a new visual language) so whatever the user picks can be built directly against this repo's components.
