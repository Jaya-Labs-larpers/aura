# Events page copy + structure: implementation handover

Status on 2026-11-12: proposal accepted, with the "5 steps to your event" block dropped. Not built. Build it in the next session as one task.

Read first: `AGENTS.md`, this file. Page: `src/app/(home)/events/page.tsx`. Copy: `src/content/events.ts` (`EVENTS`). Types: `src/content/types.ts`. Splits: `src/components/sections/EventSplit.tsx`. Form: `src/components/features/events/EventEnquiry.tsx`. Contact details: `CONTACT` in `src/content/site.ts`.

Research report (5 reference sites, measured line and orphan counts, draft copy at real width): https://claude.ai/artifact/8XwThCwB6JETfp6y6Dyc3L

## Build checklist (in this order)

Already done: the space field was removed from the enquiry form (2026-11-12).

1. [x] **Form cleanup** (§8). Needed for stand-up.
2. [x] Copy in `events.ts`: intro, spaces header, whole venue, 4 spaces, occasions, included, contact line (§1).
3. [x] `EventGridItem` type (§2).
4. [x] New `EventGrid.tsx` for occasions + included (§3).
5. [x] Orphan classes in `EventSplit` and `SpacesHeader` (§4, §5).
6. [x] New page order in `page.tsx` (§5).
7. [x] GM contact line under the form intro (§6).
8. [x] Acceptance: `npm run check` and the orphan script at 360, 390, 430 and 1440 px — all pass, no orphans. Two "included" item texts (Sound system, Table styling, Logo signage, Branded lighting, Valet parking) needed ` ` binding on their last two words beyond what §1 specified, found by running the script.

Built 2026-11-12.

## Where this comes from

We studied the private events pages of CÉ LA VI SG, Zuma (Dubai), Ozone HK, HighHouse SG and Amazónico Dubai. We measured every text block at 1440 px and 390 px. Findings that drive this build:

- The strong pages put **capacity first**, directly under the space name (CÉ LA VI).
- The best space paragraphs hold **25–45 words**. Amazónico (about 60) and Zuma (up to 125) read as walls of text.
- At AURA's 350 px column, desktop and mobile both give **about 7 words per line**. Words ÷ 7 = lines on both views.
- **Every reference has orphans on mobile.** AURA today has 3 on desktop and 3 on mobile:
  - The Pavilion's capacity/features line ends on "TV".
  - The Upper Rooftop's capacity/features line.
  - Catering paragraph 2.
  - The Upper Rooftop's "Best for" line, on mobile.
- AURA's deck holds proof none of the references show: a named GM, 12 included extras and dietary care. The page shows none of it yet.

## Target page order

```
1. Intro split (h1)               EventSplit           copy rewritten
2. Spaces header + whole venue    SpacesHeader         copy rewritten
3. 4 space splits                 EventSplit           copy rewritten, capacity first
4. Whatever the occasion          EventGrid  (new)     4 event types
5. Included with every event      EventGrid  (new)     12 extras
6. Event catering                 EventSplit           unchanged copy
7. Enquiry + direct contact       EventEnquiry         GM contact line + form cleanup (Build §8)
8. Footer
```

Out of scope: the 5 booking steps (dropped), deposit/cancellation terms, drinks packages, dietary block, Golden Season block. Photos: unchanged; do not publish new photos.

## Design: match the home page (main page)

New sections use the home page's idioms, not new ones:

- **Ground:** the patterned green body ground with no section background, the same as `Identity` and the `Offers` heading. Text is `text-cream`. Body copy is `text-cream/60` (as in `EventSplit`) or `/80` for lead lines (as in `Identity`).
- **Section intro:** centred. Use `Eyebrow`, then a display `h2` set like `SpacesHeader`: `font-display text-[clamp(28px,calc(19px+1.2vw),40px)] leading-[1.2] font-normal tracking-[0.01em]`. Then the `Identity` rim divider: `<span aria-hidden className="block h-px w-14 bg-rim" />` with `mt-7`.
- **Item text:** item titles use `font-display text-xl text-cream` (the same as the buyout title in `SpacesHeader`). Item text uses `text-[15px] leading-[1.47] text-cream/60`.
- **Dividers:** hairlines `border-cream/15`, as in `SpacesHeader`. No cards, no fills, no radius.
- **Vertical rhythm:** the same section padding as `SpacesHeader`: `px-5 py-[clamp(60px,calc(-8.38px+8.9153vw),120px)]`.
- **Motion:** the new grids use `<Reveal>` like the home page. The intro uses `variant="fade"`. Items use `variant="soft"` with a 60 ms stagger (`delay={i * 60}`), as `Offers` does. The `EventSplit` sections stay static, as they are now (a decision from an earlier session). `Reveal` already respects reduced motion in `globals.css`.
- **Tokens only:** `bg-rim`, `text-cream`, `border-cream/15`, `font-display`, `ease-out-expo`. No raw hex.

