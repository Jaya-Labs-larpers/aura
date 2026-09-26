"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { Field, INPUT, Notice, SubmitButton, fakeSubmit } from "@/components/features/forms/Field";

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
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      {booked && <Notice>Thank you — your request has been received. We&apos;ll confirm by email.</Notice>}

      <div className="grid gap-7 sm:grid-cols-3">
        <Field label="Date">
          <input
            type="date"
            name="date"
            required
            value={selectedDate}
            min={today || undefined}
            onChange={(event) => setDate(event.target.value)}
            className={INPUT}
          />
        </Field>
        <Field label="Time">
          <select name="time" required defaultValue="" className={INPUT}>
            <option value="" disabled className="bg-jungle">
              Select
            </option>
            {times.map((time) => (
              <option key={time} value={time} className="bg-jungle">
                {label(time)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Guests">
          <input type="number" name="guests" min={1} max={120} required placeholder="2" className={INPUT} />
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name">
          <input type="text" name="name" autoComplete="name" required placeholder="Your name" className={INPUT} />
        </Field>
        <Field label="Phone (optional)">
          <input type="tel" name="phone" autoComplete="tel" placeholder="+855" className={INPUT} />
        </Field>
      </div>

      <Field label="Email">
        <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" className={INPUT} />
      </Field>

      <Field label="Special requests (optional)">
        <textarea name="requests" rows={3} placeholder="Allergies, occasions, seating…" className={INPUT} />
      </Field>

      <SubmitButton loading={loading} idle="Request booking" busy="Sending…" />
    </form>
  );
}
