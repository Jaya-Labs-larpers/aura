import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const INPUT =
  "w-full rounded-none border-0 border-b border-current/25 bg-transparent px-0 py-3 text-[15px] placeholder:text-current/40 transition-colors focus:border-current focus:outline-none focus:ring-0 [color-scheme:dark]";

export function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">{label}</span>
      {children}
    </label>
  );
}

export function SubmitButton({ loading, idle, busy }: { loading: boolean; idle: string; busy: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cream px-8 text-[13px] font-medium text-jungle transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {loading ? busy : idle}
    </button>
  );
}

export function Notice({ tone = "ok", children }: { tone?: "ok" | "warn"; children: ReactNode }) {
  return (
    <p
      role="status"
      className={cn(
        "border-l-2 py-2 pl-4 text-sm",
        tone === "ok" ? "border-emerald-300 text-emerald-100" : "border-bloom text-cream/80",
      )}
    >
      {children}
    </p>
  );
}

/**
 * Frontend-only submit: shows the loading state, then a local confirmation.
 * Swap this for a real request when a booking backend is connected.
 */
export function fakeSubmit(done: () => void, ms = 1100) {
  window.setTimeout(done, ms);
}
