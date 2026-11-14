import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const INPUT =
  "w-full rounded-none border-0 border-b border-current/25 bg-transparent px-0 py-3 text-[15px] placeholder:text-current/40 transition-colors focus:border-current focus:outline-none focus:ring-0 [color-scheme:dark]";

export function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("flex flex-col", className)}>
      {/* flex-col (not block) so a <select>'s inline-level box doesn't pick up baseline descender space the button/input boxes don't — that mismatch is what throws the underlines out of line. */}
      <span className="text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">{label}</span>
      {children}
    </label>
  );
}

export function SubmitButton({
  loading,
  idle,
  busy,
  variant = "dark",
  className,
}: {
  loading: boolean;
  idle: string;
  busy: string;
  /** "dark" for a cream button on a green card (default); "light" for an ink button on the glaze ground. */
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-8 text-[13px] font-medium transition-colors duration-500 ease-out-expo disabled:cursor-wait disabled:opacity-70",
        variant === "light"
          ? "border-ink bg-ink text-glaze hover:border-ink/70 hover:bg-transparent hover:text-ink"
          : "border-cream bg-cream text-jungle hover:border-forest hover:bg-forest hover:text-cream",
        className,
      )}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {loading ? busy : idle}
    </button>
  );
}

export function Notice({
  tone = "ok",
  variant = "dark",
  children,
}: {
  tone?: "ok" | "warn";
  /** "dark" for the green card (default); "light" for the glaze ground. */
  variant?: "dark" | "light";
  children: ReactNode;
}) {
  return (
    <p
      role="status"
      className={cn(
        "border-l-2 py-2 pl-4 text-sm",
        variant === "light"
          ? tone === "ok"
            ? "border-rim text-ink/80"
            : "border-bloom text-ink/80"
          : tone === "ok"
            ? "border-emerald-300 text-emerald-100"
            : "border-bloom text-cream/80",
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
