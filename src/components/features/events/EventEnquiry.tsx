"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ENQUIRE_ID } from "@/components/features/events/EventActions";
import { DatePicker, type DatePickerHandle } from "@/components/features/forms/DatePicker";
import { Field, INPUT, Notice, SubmitButton, fakeSubmit } from "@/components/features/forms/Field";
import { Eyebrow } from "@/components/ui/Buttons";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

interface TimeSlots {
  from: string;
  to: string;
  stepMinutes: number;
}

interface EventEnquiryProps {
  eyebrow: string;
  title: string;
  text: string;
  types: readonly string[];
  otherOption: string;
  otherLabel: string;
  otherPlaceholder: string;
  contactMethods: readonly string[];
  spaces: readonly { value: string; label: string }[];
  defaultGuests: number;
  timeSlots: TimeSlots;
  message: string;
  submit: string;
  sending: string;
  done: string;
}

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const buildTimeSlots = ({ from, to, stepMinutes }: TimeSlots) => {
  const slots: { value: string; label: string; minutes: number }[] = [];
  for (let minutes = toMinutes(from); minutes <= toMinutes(to); minutes += stepMinutes) {
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    const period = h < 12 ? "AM" : "PM";
    const hour12 = ((h + 11) % 12) + 1;
    slots.push({
      value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      label: `${hour12}:${String(m).padStart(2, "0")} ${period}`,
      minutes,
    });
  }
  return slots;
};

// Reveal with a height/opacity transition; skipped entirely under reduced motion.
function OtherTypeField({ label, placeholder }: { label: string; placeholder: string }) {
  const reducedMotion = prefersReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [reducedMotion]);
  return (
    <div
      className={cn(
        "overflow-hidden",
        !reducedMotion && "transition-[opacity,max-height] duration-500 ease-out-expo",
        visible ? "mt-3 max-h-24 opacity-100" : "mt-0 max-h-0 opacity-0",
      )}
    >
      <Field label={label}>
        <input type="text" name="typeOther" required placeholder={placeholder} className={INPUT} />
      </Field>
    </div>
  );
}

// The visitor's date; the server snapshot is empty so the static HTML never bakes in the build date.
const noop = () => () => {};
const todaySnapshot = () => isoDate(new Date());

const TYPE_PILL =
  "inline-flex h-9 sm:h-11 cursor-pointer items-center rounded-full border border-cream/30 px-4 sm:px-5 text-[12px] sm:text-[13px] font-medium tracking-wide transition-colors duration-500 ease-out-expo hover:border-cream has-checked:border-cream has-checked:bg-cream has-checked:text-jungle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-bloom";

// Smaller at mobile widths so date/start/end sit three-across without crowding.
const INPUT_COMPACT = INPUT.replace("text-[15px]", "text-[13px] sm:text-[15px]");

// globals.css hides the native calendar-picker indicator site-wide (it only shows as an
// invisible click-target); draw our own icon on the right, like the time fields' native clock.
// Text shrinks further than the other compact fields: "11/11/2026" is wider than "--:-- --".
const INPUT_DATE = cn(INPUT_COMPACT.replace("text-[13px] sm:text-[15px]", "text-[11px] sm:text-[14px]"), "pr-4");

// Column label, matching Zuma's bold section headers ("event details" / "your details" / "message").
const COLUMN_HEADING = "font-display text-lg sm:text-xl";

/**
 * Event enquiry form on the Events page, directly on the page's jungle
 * ground (no card), the way Zuma's "Plan your event" form sits on its own
 * dark page. Structured in three columns — event details, your details,
 * message — so the whole form reads in one glance on desktop and stacks
 * compactly on mobile.
 */