## Build

### 1. Copy in `src/content/events.ts`

Use `\u00A0` (non-breaking space) where shown as `·nb·` below. It keeps number and unit pairs together and stops orphans.

**Intro** (`EVENTS.intro`)

```ts
title: "Private events at AURA",
body: [
  "Private dining, celebrations and company nights in our rooftop garden above Bassac·nb·Lane, from intimate dinners to 200·nb·standing guests across the whole venue.",
  "One event planner looks after you from first enquiry to last toast. Our General Manager, Chamroeun·nb·Pok, oversees every event.",
],
```

Keep the `slides`, `enquire` and `call` fields as they are. The four seasonal offer paragraphs leave this page; they still live on the home page in `HOME.offers`.

**Spaces header** (`EVENTS.spaces`)

```ts
eyebrow: "Spaces",
title: "Find your place at AURA",
text: "Two levels, four spaces, from intimate dinners to 200·nb·standing guests.",
```

**Whole venue** (`buyout`)

```ts
title: "The whole venue",
tags: ["125 seated", "200 standing"],
text: "Every space on both levels, with the stage, the bar and the kitchen, reserved for your guests alone. Your logo at the door, and no other guests but yours.",
```

Keep `value: "whole-venue"`.

**Spaces.** Keep `value` and `slides`. Replace `tags`, `body` and `bestFor`:

```ts
// pavilion
title: "AURA Pavilion",
tags: ["Up·nb·to·nb·25", "Air-conditioned", "KTV"],
body: ["Our principal indoor private room, tucked away from the bustle. Set it as one long table or in cabaret-style clusters, with a 75-inch screen for slides and karaoke for later in the night."],
bestFor: "Business dinners, farewells, karaoke nights",

// terrasse
title: "The Terrasse",
tags: ["Up·nb·to·nb·20", "Covered", "Semi-private"],
body: ["Long tables under a Khmer-timber pergola, just off the main dining floor. Close enough to feel the restaurant's energy, private enough to hold your own conversation."],
bestFor: "Client dinners, team gatherings",

// main-deck
title: "The Main Deck",
tags: ["60·nb·seated", "150·nb·standing", "Outdoor"],
body: ["The heart of AURA: our central dining floor, wrapped around the bar and the live band stage. It is built for bigger nights, with speeches, awards and music on one floor."],
bestFor: "Year-end parties, launches, networking",

// upper-rooftop
title: "Upper Rooftop",
tags: ["Up·nb·to·nb·25 per·nb·wing", "Covered"],
body: ["One floor up, two covered wings sit apart from the main floor. Take one for a quiet business dinner, or both for a team party. If the weather turns, they become the rain plan."],
bestFor: "Business dinners, team parties",
```

Each body is 28–37 words: 4–6 lines at 350 px. Each capacity/features line fits one line at 350 px. "Fan-cooled" was dropped from the Terrasse and Main Deck tags to keep each line to 3 tags. The Main Deck holds 60 seated and 150 standing (confirmed 2026-11-12). Its live band stage is named in the body, so it is not a tag.

**New: occasions** (`EVENTS.occasions`). The copy is the deck's section 2, lightly shortened.

```ts
occasions: {
  eyebrow: "Occasions",
  title: "Whatever the occasion",
  items: [
    { title: "Large corporate events", text: "Year-end and Christmas parties, festivals and company milestones." },
    { title: "Business & networking", text: "Client dinners, appreciation nights and industry mixers." },
    { title: "Team celebrations", text: "Welcome and farewell parties, onboarding and recruitment days." },
    { title: "Promotional events", text: "Product launches, brand activations and announcements." },
  ],
},
```

**New: included** (`EVENTS.included`). The copy is the deck's section 4, complimentary list, verbatim. Add-ons are out of scope.

```ts
included: {
  eyebrow: "Event services",
  title: "Included with every event",
  text: "AURA is set up as a flexible venue. Want to go further? Just let us know.",
  items: [
    { title: "Wi-Fi", text: "Fast connection for all guests" },
    { title: "Large-size TV screen", text: "75-inch screen, for slides & videos" },
    { title: "Event planner", text: "Yours from start to finish" },
    { title: "Sound system", text: "Speakers and a microphone" },
    { title: "Karaoke (KTV)", text: "In the AURA·nb·Pavilion" },
    { title: "Event photography", text: "Shots of the night to keep" },
    { title: "Layout customisation", text: "Your layout, plus a check-in desk" },
    { title: "Table styling", text: "Decorative dining setting" },
    { title: "Menus & name cards", text: "Personalised for each guest" },
    { title: "Logo signage", text: "Your logo at the entrance" },
    { title: "Branded lighting", text: "The venue lit in your colours" },
    { title: "Valet parking", text: "A hassle-free arrival" },
  ],
},
```

