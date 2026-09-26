"use client";

import { useState, type FormEvent } from "react";
import { Field, INPUT, Notice, fakeSubmit } from "@/components/features/forms/Field";

/** Booking lookup by email. Frontend only: always resolves to "not found" until a backend exists. */
export function CheckStatus() {
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(false);
    setLoading(true);
    fakeSubmit(() => {
      setLoading(false);
      setSearched(true);
    }, 900);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex items-end gap-4">
        <Field label="Check an existing booking" className="flex-1">
          <input type="email" name="email" required placeholder="you@example.com" className={INPUT} />
        </Field>
        <button
          type="submit"
          disabled={loading}
          className="h-11 shrink-0 rounded-full border border-current/40 px-5 text-[13px] transition-colors hover:border-current disabled:opacity-60"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </div>
      {searched && <Notice tone="warn">No reservations found for this email.</Notice>}
    </form>
  );
}
