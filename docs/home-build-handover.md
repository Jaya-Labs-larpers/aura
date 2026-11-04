# Home page build: handover

Status on 2026-11-03: user picks are final (see `docs/home-redesign-handover.md` section 2). User has said to proceed and build, without waiting for further sign-off on storyline or leaf. A background agent may already be building this in parallel — check `git status` / `git diff` on `src/` before starting fresh work, to avoid duplicating it.

Read first, in order: `AGENTS.md`, `README.md`, `docs/home-redesign-handover.md` (full plan — follow it), `src/content/home.ts`, `src/content/site.ts`, `src/app/(home)/page.tsx`, `src/app/globals.css`.

## Sources

- Blueprint artifact (storyline, A/B/C variations, mockups): https://claude.ai/artifact/3WTz7GxaTkJuavD9FYjbpk — read with the Artifact tool's `read` action, not WebFetch.
- Plate leaf SVG (latest rebuilt trace, 4-source, corrected perspective): `C:\Users\WORLDTECH COMPUTER\AppData\Local\Temp\claude\D--Sak-Projects-AURA-aura\11addee9-4108-4914-9510-57c65ee16f54\scratchpad\leaf\leaf_v2.svg` (or `leaf_v3.svg` / its sign-off artifact if the leaf handoff session has produced one by the time you read this — check `docs/leaf-v3-handover.md` and the AURA artifact gallery for a newer version first).

## Decisions treated as green-lit (no further sign-off needed)

- **Storyline**: Hero (one-line "Mekong Modern: Khmer-rooted, world-open" statement) → Strip → Lunch to late → Offers → Story → Location → Footer. Hide Offers entirely if `src/content/` has no real offer content — never ship placeholder offers.
- **Leaf usage**: hero plate-portal rim, subtle tonal background pattern, one drifting leaf, glaze (`#EFEEE2`) background behind "Our story". Add plate colors (glaze `#EFEEE2`, rim `#226F39`, deep green `#3E8952`, shadow `#114715`, lime `#ACBC15`) as `@theme` tokens in `globals.css` — never raw hex in components.

## Hard rules (from AGENTS.md / handover — do not violate)

- Frontend only. No server code or API routes. Forms use the existing local `fakeSubmit` pattern.
- Content lives in `src/content/home.ts`. Components never hard-code copy, links, or contact details. Every line of copy traces back to the AURA identity slide (handover section 4) or existing `src/content/` facts — never invent offers, prices, hours, awards, or claims. Amazónico-style copy: short statement + optional one sentence + one action per section, no paragraphs.
- Motion subscribes to the shared loop in `src/lib/scroll.ts`; entrances use `<Reveal>`/`<RevealText>`. Everything (drifting leaf, background patterns) respects `prefers-reduced-motion`.
- Remove from home: "The rooftop" split feature, "Chef and team" (merge into Story), separate award band and booking band (merge into Story/Footer). Events stays dropped from home (keep its nav link).
- Hero: plate portal with current still photos/slides, not video (video is deferred). Leave a clear slot for the future video.
- Background patterns: start at 4–6% opacity, single tone on its own background (lighter green on jungle, or darker cream on glaze), never full-contrast leaf or lime on a background, text areas pattern-free.
- Only publish photos for the home page: `npm run photos`.
- Stage is "photos going in, page by page" — only touch the home page. Other pages stay wireframes.

## When done

1. `npm run check` (lint + typecheck + build) — fix any failures.
2. `npm run preview` if feasible, sanity-check the static export serves.
3. Report: what was built, any content gaps left as a visible TODO (missing offers content, unresolved hero-statement sign-off, missing photos for offline slots, cursive font choice for section 07 — see handover section 8 "still needed from AURA"), and the final `npm run check` result.

Do not touch anything outside the home page. Do not invent business facts. Leave changes uncommitted for review.