The source for all of this is `docs/events-deck-copy-scope.md` §2 and §4. Do not add claims that are not in the deck.

**Enquiry contact line** (`EVENTS.enquiry`). Add:

```ts
contact: {
  lead: "Prefer to talk it through?",
  name: "Chamroeun Pok, General Manager",
},
```

The email and phone come from `CONTACT` in `site.ts`. Do not repeat them in `events.ts`.

### 2. Types in `src/content/types.ts`

```ts
export interface EventGridItem {
  title: string;
  text: string;
}
```

`EventSpace` does not change.

### 3. New component `src/components/sections/EventGrid.tsx`

Use one component for both new sections. It is a server component, apart from the `Reveal` client wrapper it uses.

```ts
interface EventGridProps {
  eyebrow: string;
  title: string;
  text?: string;
  items: readonly EventGridItem[];
}
```

Layout:

- `<section>` with the `SpacesHeader` padding. The inner wrapper is `mx-auto max-w-6xl`.
- **Intro:** a centred block, `max-w-2xl mx-auto text-center`. It holds the `Eyebrow`, the `h2`, an optional `text` paragraph (`mt-3 text-[15px] leading-[1.47] text-cream/60`) and the rim divider, centred with `mx-auto`. The `h2` has `text-balance`.
- **Grid:** `mt-12 grid gap-x-8 gap-y-8`, left-aligned items.
  - 4 items: `sm:grid-cols-2 lg:grid-cols-4`
  - 12 items: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

  Choose the classes from `items.length`. Both counts fill every row, so no item sits alone.
- **Item:** `border-t border-cream/15 pt-5`, then:
  - the title (`font-display text-xl leading-[1.3] text-cream text-balance`)
  - the text (`mt-2 text-[15px] leading-[1.47] text-cream/60 text-pretty`)
- On mobile, 12 items in 2 columns at 390 px gives about 160 px per column. Check that the longest titles ("Layout customisation", "Large-size TV screen") wrap to 2 lines at most. If one wraps to 3, use `text-lg` on mobile only.

### 4. `EventSplit.tsx`: orphan control

- `Heading`: add `text-balance`.
- Capacity/features `Eyebrow`: add `text-balance`.
- Body `<p>` and the "Best for" `<p>`: add `text-pretty`.

### 5. `page.tsx`: new order

```tsx
<EventSplit as="h1" … intro … />
<SpacesHeader />
{spaces.items.map(…)}                       // unchanged
<EventGrid {...EVENTS.occasions} />
<EventGrid {...EVENTS.included} />
<EventSplit {...catering} flip={spaces.items.length % 2 === 0} />   // unchanged
<EventEnquiry {...EVENTS.enquiry} />
<Footer />
```

In `SpacesHeader`, add `text-balance` to the `h2`, the buyout title and the buyout capacity line.

### 6. `EventEnquiry.tsx`: contact line

Add one line under the existing `text` paragraph (line ~166), in the same size and opacity:

```
Prefer to talk it through? Chamroeun Pok, General Manager · sales@auracambodia.asia · +855 92 663 389
```

- Render the email as `mailto:` and the phone as `CONTACT.phoneHref`. Underline both with `underline-offset-4 decoration-cream/40 hover:decoration-cream`.
- Wrap each `·`-separated part in `whitespace-nowrap`, so a phone number or email never breaks mid-way.
- Add `contact` to `EventEnquiryProps`.

### 7. Meta

`EVENTS.meta.description` stays as it is.

### 8. Enquiry form cleanup (client feedback, 2026-11-12)

The client wants this ready for review at stand-up. Build it first if time is short; it does not depend on steps 1–7, apart from the contact line in step 6.

**Client feedback (verbatim, condensed)**

1. "Feels very crammed, over-complicated." Make it simpler, neat and well organised, like Zuma's form.
2. Start time only. Remove End time.
3. The date breaks onto 2 lines. Keep it on 1.
4. Type of event takes too much space. Use a dropdown, or free text like Zuma. If it stays structured, do it like CÉ LA VI.
5. The submit button must stand out more than the fields. Name it "Enquire".
6. Company name comes right after the name, not after the contact details.
7. Choose the space: add an option that asks AURA to propose one, or remove the field so the GM proposes.

