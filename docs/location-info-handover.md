# Location section (home, section 7): info row implementation handover

Status on 2026-11-05: `Location.tsx` is already built and live on the home page (aerial photo, scroll-zoom, address + "Get directions" link). This task adds an info row to it. Build it in the next session, as its own task (separate from the Reserve card handover).

Read first: `AGENTS.md`, this file, `src/components/sections/Location.tsx` as it stands today. Design reference: the hi-fi mock, section "7 Visit", at https://claude.ai/artifact/404b5f72-e6a9-4528-b2ab-2b3dd657268d (search the page for `m-visit`). This doc overrides the mock where they differ.

## Job of the section

Location already answers "where". This task makes it also answer "when" and "how do I get up": add a three-column info row — Address, Hours, Getting up — under the title, and turn the plain "Get directions" text link into a Pill.

## Facts in this section are not confirmed yet — flag, don't guess

Two of the three columns use facts that conflict elsewhere in the repo or don't exist yet. **Do not silently pick one value and ship it.** Carry the conflict into the content file as a comment (same pattern as `SITE.rating`'s `// TODO before push: re-check` in `site.ts`), and render whichever value you pick with a visible marker so it doesn't slip through unreviewed — see "Render the open flags" below.

1. **Hours conflict.** `src/content/site.ts` → `HOURS[0]` says `"Monday – Sunday" / "11:30 AM – 01:00 AM"`. But `src/app/(classic)/reservation/page.tsx:52` says `"Monday – Sunday: 11:30 AM – 10:00 PM"`. That's a 3-hour gap on the closing time (1:00 AM vs 10:00 PM). Use `HOURS[0]` for this row (it's the newer, `content/site.ts`-sourced value), but this is exactly the kind of fact AURA must confirm before push — don't resolve the conflict yourself.
2. **"Getting up" doesn't exist in content yet.** No file in `src/content/` says which floor, whether there's a lift or only stairs, or where the entrance is. This is new copy from AURA, not something to infer from photos or invent. Ship a placeholder.

## Build

### Files

| File | Change |
|---|---|
| `src/components/sections/Location.tsx` | Add the `<dl>` info row; swap the "Get directions" text link for a `Pill`. |
| `src/content/home.ts` | Add `HOME.location.gettingUp` (placeholder string) and a code comment flagging both open facts. |
| `src/content/types.ts` | Add `gettingUp: string` to the `Location` props type (or inline the prop — match how `cta` is typed today). |

Content sourcing — do not hard-code in the component:
- Address: `CONTACT.addressLines` (`site.ts`) — already used in this component.
- Hours: `HOURS[0]` (`site.ts`) — new usage in this component; import `HOURS` alongside `CONTACT`.
- Getting up: `HOME.location.gettingUp` (`home.ts`) — new field, placeholder text, see below.

### Content to add (`src/content/home.ts`)

```ts
location: {
  eyebrow: "Bassac Lane",
  title: "Above the lane, among the plants.",
  slot: { label: "AURA rooftop at night from above, Bassac Lane", photo: "venue/05-venue-image.jpg" } satisfies Slot,
  cta: { label: "Get directions" } satisfies Omit<Link, "href">,
  // TODO before push: AURA to confirm which floor, lift or stairs, and where to
  // enter. Placeholder below is not real.
  gettingUp: "Ground floor, street entrance on St 308.",
},
```

Pick a placeholder sentence that is obviously a placeholder in tone if you want extra safety, but the `// TODO before push` comment is the load-bearing part — that's the pattern the rest of the repo's unconfirmed facts already use (see `SITE.rating` in `site.ts`).

### The info row

Mock structure (`m-visit .info`, a `<dl>` with three `<div>` children, each a `<dt>`/`<dd>` pair, a top border, and the label in small caps):

```tsx
<dl className="mt-6 grid gap-3.5 text-sm opacity-85 md:mt-7 md:grid-cols-3 md:gap-6">
  <div className="border-t border-cream/20 pt-2.5">
    <dt className="text-[10px] font-medium tracking-[0.28em] text-cream/60 uppercase">Address</dt>
    <dd>
      {CONTACT.addressLines.map((line) => (
        <span key={line} className="block">{line}</span>
      ))}
    </dd>
  </div>
  <div className="border-t border-cream/20 pt-2.5">
    <dt className="text-[10px] font-medium tracking-[0.28em] text-cream/60 uppercase">Hours</dt>
    <dd>
      <span className="block">{HOURS[0].label}</span>
      <span className="block">{HOURS[0].value}</span>
    </dd>
  </div>
  <div className="border-t border-cream/20 pt-2.5">
    <dt className="text-[10px] font-medium tracking-[0.28em] text-cream/60 uppercase">Getting up</dt>
    <dd>{gettingUp}</dd>
  </div>
</dl>
```

This replaces the current `<address>` + link block in `Location.tsx` (lines 60–76 as the file stands today). Keep it inside the same `<Reveal delay={150}>` the current block uses, or split the `<dl>` and the directions Pill into two `<Reveal>`s with staggered delays (150 / 300) — either is fine, match whichever reads better by eye.

### Directions Pill

Replace the current plain underlined `<a>` with the site's `Pill`:

```tsx
<Pill tone="outline" href={CONTACT.googleMaps} className="mt-6 md:mt-7">
  {cta.label}
</Pill>
```

`Pill` already handles `target="_blank" rel="noreferrer"` for external links — drop the manual `target`/`rel`/`className="underline..."` that's on the link today.

### Render the open flags visibly, don't bury them in a code comment only

Until AURA confirms both facts, add a small on-page marker so nobody mistakes the placeholder for final copy — same idea as the mock's inline "Confirm one set of hours" flag. Simplest approach that fits the design system: give the Hours and Getting up `<dd>` a trailing `<span className="ml-1 text-[10px] uppercase tracking-wide text-sand/80">(to confirm)</span>` — or, if the user prefers nothing visible on the live page, skip the on-page marker and rely on the `// TODO before push` comment alone. Ask before picking if it's not obvious from other confirm-later patterns in this repo; don't guess silently either way.

### Layout

- Phone (< 768): `<dl>` stacks, one column, full width.
- Tablet/desktop (≥ 768): three columns, `md:grid-cols-3`.
- The info row and the directions Pill replace the current bottom block; everything else in the section (photo, scroll-zoom, ring, eyebrow, title) is unchanged.

### Motion

- No new scroll effects. The existing `useScrollProgress` zoom/ring logic in this component stays exactly as it is.
- `<Reveal>` on the new `<dl>` and the Pill, respecting `prefers-reduced-motion` as already handled by `Reveal`.

## Check before you finish

- `npm run check` passes.
- 390px: three rows stack cleanly, no overflow; Pill is a normal tap target (44px).
- 768px and 1280px: three columns, evenly spaced, title and photo layout unchanged from today's build.
- Directions Pill opens `CONTACT.googleMaps` in a new tab.
- `git diff` touches only `Location.tsx`, `home.ts`, and `types.ts` (if the type is added there).
- The hours conflict and the "getting up" placeholder are both visible in a `// TODO before push` comment in `home.ts` — do not resolve the hours conflict by picking a value with no flag.

## Open (not for this task)

- **Hours conflict**: AURA to confirm real closing time; whoever resolves it should also check the classic `/reservation` page and the footer (`HOURS` in `site.ts`) for the same mismatch — this task only surfaces it on the home page's Location section.
- **"Getting up" copy**: AURA to supply the real floor/lift/stairs/entrance text.
