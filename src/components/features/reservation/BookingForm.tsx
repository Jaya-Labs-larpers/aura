"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { Field, INPUT, Notice, fakeSubmit } from "@/components/features/forms/Field";
import { CalendarIcon, ChevronIcon, ClockIcon } from "@/components/ui/Icons";
import { RESERVATION } from "@/content/reservation";
import { cn } from "@/lib/cn";

// Boxed variant for the booking-detail fields (space/date/time/guests), next to
// the shared underline-style INPUT used for the contact fields — the two field
// treatments the Céla Vi VIP-table form mixes on a single narrow column.
const FIELD_BOX =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.06] px-3.5 py-2 sm:py-2.5 text-[15px] text-cream placeholder:text-cream/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors focus:border-cream/70 focus:bg-cream/[0.1] focus:outline-none focus:ring-0 [color-scheme:dark]";

// Date/Time share an icon-left, chevron-right treatment on top of FIELD_BOX.
const FIELD_BOX_ICON = cn(FIELD_BOX, "appearance-none pl-10 pr-9");

// Side-by-side segmented toggle for the venue choice (Indoor / Outdoor) — a pair
// of buttons in one row instead of a dropdown, to save vertical space.
const TOGGLE_BTN = "flex h-full w-full items-center justify-center rounded-lg border px-3.5 py-2 sm:py-2.5 text-[15px] font-medium transition-colors";

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

export function BookingForm() {
  const clock = useSyncExternalStore(subscribeClock, clockSnapshot, () => "");
  const [today = "", nowMinutes = "0"] = clock.split(" ");
  const [date, setDate] = useState("");
  const [space, setSpace] = useState<string>(RESERVATION.spaces[0].value);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
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
    setBooked(false);
    setLoading(true);
    fakeSubmit(() => {
      setLoading(false);
      setBooked(true);
      form.reset();
      setDate("");
      setSpace(RESERVATION.spaces[0].value);
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 sm:space-y-3">
      {booked && <Notice>Thank you — your request has been received. We&apos;ll confirm by email.</Notice>}

      <Field label="Choose the space">
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
          <div className="relative mt-1">
            <CalendarIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 opacity-60" />
            <input
              type="date"
              name="date"
              required
              value={selectedDate}
              min={today || undefined}
              onChange={(event) => setDate(event.target.value)}
              className={FIELD_BOX_ICON}
            />
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
        <Field label="Phone (optional)">
          <input type="tel" name="phone" autoComplete="tel" placeholder="+855" className={INPUT} />
        </Field>
      </div>

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

      <Field label="Special requests (optional)">
        <textarea name="requests" rows={1} placeholder="Allergies, occasions, seating…" className={INPUT} />
      </Field>

      <ReserveSubmit loading={loading} />
    </form>
  );
}

// Fixed-width pill (192×44px) rather than the shared full-hugging SubmitButton —
// the Céla Vi form's submit sits left-aligned at a fixed size, not full width.
function ReserveSubmit({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-10 w-44 sm:h-11 sm:w-48 items-center justify-center gap-2 rounded-full border border-cream bg-cream text-[13px] font-medium text-jungle transition-colors duration-500 ease-out-expo hover:border-forest hover:bg-forest hover:text-cream disabled:cursor-wait disabled:opacity-70"
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {loading ? "Sending…" : "Request booking"}
    </button>
  );
}
