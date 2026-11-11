# Events enquiry form tweaks: implementation handover

Status on 2026-11-11: reviewed with the client, approved, not built. Build it in the next session as one task.

Read first: `AGENTS.md`, this file. The form lives in `src/components/features/events/EventEnquiry.tsx`, its copy and options in `src/content/events.ts` (`EVENTS.enquiry`), shared form primitives in `src/components/features/forms/Field.tsx`.

## Where this comes from

Client feedback on the Events page form (verbatim, condensed):

1. "Type of event" should be about the nature of the event (corporate, team celebration…), not lunch vs dinner. "Other" needs a text description. Lunch/dinner is inferred from the time.
2. In-line message in the comment box: font a bit more subtle.
3. Date selection should have a date picker, not just text input.
4. Start time in 15-minute increments, not 1-minute.
5. "Our team will reply by email" → "We'll get back to you very soon."
6. Add "Preferred way of contact": WhatsApp, Telegram, Email.

Client confirmed on 2026-11-11: all six, keep the End time field, custom calendar (not native), category list as written below.

## What the references do (scouted 2026-11-11)

| | Zuma Dubai (`/en/dubai/private-dining`) | Amazónico Dubai (`/dubai/amazonico-private-dining/`) |
|---|---|---|
| Date | Text field + JS calendar popover, `dd/mm/yyyy` | CoverManager widget: month calendar grid |
| Time | `<select>`, 30-min steps, 11:00 AM–10:00 PM, 12-hour labels | `<select>`, 15-min steps, 12:00–00:15, 24-hour labels |
| End time | none | none |
| Event type | free text | none (Lunch/Dinner select only) |
| Space | none | none |
| Contact preference | none | none |
| Sections | "event details" / "your details" / "message" (we already copy this) | n/a |

Takeaway: both use a calendar popover for the date and a dropdown of fixed slots for the time. Neither has event categories, so the list below is ours. We keep our extras (End time, Choose the space) because the client wants them.

## Why the current date field reads as "just text"

`EventEnquiry.tsx:105` is already `<input type="date">`. But `INPUT` styles it as a bare underline with no calendar icon, and browsers differ (Safari desktop and Firefox show it close to a plain text field). The client saw a text field. Fix: own calendar popover, same on every browser, styled to the card.

## Build

### 1. Type of event → nature of event

`src/content/events.ts`, `enquiry.types` becomes:

```ts
types: [
  "Corporate event",
  "Team celebration",
  "Birthday",
  "Wedding & engagement",
  "Family gathering",
  "Product launch / brand activation",
  "Cocktail reception",
  "Other",
],
otherLabel: "Tell us more",
otherPlaceholder: "What kind of event is it?",
```

Remove `"Lunch"` and `"Dinner"`. Lunch vs dinner is inferred from the start time; do not add a service field.

In `EventEnquiry.tsx`:

- Keep the pill radios (`TYPE_PILL`), single-select, `name="type"`, `required`.
- When `Other` is checked, reveal a text `<Field label={otherLabel}>` directly under the pills: `<input type="text" name="typeOther" required placeholder={otherPlaceholder} className={INPUT_LIGHT} />`. Unmount it (not just hide) when another pill is picked so `required` does not block submit.
- Track the chosen type in state so the reveal is React-driven. Reset it on successful submit together with `date`.
- Reveal with a short height/opacity transition using `ease-out-expo`; no transition when `prefersReducedMotion()` (`src/lib/scroll.ts`) is true.

### 2. Message placeholder, more subtle

`EventEnquiry.tsx`, the `<textarea>`: add `placeholder:text-[13px] placeholder:text-current/30 placeholder:leading-[1.5]` (the base `INPUT` placeholder is `15px` at `/40`). The entered text stays `15px`. Placeholder copy (`enquiry.message`) does not change.

### 3. Date → custom calendar popover

New component `src/components/features/forms/DatePicker.tsx`, no library.

Behaviour:

- A button styled with `INPUT_LIGHT_COMPACT` shows the chosen date as `Tue 25 Nov 2026` (or the placeholder `Select date` at `/40` opacity) with `CalendarIcon` (`src/components/ui/Icons.tsx`) on the right.
- Click opens a popover under the button: month name + year, previous/next month chevrons (`ChevronIcon`), Mo–Su header, 6-row day grid. Days before today are disabled. Today has a thin `ring-1 ring-ink/40`; the selected day is `bg-ink text-glaze` (same as a checked pill).
- Picking a day closes the popover. Outside click and `Escape` close it. Arrow keys move the focused day; `Enter`/`Space` pick it; `Home`/`End` go to week start/end. Use `role="dialog"` on the popover, `role="grid"` on the table, `aria-selected` on the chosen cell, `aria-label` with the full date on each cell.
- A hidden `<input type="hidden" name="date" value={iso} required>` carries the value (ISO `YYYY-MM-DD`) so the form's native validation still fires; validate on submit and focus the button if empty.
- Default value: today (the current form already does this via `useSyncExternalStore`; keep that so the static HTML never bakes in the build date).
- Popover: `bg-glaze text-ink ring-1 ring-ink/10 rounded-2xl shadow`, `z-20`, width about `280px`, opens upward if there is no room below (check `getBoundingClientRect` on open). On phones (< `sm`) it may be centred under the field; it must not overflow the card horizontally.
- Open/close transition: opacity + `translate-y-1`, `duration-300 ease-out-expo`; none under reduced motion.
- Client component. Only mount the popover when open.

Use the same component in both reservation forms later (`src/components/features/reservation/BookingForm.tsx:107`, `src/components/reservation/BookingForm.tsx:108`). Not in this task.

### 4. Start / End time → 15-minute dropdowns

Replace both `type="time"` inputs with `<select>`s styled `INPUT_LIGHT_COMPACT`, options `className="bg-glaze"` like the space select.

- Slots: `11:00 AM` to `11:00 PM` in 15-min steps (49 options), value `HH:mm` 24-hour, label 12-hour (`11:00 AM`, `12:15 PM`, `7:30 PM`). Generate the list once in the component (or in `src/lib/utils.ts` if a helper exists there); do not hand-write 49 options.
- Both start with a disabled placeholder option `Select`, `required`.
- End time lists only slots after the chosen start. If the chosen end becomes invalid after the start changes, reset end to `""`.
- No seconds anywhere. No `type="time"` left in this file.

Put the slot range in content so it is editable: `enquiry.timeSlots: { from: "11:00", to: "23:00", stepMinutes: 15 }` in `events.ts`.

### 5. Copy

`src/content/events.ts`:

```ts
text: "For event enquiries, please fill in the form below. We'll get back to you very soon.",
done: "Thank you — your enquiry has been received. We'll get back to you very soon.",
```

Do not touch the reservation copy in `reservation.ts`.

### 6. Preferred way of contact

`events.ts`:

```ts
contactMethods: ["WhatsApp", "Telegram", "Email"],
contactLabel: "Preferred way of contact",
```

`EventEnquiry.tsx`, "Your details" column: a `<fieldset>` with `<legend>` styled like the "Type of event" legend, placed after `Phone number` and before `Email address`. Pill radios (`TYPE_PILL`), `name="contact"`, `required`, single-select. Phone and email both stay required.

### Layout

- Column one grows (eight pills plus optional text). Keep `gap-y-7` and the three-column grid; check the columns still align at the top on desktop and that nothing wraps badly at 390px and 1280px.
- Pills: eight should wrap to two or three rows at desktop column width. If "Product launch / brand activation" forces an ugly orphan, shorten the pill label to "Product launch" and keep the long form only in the submitted value.

### Files

| File | Change |
|---|---|
| `src/content/events.ts` | New `types`, `otherLabel`, `otherPlaceholder`, `timeSlots`, `contactMethods`, `contactLabel`; copy in `text` and `done`. |
| `src/components/features/forms/DatePicker.tsx` | New custom calendar popover. |
| `src/components/features/events/EventEnquiry.tsx` | Wire `DatePicker`, time selects, Other reveal, contact pills, placeholder classes; new props. |
| `src/components/features/forms/Field.tsx` | Only if a shared select style is needed; otherwise untouched. |

### Rules that still apply

- No copy or options hard-coded in components; everything above goes through `EVENTS.enquiry`.
- Tokens only (`bg-glaze`, `text-ink`, `ring-ink/10`, `ease-out-expo`); no raw hex.
- `fakeSubmit` stays; no backend.
- `prefers-reduced-motion` disables the calendar and reveal transitions.
- `npm run check` must pass.

## Done when

- Date opens a styled calendar on Chrome, Safari and Firefox desktop and on iOS/Android; keyboard-only use works.
- Start and End show 15-minute slots; End cannot be earlier than Start.
- Picking "Other" shows a required text field; picking another pill removes it.
- Contact pills render under Phone; form will not submit without one.
- Both copy strings read "We'll get back to you very soon."
- Message placeholder is visibly lighter and smaller than typed text.
- Screenshots at 390px and 1280px attached to the handover reply.
