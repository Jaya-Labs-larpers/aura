"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { BookingForm } from "@/components/features/reservation/BookingForm";
import { useReservation } from "@/components/features/reservation/ReservationProvider";
import { CloseIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { RESERVATION } from "@/content/reservation";
import { cn } from "@/lib/cn";

/**
 * Full-screen reservation overlay, laid over whatever page is open (the header
 * included). The X closes it with the same fade/rise used to open it, back to
 * that page exactly as it was left — nothing underneath ever unmounts.
 *
 * The image/form split and its breakpoints mirror the Céla Vi VIP-table modal:
 * side-by-side with the photo filling the row's height from 1024px up, a
 * 16:9 banner stacked above the form below that, and a close button pinned to
 * the viewport corner (not to the scrolling content) at every size.
 */
export function ReservationOverlay() {
  const { open, hide } = useReservation();
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && hide();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={RESERVATION.title}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-[60] overflow-hidden bg-forest text-cream transition-[clip-path] duration-700 ease-in-out-quart",
        open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
      )}
    >
      {/* Fixed so the pattern stays put while the form scrolls, same as the body's green ground. */}
      <div aria-hidden="true" className="leaf-card -z-10" style={{ position: "fixed" }} />

      {/* Pinned to the viewport corner, not the scroll container below — stays over
          whatever is currently in view as the content scrolls under it. */}
      <button
        type="button"
        onClick={hide}
        aria-label="Close"
        className="fixed top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/50 bg-jungle/40 text-cream backdrop-blur-md transition-colors duration-300 hover:border-cream hover:bg-jungle/70 sm:top-8 sm:right-6 sm:h-12 sm:w-12 md:right-8 lg:right-12"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      <div className="h-full overflow-hidden">
        <div className="grid h-full grid-rows-[auto_1fr] lg:grid-cols-2 lg:grid-rows-1">
          <div className="relative h-20 sm:h-32 md:h-40 lg:h-full">
            <Photo
              slot={RESERVATION.hero}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* Scrolls natively (Lenis is stopped while open) when the form outgrows a short viewport. */}
          <div className="relative flex min-h-0 flex-col overflow-y-auto px-4 pt-2 pb-3 sm:px-6 sm:py-5 md:px-10 lg:px-16 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]">
            <div className="my-auto">
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase opacity-70">{RESERVATION.eyebrow}</p>
              <h2 className="mt-1 font-display text-lg leading-tight uppercase sm:text-2xl lg:text-4xl">
                {RESERVATION.title}
              </h2>
              <p className="mt-1 max-w-lg truncate text-[12px] opacity-80 sm:overflow-visible sm:text-[15px] sm:whitespace-normal">
                {RESERVATION.text}
              </p>

              <div className="mt-2 sm:mt-5">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
