"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { DatePicker } from "@/components/features/forms/DatePicker";
import { Field, INPUT, fakeSubmit } from "@/components/features/forms/Field";
import { ChevronIcon, ClockIcon } from "@/components/ui/Icons";
import { RESERVATION } from "@/content/reservation";
import { CONTACT } from "@/content/site";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

// Boxed variant for the booking-detail fields (space/date/time/guests), next to
// the shared underline-style INPUT used for the contact fields — the two field
// treatments the Céla Vi VIP-table form mixes on a single narrow column.
const FIELD_BOX =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.06] px-3.5 py-2 sm:py-2.5 text-[15px] text-cream placeholder:text-cream/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors focus:border-cream/70 focus:bg-cream/[0.1] focus:outline-none focus:ring-0 [color-scheme:dark]";

// Time shares an icon-left, chevron-right treatment on top of FIELD_BOX.
const FIELD_BOX_ICON = cn(FIELD_BOX, "appearance-none pl-10 pr-9");

// Side-by-side segmented toggle for the venue choice (Indoor / Outdoor) — a pair
// of buttons in one row instead of a dropdown, to save vertical space.
const TOGGLE_BTN = "flex h-full w-full items-center justify-center rounded-lg border px-3.5 py-2 sm:py-2.5 text-[15px] font-medium transition-colors";

// Small pill radios (Mobile / WhatsApp / Telegram): the Events form's contact-method pills at this form's scale.
const PILL =
  "inline-flex h-8 cursor-pointer items-center rounded-full border border-cream/30 px-3.5 text-[12px] font-medium tracking-wide transition-colors duration-500 ease-out-expo hover:border-cream has-checked:border-cream has-checked:bg-cream has-checked:text-jungle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-bloom";

// Grows with its content instead of scrolling; a thin cream scrollbar past the cap so
// the native one never shows up against the dark card.
const TEXTAREA = cn(
  INPUT,
  "max-h-24 resize-none [field-sizing:content] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent]",
);

const TIMES = [
  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const label = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const displayDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};

// The visitor's clock, refreshed every 30s. The server snapshot is empty so the
// static HTML never bakes in the build date.
const subscribeClock = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const clockSnapshot = () => {
  const now = new Date();
  return `${isoDate(now)} ${now.getHours() * 60 + now.getMinutes()}`;
};

interface Summary {
  space: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
}