**Reference: Zuma London** (`/en/london/private-dining#booking_form`, measured 2026-11-12 at a 1488 px window)

| | Zuma London |
|---|---|
| Grid | 3 columns, 416 px each, 24 px gap: 1296 px in total |
| Columns | "event details", "your details" and "message" headings (24 px), then fields |
| Rows | Each column has exactly 3 field rows. Row pitch is 109 px: 24 px label, 15 px gap, 40 px input, 30 px gap. Rows line up across all 3 columns |
| Event details | date + time side by side (193 px each), then number of guests, then type of event (**free text**). No end time, no space |
| Your details | first + last name side by side, then mobile, then email |
| Message | One textarea, 260 px tall. Its bottom lines up with the 3rd row's input in the other columns |
| Button | "ENQUIRE": filled accent colour, 132 × 44 px, square, right-aligned under the message column, with a privacy line above it |
| Fields | Underline only (0.8 px), 16 px text. Labels are 12 px in the accent colour |
| Mobile 375 px | One column, every field full width (even date and time), about 1,690 px tall |

**Reference: CÉ LA VI SG:** type of event is one centred row of 4 small circle radios (Lunch, Dinner, Cocktail Reception, Others). It uses no pills.

**AURA today** (screenshot, 2026-11-12):

- The container is `max-w-5xl`, so each column is only about 315 px wide.
- The date and time fields sit three across, and "Thu 12 Nov 2026" wraps to 2 lines.
- Type of event shows 6 pills that stack down the column. Preferred contact adds 3 more pills.
- The columns have different row counts, so nothing lines up across them.
- Mobile form height is about 1,080 px.

**Target layout:** Zuma's grid, with AURA's existing field styling.

```
Event details              Your details               Message
Date        | Start time   First name  | Last name    ┌────────────────────┐
Guests                     Company (optional)         │ textarea           │
Type of event (free text)  Phone       | Contact via ▾│ (fills the column) │
                           Email                      └────────────────────┘
                                                      [      Enquire       ]
```

Decided by the user on 2026-11-12: **no space field** (the GM proposes the space) and **type of event is free text**, like Zuma. This replaces the client's earlier wish to keep "Choose the space" (`docs/events-form-tweaks-handover.md`).

Changes in `EventEnquiry.tsx`:

