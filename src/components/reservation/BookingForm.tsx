"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";

const ALL_TIMES = [
  "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM",
  "09:30 PM", "10:00 PM",
];

const INPUT =
  "w-full bg-white/[0.06] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder:text-emerald-200/50 text-xs focus:outline-none focus:border-[#D92B78] focus:ring-1 focus:ring-[#D92B78]/30";

const localDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

function Label({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <label className="text-[11px] uppercase tracking-[0.12em] text-emerald-100 mb-2 flex items-center">
      {icon}
      {children}
    </label>
  );
}

const iconClass = "w-3.5 h-3.5 mr-1.5 text-[#D92B78]";

// The visitor's clock, read per minute. The server snapshot is empty so the
// static HTML never bakes in the build date.
const subscribeClock = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};
const clockSnapshot = () => {
  const current = new Date();
  return `${localDate(current)} ${current.getHours()}:${current.getMinutes()}`;
};
const serverClockSnapshot = () => "";

export function BookingForm() {
  const clock = useSyncExternalStore(subscribeClock, clockSnapshot, serverClockSnapshot);
  const today = clock.split(" ")[0] ?? "";
  const [pickedDate, setPickedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const selectedDate = pickedDate || today;
  const setSelectedDate = setPickedDate;

  // Same rule as the site: on today's date, only slots later than now are offered.
  const filteredTimes = useMemo(() => {
    if (!clock || selectedDate !== today) return ALL_TIMES;
    const [nowHours, nowMinutes] = clock.split(" ")[1].split(":").map(Number);
    const nowTotal = nowHours * 60 + nowMinutes;
    return ALL_TIMES.filter((slot) => {
      const [time, modifier] = slot.split(" ");
      let [hours] = time.split(":").map(Number);
      const minutes = Number(time.split(":")[1]);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes > nowTotal;
    });
  }, [clock, selectedDate, today]);

  // The original posts to a Laravel backend; the clone acknowledges locally.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setBooked(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
      form.reset();
      setSelectedTime("");
      setSelectedDate("");
    }, 1200);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Book Your Table</h2>
      <div className="w-12 h-[2px] bg-[#D92B78] mb-6"></div>

      {booked && (
        <div className="mb-5 p-3 rounded-xl bg-green-500/20 border border-green-400/40">
          <p className="text-green-100 text-xs">Thank you! Your reservation request has been received.</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="[&>:not([hidden])~:not([hidden])]:mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              icon={
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              }
            >
              Date
            </Label>
            <input
              type="date"
              name="date"
              value={selectedDate}
              min={today || undefined}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#D92B78] focus:ring-1 focus:ring-[#D92B78]/30"
            />
          </div>

          <div>
            <Label
              icon={
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              }
            >
              Time
            </Label>
            <select
              name="time"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              className="w-full border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#D92B78] focus:ring-1 focus:ring-[#D92B78]/30 bg-[#083B2C]"
            >
              <option value="" className="text-white bg-[#083B2C]">
                Select time
              </option>
              {filteredTimes.map((slot) => (
                <option key={slot} value={slot} className="text-white bg-[#083B2C]">
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label
            icon={
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            }
          >
            Party Size
          </Label>
          <input type="number" name="party_size" placeholder="Number of guests" className={INPUT} />
        </div>

        <div>
          <Label
            icon={
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            }
          >
            Phone Number (Optional)
          </Label>
          <input type="text" name="phone" placeholder="Your phone number" className={INPUT} />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-emerald-100 mb-2">Full Name</label>
          <input type="text" name="name" placeholder="Your name" className={INPUT} />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-emerald-100 mb-2">Email Address</label>
          <input type="email" name="email" placeholder="your@email.com" className={INPUT} />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-emerald-100 mb-2">Special Requests (Optional)</label>
          <textarea
            rows={4}
            name="special_requests"
            placeholder="Dietary restrictions, allergies, special occasions..."
            className={INPUT}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl font-semibold tracking-wide text-xs text-white transition shadow-lg bg-[#D92B78] hover:bg-[#b52062] flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          <span>{loading ? "Processing..." : "Reserve Table"}</span>
        </button>
      </form>
    </>
  );
}