export function EventEnquiry({
  eyebrow,
  title,
  text,
  types,
  otherOption,
  otherLabel,
  otherPlaceholder,
  contactMethods,
  spaces,
  defaultGuests,
  timeSlots,
  message,
  submit,
  sending,
  done,
}: EventEnquiryProps) {
  const today = useSyncExternalStore(noop, todaySnapshot, () => "");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const dateFieldRef = useRef<DatePickerHandle>(null);

  const slots = buildTimeSlots(timeSlots);
  const startMinutes = slots.find((slot) => slot.value === start)?.minutes;
  const endSlots = startMinutes === undefined ? slots : slots.filter((slot) => slot.minutes > startMinutes);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date && !today) {
      dateFieldRef.current?.focus();
      return;
    }
    const form = event.currentTarget;
    setSent(false);
    setLoading(true);
    fakeSubmit(() => {
      setLoading(false);
      setSent(true);
      form.reset();
      setDate("");
      setStart("");
      setEnd("");
      setType("");
      setContact("");
    });
  };

  return (
    <section id={ENQUIRE_ID} className="scroll-mt-20 px-5 py-8 text-cream sm:py-10 md:px-6 md:py-12">
      <div className="relative mx-auto max-w-5xl">
        <div className="relative">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-1 font-display text-2xl leading-[1.1] sm:mt-2 sm:text-3xl md:text-4xl">{title}</h2>
          <p className="mt-1 text-[14px] opacity-70 sm:mt-2 sm:text-[15px]">{text}</p>
          <div className="mt-3 border-t border-cream/15 sm:mt-5" />

          {sent && (
            <div className="mt-3 sm:mt-4">
              <Notice>{done}</Notice>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-x-10 gap-y-6 sm:mt-6 md:grid-cols-3">
            <div className="space-y-3 sm:space-y-4">
              <h3 className={COLUMN_HEADING}>Event details</h3>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <Field label="Date">
                  <DatePicker
                    ref={dateFieldRef}
                    name="date"
                    value={date || today}
                    today={today}
                    onChange={setDate}
                    variant="dark"
                    className={INPUT_DATE}
                  />
                </Field>
                <Field label="Start time">
                  <select
                    name="start"
                    required
                    value={start}
                    onChange={(event) => {
                      const value = event.target.value;
                      setStart(value);
                      const newStartMinutes = slots.find((slot) => slot.value === value)?.minutes ?? -1;
                      const currentEndMinutes = slots.find((slot) => slot.value === end)?.minutes;
                      if (currentEndMinutes !== undefined && currentEndMinutes <= newStartMinutes) setEnd("");
                    }}
                    className={INPUT_COMPACT}
                  >
                    <option value="" disabled className="bg-jungle">
                      Select
                    </option>
                    {slots.map((slot) => (
                      <option key={slot.value} value={slot.value} className="bg-jungle">
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="End time">
                  <select name="end" required value={end} onChange={(event) => setEnd(event.target.value)} className={INPUT_COMPACT}>
                    <option value="" disabled className="bg-jungle">
                      Select
                    </option>
                    {endSlots.map((slot) => (
                      <option key={slot.value} value={slot.value} className="bg-jungle">
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <Field label="Guests">
                  <input type="number" name="guests" min={1} required defaultValue={defaultGuests} className={INPUT} />
                </Field>
                <Field label="Choose the space">
                  <select name="space" required defaultValue="" className={INPUT}>
                    <option value="" disabled className="bg-jungle">
                      Select
                    </option>
                    {spaces.map((space) => (
                      <option key={space.value} value={space.value} className="bg-jungle">
                        {space.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <fieldset>
                <legend className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">Type of event</legend>
                <div className="mt-2 flex flex-wrap gap-2 sm:mt-3 sm:gap-2.5">
                  {types.map((eventType) => (
                    <label key={eventType} className={TYPE_PILL}>
                      <input
                        type="radio"
                        name="type"
                        value={eventType}
                        required
                        checked={type === eventType}
                        onChange={() => setType(eventType)}
                        className="sr-only"
                      />
                      {eventType}
                    </label>
                  ))}
                </div>
                {type === otherOption && <OtherTypeField label={otherLabel} placeholder={otherPlaceholder} />}
              </fieldset>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className={COLUMN_HEADING}>Your details</h3>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <Field label="First name">
                  <input type="text" name="firstName" autoComplete="given-name" required placeholder="First name" className={INPUT} />
                </Field>
                <Field label="Last name">
                  <input type="text" name="lastName" autoComplete="family-name" required placeholder="Last name" className={INPUT} />
                </Field>
              </div>

              <Field label="Phone number">
                <input type="tel" name="phone" autoComplete="tel" required placeholder="+855" className={INPUT} />
              </Field>
              <Field label="Email address">
                <input type="email" name="email" autoComplete="email" required placeholder="Your email" className={INPUT} />
              </Field>
              <Field label="Company name (optional)">
                <input type="text" name="company" autoComplete="organization" placeholder="Company name" className={INPUT} />
              </Field>

              <fieldset>
                <legend className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">Preferred way of contact</legend>
                <div className="mt-2 flex flex-wrap gap-2 sm:mt-3 sm:gap-2.5">
                  {contactMethods.map((method) => (
                    <label key={method} className={TYPE_PILL}>
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        required
                        checked={contact === method}
                        onChange={() => setContact(method)}
                        className="sr-only"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="flex flex-col">
              <h3 className={COLUMN_HEADING}>Message</h3>
              <Field label="Message" className="mt-3 flex flex-1 flex-col sm:mt-4 [&>textarea]:flex-1">
                <textarea
                  name="message"
                  rows={4}
                  placeholder={message}
                  className={cn(INPUT, "mt-1 resize-none placeholder:text-[13px] placeholder:text-current/30 placeholder:leading-[1.5] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent]")}
                />
              </Field>
              <div className="mt-3 flex justify-end sm:mt-4">
                <SubmitButton loading={loading} idle={submit} busy={sending} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