- **Grid:** wrapper `max-w-5xl` → `max-w-[81rem]` (1296 px, Zuma's width). Columns: `md:grid-cols-3 gap-x-6`.
- **Row spacing:** each column becomes a `flex flex-col gap-7`. Pairs use `grid grid-cols-2 gap-4`. Event details has 3 rows and Your details has 4. The first 3 rows line up across columns, and the textarea runs down to the 4th row of Your details.
- **Column headings:** `COLUMN_HEADING` → `font-display text-xl md:text-2xl`.
- **Fields:** keep the shared `Field` + `INPUT` (underline, 11 px uppercase label) as they are. Other forms use them; do not restyle.
- **Pills:** remove `TYPE_PILL` and all pill groups.
- **(2) End time:** delete it. Remove the `end` state, `endSlots`, the end-time-clearing logic in the start `onChange`, and the `setEnd("")` call on reset. Start time stays a `<select>` built from `timeSlots`, now in `INPUT`, not `INPUT_COMPACT`.
- **(3) Date on one line:** the date sits in a 2-across pair with start time, so each field is about 190 px wide on desktop and about 165 px on mobile.
  - Delete `INPUT_COMPACT` and `INPUT_DATE`. Pass `cn(INPUT, "whitespace-nowrap")` to `DatePicker`.
  - In `DatePicker.tsx:207`, give the value `<span>` the class `truncate`, as a safety net.
  - Check that "Wed 30 Sep 2026" (the longest display) fits on one line at 360 px.
- **(4) Type of event → free text, like Zuma:**
  - Make it `<input type="text" name="type" required placeholder={typePlaceholder} className={INPUT} />`, full column width. Guests write it in their own words.
  - Delete the `type` state, the radio group, `OtherTypeField` and its reveal transition.
  - In `EVENTS.enquiry`, delete `types`, `otherOption`, `otherLabel` and `otherPlaceholder`.
  - Add `typePlaceholder: "e.g. year-end party, client dinner, birthday"`.
  - Remove the matching props from `EventEnquiryProps`.
- **(6) Company after name:** "Your details" order becomes:
  1. First | Last
  2. Company name (optional)
  3. Phone | Contact via
  4. Email
- **Preferred way of contact:** pills → a `<select name="contactMethod" required>` labelled **"Contact via"**, paired with Phone. The options are `contactMethods`. This keeps "Your details" at 4 rows.
- **(7) Space: already removed (done 2026-11-12).**
  - The "Choose the space" field, the `spaces` prop and `EVENTS.enquiry.spaces` were deleted. Guests is now a single full-width field.
  - `spaces` and `buyout` stay in `events.ts`; the space splits and `SpacesHeader` still use them.
  - The GM proposes a space in the reply. Do not add a space field back.
- **(5) Enquire button:**
  - `submit: "Enquire"`; `sending` stays "Sending…".
  - Render `SubmitButton` full width under the textarea: wrap it in `mt-6` and pass a new optional `className` prop to `SubmitButton` with `w-full h-12`.
  - It keeps the cream fill (`variant="dark"`), so it is the only filled element in the form. That fill is what makes it the most prominent element.
- **Message column:**
  - Keep the column heading. Drop the duplicate "Message" field label: use `aria-label="Message"` on the textarea, and use the `mt-*` gap to line the textarea's top up with the first inputs.
  - The textarea grows (`flex-1`) so its bottom lines up with the Email row (the 4th row of Your details).
- **Mobile (< md):**
  - The columns stack, with `gap-y-12` between groups.
  - Pairs stay 2-across: Date | Start time, First | Last, Phone | Contact via. Zuma stacks everything; we keep the pairs to save height.
  - The textarea is `rows={5}`. The button is full width.
- **Reset on submit:** `form.reset()` clears the text inputs. Also clear the `date`, `start` and `contact` state.

**Copy changes in `EVENTS.enquiry`:** `submit` → "Enquire". Add `typePlaceholder`. Remove `types`, `otherOption`, `otherLabel` and `otherPlaceholder` (`spaces` is already gone). `contactMethods` is unchanged. In the component, the "End time" label goes, and "Preferred way of contact" becomes "Contact via".

**Done when:**

- No pills are left in the form.
- No space field. Type of event is one free-text input.
- The first 3 rows line up across columns on desktop. The textarea bottom lines up with the Email row.
- The date shows on one line at 360, 390 and 1440 px.
- The only filled element is the "Enquire" button.
- Mobile form height is no taller than today's (about 1,080 px).

## Acceptance

- `npm run check` passes (lint + typecheck + build).
- Page order matches "Target page order". There is no five-steps block.
- **No orphans.** Measure at 360, 390, 430 and 1440 px. No heading, capacity/features line or paragraph may end on a single word. Two-word headings split one word per line on purpose are fine. Use the script below.
- Space bodies stay in 28–45 words. Every capacity/features line is one line at 390 px and 1440 px.
- Grids: 4 items show as 1/2/4 columns and 12 items as 2/3/4 columns, with no lone item in the last row.
- Reduced motion: grid items appear without animation.

### Orphan check script

Run in the browser console on `http://localhost:3000/events`. It opens the page in a same-origin iframe at each width, measures every block and lists the orphans.

```js
const check = async (w) => {
  const f = Object.assign(document.createElement("iframe"), { src: location.href });
  f.style.cssText = `position:fixed;inset:0 auto auto 0;width:${w}px;height:900px;z-index:99999;background:#000`;
  document.body.append(f);
  await new Promise((r) => (f.onload = r));
  await new Promise((r) => setTimeout(r, 4000));
  const d = f.contentDocument, out = [];
  for (const e of d.querySelectorAll("h1,h2,h3,p,li")) {
    if (e.closest("nav,footer,form") || e.querySelector("p,h1,h2,h3,li") || !e.offsetWidth) continue;
    const tops = [], walker = d.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode()))
      for (const m of n.data.matchAll(/\S+/g)) {
        const r = d.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        const rect = r.getClientRects()[0]; if (rect?.width) tops.push(Math.round(rect.top));
      }
    const lines = [...new Set(tops.map((t) => Math.round(t / 4)))];
    const last = Math.max(...tops);
    if (lines.length > 1 && tops.filter((t) => Math.abs(t - last) < 4).length === 1 && tops.length > 2)
      out.push(`${e.tagName} ${e.innerText.slice(0, 40)}`);
  }
  f.remove();
  return `${w}px: ${out.length ? out.join(" | ") : "no orphans"}`;
};
for (const w of [360, 390, 430, 1440]) console.log(await check(w));
```

If an orphan remains after the CSS changes, fix it in the copy. Add or cut one word in the last sentence, or bind the last two words with `\u00A0`. Do not hard-code `<br>`.

## Open items for the client

- Client sign-off on the rewritten intro and space copy. All facts come from the deck, but the wording is new.