// Reveal with a height/opacity transition; skipped entirely under reduced motion.
function Disclosure({ children }: { children: ReactNode }) {
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
        visible ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

export function BookingForm() {
  const clock = useSyncExternalStore(subscribeClock, clockSnapshot, () => "");
  const [today = "", nowMinutes = "0"] = clock.split(" ");
  const [date, setDate] = useState("");
  const [space, setSpace] = useState<string>(RESERVATION.spaces[0].value);
  const [contact, setContact] = useState("");
  const [dietary, setDietary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const selectedDate = date || today;

  // On today's date, only offer slots that are still ahead.
  const times = useMemo(() => {
    if (!clock || selectedDate !== today) return TIMES;
    return TIMES.filter((time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m > Number(nowMinutes);
    });
  }, [clock, selectedDate, today, nowMinutes]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "");
    const next: Summary = {
      space: RESERVATION.spaces.find((option) => option.value === read("space"))?.label ?? read("space"),
      date: displayDate(read("date")),
      time: label(read("time")),
      guests: read("guests"),
      name: read("name"),
      email: read("email"),
    };
    setLoading(true);
    fakeSubmit(() => {
      setLoading(false);
      setSummary(next);
      form.reset();
      setDate("");
      setSpace(RESERVATION.spaces[0].value);
      setContact("");
      setDietary(false);
    });
  };

  if (summary) return <Confirmation summary={summary} onReset={() => setSummary(null)} />;

  return (
    <form onSubmit={onSubmit} className="space-y-2 sm:space-y-3">
      <Field label={RESERVATION.spaceLabel}>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {RESERVATION.spaces.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={space === option.value}
              onClick={() => setSpace(option.value)}
              className={cn(
                TOGGLE_BTN,
                space === option.value ? "border-cream bg-cream text-jungle" : "border-current/25 hover:border-current/50",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="space" value={space} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <div className="mt-1">
            <DatePicker name="date" value={selectedDate} today={today} onChange={setDate} variant="dark" className={FIELD_BOX} />
          </div>
        </Field>

        <Field label="Time">
          <div className="relative mt-1">
            <ClockIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 opacity-60" />
            <select name="time" required defaultValue="" className={FIELD_BOX_ICON}>
              <option value="" disabled className="bg-jungle">
                Select
              </option>
              {times.map((time) => (
                <option key={time} value={time} className="bg-jungle">
                  {label(time)}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Guests">
          <input type="number" name="guests" min={1} max={120} required placeholder="2" className={FIELD_BOX} />
        </Field>
        <Field label={contact ? "Phone" : "Phone (optional)"}>
          <input type="tel" name="phone" autoComplete="tel" required={!!contact} placeholder="+855" className={INPUT} />
        </Field>
      </div>

      <fieldset>
        <legend className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">Reach me on</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {RESERVATION.contactMethods.map((method) => (
            <label key={method} className={PILL}>
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={contact === method}
                onChange={() => setContact(method)}
                className="sr-only"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Full name">
          <input type="text" name="name" autoComplete="name" required placeholder="Your name" className={INPUT} />
        </Field>
        <Field label="Email">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={INPUT}
          />
        </Field>
      </div>

      <div>
        <label className="group flex cursor-pointer items-center gap-3 py-1 text-[14px]">
          <input
            type="checkbox"
            name="dietary"
            checked={dietary}
            onChange={(event) => setDietary(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-cream/40 transition-colors duration-300 group-hover:border-cream peer-checked:border-cream peer-checked:bg-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bloom [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-jungle transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          </span>
          <span className="opacity-85">{RESERVATION.dietary.label}</span>
        </label>
        {dietary && (
          <Disclosure>
            <Field label={RESERVATION.dietary.detailLabel}>
              <input type="text" name="dietaryDetail" required placeholder={RESERVATION.dietary.placeholder} className={INPUT} />
            </Field>
          </Disclosure>
        )}
      </div>

      <Field label="Special requests (optional)">
        <textarea name="requests" rows={1} placeholder="Occasions, seating, timing…" className={TEXTAREA} />
      </Field>

      <ReserveSubmit loading={loading} />
    </form>
  );
}

// Fixed-height pill rather than the shared full-hugging SubmitButton —
// the Céla Vi form's submit sits left-aligned, not full width.
function ReserveSubmit({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-cream bg-cream px-7 text-[13px] font-medium text-jungle transition-colors duration-500 ease-out-expo hover:border-forest hover:bg-forest hover:text-cream disabled:cursor-wait disabled:opacity-70 sm:h-11"
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {loading ? RESERVATION.sending : RESERVATION.submit}
    </button>
  );
}

/**
 * Takes the form's place once a request is sent: what was asked for, where the
 * confirmation goes, what happens next. Frontend only: the email line is copy
 * until a booking backend exists.
 */
function Confirmation({ summary, onReset }: { summary: Summary; onReset: () => void }) {
  const { confirmation } = RESERVATION;
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
    ["Area", summary.space],
    ["Date", summary.date],
    ["Time", summary.time],
    ["Guests", summary.guests],
    ["Name", summary.name],
  ];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        !reducedMotion && "transition-[opacity,transform] duration-700 ease-out-expo",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      <p className="text-[11px] font-medium tracking-[0.28em] text-emerald-200 uppercase">{confirmation.eyebrow}</p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-2 font-display text-xl leading-tight outline-none sm:text-2xl">
        {confirmation.title}
      </h3>

      <dl className="mt-4 divide-y divide-cream/10 rounded-xl border border-cream/15 bg-cream/[0.06] px-4 text-[14px]">
        {rows.map(([term, value]) => (
          <div key={term} className="flex justify-between gap-4 py-2">
            <dt className="opacity-60">{term}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-[14px] opacity-85">
        {confirmation.emailNote} <span className="font-medium">{summary.email}</span>.
      </p>
      <p className="mt-1 text-[14px] opacity-85">{confirmation.nextStep}</p>
      <p className="mt-1 text-[14px] opacity-70">
        {confirmation.contactNote}{" "}
        <a href={CONTACT.phoneHref} className="underline underline-offset-4 hover:opacity-100">
          {CONTACT.phone}
        </a>
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex h-10 items-center rounded-full border border-cream/50 px-6 text-[13px] font-medium transition-colors duration-500 ease-out-expo hover:border-cream hover:bg-cream hover:text-jungle"
      >
        {confirmation.again}
      </button>
    </div>
  );
}
