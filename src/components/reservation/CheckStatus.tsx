"use client";

import { useState, type FormEvent } from "react";
import { Fade } from "@/components/site/Fade";

export function CheckStatus() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // The original queries a Laravel endpoint. The clone has no reservations
  // database, so a search always resolves to the site's "not found" state.
  const searchReservations = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 800);
  };

  return (
    <div className="p-6 rounded-2xl bg-linear-to-r/srgb from-[#0D4F3B] to-[#1a7a5c] shadow-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-white/20 text-white shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm mb-1">Already Booked?</h3>
          <p className="text-emerald-100 text-xs">Check your reservation status by email</p>
        </div>
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          className="px-5 py-2.5 rounded-xl bg-[#D92B78] hover:bg-[#b52062] text-white text-xs font-semibold transition"
        >
          <span>{show ? "Close" : "Check Status"}</span>
        </button>
      </div>

      <Fade
        show={show}
        className="mt-4 pt-4 border-t border-white/20"
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
        leaveMs={200}
      >
        <form onSubmit={searchReservations}>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-emerald-100 mb-2">Enter Your Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 bg-white/[0.06] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder:text-emerald-200/50 text-xs focus:outline-none focus:border-[#D92B78] focus:ring-1 focus:ring-[#D92B78]/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-white text-[#0D4F3B] hover:bg-gray-100 text-xs font-semibold transition disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <span className="inline-block w-3 h-3 border-2 border-[#0D4F3B] border-t-transparent rounded-full animate-spin"></span>}
              <span>{loading ? "Searching..." : "Search"}</span>
            </button>
          </div>
        </form>

        {searched && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-400/40">
            <p className="text-red-100 text-xs">No reservations found for this email.</p>
          </div>
        )}
      </Fade>
    </div>
  );
}
