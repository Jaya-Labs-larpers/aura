# Events form feedback handover (client comment 18)

Scope: the enquiry band at the bottom of the Events page.
Files: `src/components/features/events/EventEnquiry.tsx`, `src/content/events.ts` (`EVENTS.enquiry`, ~line 149), `src/components/features/forms/Field.tsx`, `src/components/features/forms/DatePicker.tsx`, `src/components/ui/Icons.tsx`.

Rules that apply (from AGENTS.md): copy lives in `src/content/`, components never hard-code it; use design tokens; frontend only (no backend, no API, no email sending).

## Decisions (signed off by user)

- Title brand casing: **AURA** (capitals).
- Country code picker: **full world list** (~240 entries).
- Call line: **keep the email** after the phone.
- Submission: **frontend only**. It must look and feel like a real send, but no request and no email. Keep `fakeSubmit`.

## Changes

1. **Title**: `"Plan your event"` → `"Plan your event at AURA"` (`events.ts` `enquiry.title`).

2. **Column titles bold + more space under**: the three `<Eyebrow>` headings in `EventEnquiry.tsx` ("Event details", "Your details", "Message"). Add `font-semibold` (Eyebrow defaults to `font-medium`; pass via `className`). Increase the gap under the heading by ~8px (columns use `gap-5`; e.g. add `mb-2` to the eyebrow). Move the three heading strings into `events.ts` while there.

3. **Guests label**: `"Guests"` → `"Group Size (# of Guests)"`. Move the label into `events.ts`.

4. **Date / Start time underlines not aligned**: likely cause. `Field` is a `<label class="block">` with an inline `<span>` label, then the control. `DatePicker` renders a block `<div>` (button inside), while the start-time `<select>` is inline-block, so it sits on a line box and gets baseline/descender space. That shifts its underline. Fix in `Field.tsx`: make the label `flex flex-col` (or the span `block`). Also give both controls the same explicit height if the native select still differs from the button. **Verify in the browser** that the date and start-time underlines line up. Check the same thing on the other rows (name, phone/email, company/contact) and on the reservation form, which also uses `Field`.

5. **Phone country picker**:
   - Add `src/content/countries.ts`: full list of `{ name, iso2, dial }` (e.g. `{ name: "Cambodia", iso2: "KH", dial: "+855" }`), sorted by name.
   - Before the phone input, in the same underline row, add a compact dial-code control. Default **Cambodia +855**.
   - Recommended pattern: a native `<select>` (accessible, works well on mobile, type-to-jump by country name), visually hidden over a visible span that shows only `+855` plus a chevron. Options read `Cambodia (+855)`.
   - Do not use flag emoji: Windows renders them as letters.
   - Submit the code as its own field (`phoneCountry`) or prefix it onto `phone`. Change the phone placeholder from `+855` to something like `12 345 678`.
   - No new npm dependency.

6. **Contact via label**: → `"Where should we contact you"`. Move it into `events.ts`. It's long for a half-width column: check that it wraps cleanly or fits at desktop widths. If it wraps, the label rows in that grid row must still align. A shorter style tweak is fine, but keep the wording.

7. **Message box alignment**: the textarea's bottom edge must line up with the bottom underline of the "Contact via" row in column 2. The button goes **below** that line, not inside the column's height.
   - Take `SubmitButton` out of the third column. Put it in a new grid row under the three columns, placed under column 3 on desktop (`md:col-start-3`), full width of that column. On mobile it stays after the textarea.
   - The textarea keeps `flex-1`, so it stretches to the height of column 2.

8. **Submit + confirmation**:
   - Button text `"Enquire"` → `"Send Enquiry"` (`enquiry.submit`).
   - Best-practice success state: replace the form **in place** with a confirmation panel, not a small notice above the form.
     - Check icon (add `CheckIcon` to `Icons.tsx` in the same stroke style as the others).
     - Heading, e.g. "Enquiry sent".
     - Short summary of what they sent: date, start time, group size, type of event.
     - What happens next, using the channel they chose: "We'll contact you via {WhatsApp/Telegram/Email} to plan the details." **Don't promise a reply time** (e.g. "within 24h") unless the client confirms one.
     - A "Send another enquiry" text button that brings back an empty form.
   - Accessibility: the panel gets `role="status"` or `aria-live="polite"`. Move focus to the panel heading (`tabIndex={-1}` + `focus()`). Respect `prefers-reduced-motion` for any fade-in (use the existing `<Reveal>` if it fits).
   - Keep the section height stable when the panel swaps in, so the page doesn't jump.
   - All new strings go in `events.ts` (`enquiry.done` becomes an object: heading, next-step template, summary labels, "send another").
   - **No email.** Frontend only. Show it as if sent.

9. **Call line**: `"Or speak to" + "Chamroeun Pok, General Manager"` → `"Or call us directly via {phone} · {email}"`. Remove the GM name from `enquiry.contact` (keep the GM mention elsewhere on the page untouched). The phone and email come from `CONTACT` in `src/content/site.ts`. The phone stays a `tel:` link and the email a `mailto:` link.

## Done when

- All 9 items above are visible on `/events` at desktop (3 columns) and mobile.
- The underlines of Date/Start time line up. The textarea bottom lines up with the Contact via underline. The button sits below both.
- The confirmation panel appears after Send Enquiry and summarises the entries. "Send another enquiry" resets the form.
- `npm run check` passes.
