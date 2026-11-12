"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ENQUIRE_ID } from "@/components/features/events/EventActions";
import { DatePicker, type DatePickerHandle } from "@/components/features/forms/DatePicker";
import { Field, INPUT, Notice, SubmitButton, fakeSubmit } from "@/components/features/forms/Field";
import { Eyebrow } from "@/components/ui/Buttons";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";
import { RevealText } from "@/components/ui/Reveal";
import { CONTACT } from "@/content/site";
import { cn } from "@/lib/cn";

interface TimeSlots {
  from: string;
  to: string;
  stepMinutes: number;
}

interface EventEnquiryProps {
  eyebrow: string;
  title: string;
  contact: { lead: string; name: string };
  typePlaceholder: string;
  contactMethods: readonly string[];
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
  const slots: { value: string; label: string }[] = [];
  for (let minutes = toMinutes(from); minutes <= toMinutes(to); minutes += stepMinutes) {
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    const period = h < 12 ? "AM" : "PM";
    const hour12 = ((h + 11) % 12) + 1;
    slots.push({
      value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      label: `${hour12}:${String(m).padStart(2, "0")} ${period}`,
    });
  }
  return slots;
};

// The visitor's date; the server snapshot is empty so the static HTML never bakes in the build date.
const noop = () => () => {};
const todaySnapshot = () => isoDate(new Date());

/**
 * Closing band on the Events page — replaces the Footer, taking its glaze
 * tone and label/divider patterns (no leaf motifs). Sized to one viewport on
 * desktop; mobile gets the same treatment but may scroll if it can't fit.
 * Three columns — event details, your details, message — with rows that
 * line up across columns on desktop (see docs/events-copy-structure-handover.md §8).
 */
export function EventEnquiry({
  eyebrow,
  title,
  contact,
  typePlaceholder,
  contactMethods,
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
  const [contactMethod, setContactMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const dateFieldRef = useRef<DatePickerHandle>(null);

  const slots = buildTimeSlots(timeSlots);

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
      setContactMethod("");
    });
  };

  return (
    <section
      id={ENQUIRE_ID}
      className="relative flex min-h-dvh scroll-mt-20 flex-col justify-center overflow-hidden bg-glaze px-5 py-10 text-ink sm:py-12 md:px-6 md:py-14"
    >
      <LeafTone clear="radial-gradient(ellipse 60% 65% at 50% 48%, transparent 38%, #000 94%)" />
      <PlateLeaf
        sizes="42vmin"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 opacity-45 mix-blend-multiply"
      />
      <div className="relative mx-auto w-full max-w-[81rem]">
        <div className="relative">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <RevealText text={title} className="mt-2 font-display text-4xl leading-[1.1] md:text-5xl" />
          </div>
          <div className="mt-6 border-t border-ink/15 sm:mt-8" />

          {sent && (
            <div className="mt-4 flex justify-center">
              <Notice variant="light">{done}</Notice>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-y-8 sm:mt-8 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
            <div className="flex flex-col gap-5">
              <Eyebrow>Event details</Eyebrow>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date">
                  <DatePicker
                    ref={dateFieldRef}
                    name="date"
                    value={date || today}
                    today={today}
                    onChange={setDate}
                    className={cn(INPUT, "whitespace-nowrap")}
                  />
                </Field>
                <Field label="Start time">
                  <select name="start" required value={start} onChange={(event) => setStart(event.target.value)} className={INPUT}>
                    <option value="" disabled className="bg-glaze">
                      Select
                    </option>
                    {slots.map((slot) => (
                      <option key={slot.value} value={slot.value} className="bg-glaze">
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Guests">
                <input type="number" name="guests" min={1} required defaultValue={defaultGuests} className={INPUT} />
              </Field>

              <Field label="Type of event">
                <input type="text" name="type" required placeholder={typePlaceholder} className={INPUT} />
              </Field>
            </div>

            <div className="flex flex-col gap-5">
              <Eyebrow>Your details</Eyebrow>

              <div className="grid grid-cols-2 gap-4">
                <Field label="First name">
                  <input type="text" name="firstName" autoComplete="given-name" required placeholder="First name" className={INPUT} />
                </Field>
                <Field label="Last name">
                  <input type="text" name="lastName" autoComplete="family-name" required placeholder="Last name" className={INPUT} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone number">
                  <input type="tel" name="phone" autoComplete="tel" required placeholder="+855" className={INPUT} />
                </Field>
                <Field label="Email address">
                  <input type="email" name="email" autoComplete="email" required placeholder="Your email" className={INPUT} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Company (optional)">
                  <input type="text" name="company" autoComplete="organization" placeholder="Company name" className={INPUT} />
                </Field>
                <Field label="Contact via">
                  <select
                    name="contactMethod"
                    required
                    value={contactMethod}
                    onChange={(event) => setContactMethod(event.target.value)}
                    className={INPUT}
                  >
                    <option value="" disabled className="bg-glaze">
                      Select
                    </option>
                    {contactMethods.map((method) => (
                      <option key={method} value={method} className="bg-glaze">
                        {method}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Eyebrow>Message</Eyebrow>
              <textarea
                name="message"
                aria-label="Message"
                rows={4}
                placeholder={message}
                className="flex-1 resize-none rounded-md border border-ink/15 bg-ink/5 px-4 py-3 text-[15px] transition-colors placeholder:text-[13px] placeholder:text-current/40 placeholder:leading-[1.5] focus:border-ink/40 focus:outline-none [scrollbar-width:thin] [scrollbar-color:rgba(16,35,30,0.3)_transparent]"
              />
              <div className="mt-2">
                <SubmitButton loading={loading} idle={submit} busy={sending} variant="light" className="w-full" />
              </div>
            </div>
          </form>

          <p className="mt-6 text-center text-[13px] opacity-60 sm:mt-8">
            {contact.lead} <span className="whitespace-nowrap">{contact.name}</span>{" "}
            <span className="whitespace-nowrap">
              ·{" "}
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
                {CONTACT.email}
              </a>
            </span>{" "}
            <span className="whitespace-nowrap">
              ·{" "}
              <a href={CONTACT.phoneHref} className="underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
                {CONTACT.phone}
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
