"use client";

import { useState, type FormEvent } from "react";

const INPUT =
  "w-full bg-white/[0.06] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder:text-emerald-200/50 text-xs focus:outline-none focus:border-[#D92B78] focus:ring-1 focus:ring-[#D92B78]/30";
const LABEL = "block text-[11px] uppercase tracking-[0.12em] text-emerald-100 mb-2";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // The original posts to a Laravel backend; the clone has none, so the
  // submission is acknowledged locally after the same loading state.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSent(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      form.reset();
    }, 1200);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Send Us a Message</h2>
      <div className="w-12 h-[2px] bg-[#D92B78] mb-6"></div>

      {sent && (
        <div className="mb-5 p-3 rounded-xl bg-green-500/20 border border-green-400/40">
          <p className="text-green-100 text-xs">Thank you! Your message has been sent. We will get back to you shortly.</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="[&>:not([hidden])~:not([hidden])]:mt-5">
        <div>
          <label className={LABEL}>Full Name</label>
          <input type="text" name="name" placeholder="Your name" className={INPUT} required />
        </div>

        <div>
          <label className={LABEL}>Email Address</label>
          <input type="email" name="email" placeholder="your@email.com" className={INPUT} required />
        </div>

        <div>
          <label className={LABEL}>Subject</label>
          <input type="text" name="subject" placeholder="What is this regarding?" className={INPUT} required />
        </div>

        <div>
          <label className={LABEL}>Message</label>
          <textarea name="message" rows={5} placeholder="Your message..." className={INPUT} required></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl font-semibold tracking-wide text-xs text-white transition shadow-lg bg-[#D92B78] hover:bg-[#b52062] flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          <span>{loading ? "Sending..." : "Send Message"}</span>
        </button>
      </form>
    </>
  );
}
