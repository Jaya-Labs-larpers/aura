"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ENQUIRE_ID } from "@/components/features/events/EventActions";
import { CountryPicker } from "@/components/features/forms/CountryPicker";
import { DatePicker, type DatePickerHandle } from "@/components/features/forms/DatePicker";
import { Field, INPUT, SubmitButton, fakeSubmit } from "@/components/features/forms/Field";
import { Eyebrow } from "@/components/ui/Buttons";
import { CheckIcon } from "@/components/ui/Icons";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";
import { RevealText } from "@/components/ui/Reveal";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/content/countries";
import { CONTACT } from "@/content/site";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

interface TimeSlots {
  from: string;
  to: string;
  stepMinutes: number;
}

interface EnquiryDone {
  heading: string;
  nextStep: string;
  summaryLabels: { date: string; time: string; guests: string; type: string };
  again: string;
}

interface EventEnquiryProps {
  eyebrow: string;
  title: string;
  columns: { details: string; yours: string; message: string };
  guestsLabel: string;
  contactViaLabel: string;
  contactLead: string;
  typePlaceholder: string;
  contactMethods: readonly string[];
  defaultGuests: number;
  timeSlots: TimeSlots;
  message: string;
  submit: string;
  sending: string;
  done: EnquiryDone;
}

interface EnquirySummary {
  date: string;
  time: string;
  guests: string;
  type: string;
  contactMethod: string;
}

/**
 * Every control in this form at one fixed height. A native <select> lays out
 * ~2px shorter than a text input with the same padding, which is enough to
 * throw the Date / Start time underlines out of line; a fixed height removes
 * the difference. (`INPUT` itself stays height-less because textareas share it.)
 */
const CONTROL = cn(INPUT, "h-12");

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

const displayDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
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
  columns,
  guestsLabel,
  contactViaLabel,
  contactLead,
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
  const [countryIso2, setCountryIso2] = useState(DEFAULT_COUNTRY.iso2);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<EnquirySummary | null>(null);
  const dateFieldRef = useRef<DatePickerHandle>(null);

  const slots = buildTimeSlots(timeSlots);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date && !today) {
      dateFieldRef.current?.focus();
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "");
    const next: EnquirySummary = {
      date: displayDate(date || today),
      time: slots.find((slot) => slot.value === start)?.label ?? start,
      guests: read("guests"),
      type: read("type"),
      contactMethod,
    };
    setLoading(true);
    fakeSubmit(() => {
      setLoading(false);
      setSummary(next);
      form.reset();
      setDate("");
      setStart("");
      setContactMethod("");
      setCountryIso2(DEFAULT_COUNTRY.iso2);
    });
  };

  return (
    <section
      id={ENQUIRE_ID}
      className="relative flex min-h-dvh scroll-mt-20 flex-col justify-center overflow-hidden bg-glaze px-5 py-10 text-ink sm:py-12 md:px-6 md:py-14"
    >
      <LeafTone clear="radial-gradient(ellipse 60% 65% at 50% 48%, transparent 38%, #000 94%)" />
      <div className="relative mx-auto w-full max-w-[81rem]">
        <div className="relative">
          {/* Clear band above the title and divider — the only space with no text or form fields to overlap. */}
          <PlateLeaf
            sizes="(min-width: 768px) 14vw, 90px"
            className="pointer-events-none absolute -top-6 right-0 h-auto w-20 rotate-[8deg] opacity-40 mix-blend-multiply sm:-top-8 sm:w-28 md:-top-10 md:w-36"
          />
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <RevealText text={title} className="mt-2 font-display text-4xl leading-[1.1] md:text-5xl" />
          </div>
          <div className="mt-6 border-t border-ink/15 sm:mt-8" />

          {summary ? (
            <EnquiryConfirmation summary={summary} done={done} onReset={() => setSummary(null)} />
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-y-8 sm:mt-8 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
              <div className="flex flex-col gap-5">
                <Eyebrow className="mb-2 font-semibold">{columns.details}</Eyebrow>

                <div className="grid grid-cols-2 items-end gap-4">
                  <Field label="Date">
                    <DatePicker
                      ref={dateFieldRef}
                      name="date"
                      value={date || today}
                      today={today}
                      onChange={setDate}
                      className={cn(CONTROL, "whitespace-nowrap")}
                    />
                  </Field>
                  <Field label="Start time">
                    <select name="start" required value={start} onChange={(event) => setStart(event.target.value)} className={CONTROL}>
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

                <Field label={guestsLabel}>
                  <input type="number" name="guests" min={1} required defaultValue={defaultGuests} className={CONTROL} />
                </Field>

                <Field label="Type of event">
                  <input type="text" name="type" required placeholder={typePlaceholder} className={CONTROL} />
                </Field>
              </div>

              <div className="flex flex-col gap-5">
                <Eyebrow className="mb-2 font-semibold">{columns.yours}</Eyebrow>

                <div className="grid grid-cols-2 items-end gap-4">
                  <Field label="First name">
                    <input type="text" name="firstName" autoComplete="given-name" required placeholder="First name" className={CONTROL} />
                  </Field>
                  <Field label="Last name">
                    <input type="text" name="lastName" autoComplete="family-name" required placeholder="Last name" className={CONTROL} />
                  </Field>
                </div>

                <div className="grid grid-cols-2 items-end gap-4">
                  <Field label="Phone number">
                    <div className="flex items-stretch border-b border-current/25 transition-colors focus-within:border-current">
                      <CountryPicker name="phoneCountry" countries={COUNTRIES} value={countryIso2} onChange={setCountryIso2} />
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        required
                        placeholder="12 345 678"
                        className="h-12 w-full min-w-0 border-0 bg-transparent px-0 py-3 text-[15px] placeholder:text-current/40 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </Field>
                  <Field label="Email address">
                    <input type="email" name="email" autoComplete="email" required placeholder="Your email" className={CONTROL} />
                  </Field>
                </div>

                <div className="grid grid-cols-2 items-end gap-4">
                  <Field label="Company (optional)">
                    <input type="text" name="company" autoComplete="organization" placeholder="Company name" className={CONTROL} />
                  </Field>
                  <Field label={contactViaLabel}>
                    <select
                      name="contactMethod"
                      required
                      value={contactMethod}
                      onChange={(event) => setContactMethod(event.target.value)}
                      className={CONTROL}
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
                <Eyebrow className="mb-2 font-semibold">{columns.message}</Eyebrow>
                <textarea
                  name="message"
                  aria-label="Message"
                  rows={4}
                  placeholder={message}
                  className="flex-1 resize-none rounded-md border border-ink/15 bg-ink/5 px-4 py-3 text-[15px] transition-colors placeholder:text-[13px] placeholder:text-current/40 placeholder:leading-[1.5] focus:border-ink/40 focus:outline-none [scrollbar-width:thin] [scrollbar-color:rgba(16,35,30,0.3)_transparent]"
                />
              </div>

              <div className="md:col-start-3 md:mt-6">
                <SubmitButton
                  loading={loading}
                  idle={submit}
                  busy={sending}
                  variant="light"
                  className="w-full hover:border-pink-500 hover:bg-pink-500 hover:text-glaze"
                />
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-[13px] opacity-60 sm:mt-8">
            {contactLead}{" "}
            <span className="whitespace-nowrap">
              <a href={CONTACT.phoneHref} className="underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
                {CONTACT.phone}
              </a>
            </span>{" "}
            ·{" "}
            <span className="whitespace-nowrap">
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
                {CONTACT.email}
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Takes the form's place once an enquiry is sent: what was asked for and how
 * AURA will follow up, on the channel the visitor chose. Frontend only — no
 * request is made, see `fakeSubmit`.
 */
function EnquiryConfirmation({ summary, done, onReset }: { summary: EnquirySummary; done: EnquiryDone; onReset: () => void }) {
  const reducedMotion = prefersReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    if (reducedMotion) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [reducedMotion]);

  const rows: [string, string][] = [
    [done.summaryLabels.date, summary.date],
    [done.summaryLabels.time, summary.time],
    [done.summaryLabels.guests, summary.guests],
    [done.summaryLabels.type, summary.type],
  ];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-6 flex flex-col items-center text-center sm:mt-8",
        !reducedMotion && "transition-[opacity,transform] duration-700 ease-out-expo",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/10">
        <CheckIcon className="h-6 w-6" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-2xl leading-tight outline-none md:text-3xl">
        {done.heading}
      </h3>

      <dl className="mt-6 w-full max-w-sm divide-y divide-ink/10 rounded-xl border border-ink/15 bg-ink/5 px-4 text-[14px]">
        {rows.map(([term, value]) => (
          <div key={term} className="flex justify-between gap-4 py-2">
            <dt className="opacity-60">{term}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 max-w-sm text-[14px] opacity-80">{done.nextStep.replace("{method}", summary.contactMethod)}</p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex h-11 items-center rounded-full border border-ink px-6 text-[13px] font-medium transition-colors duration-500 ease-out-expo hover:bg-ink hover:text-glaze"
      >
        {done.again}
      </button>
    </div>
  );
}
