"use client";

import { useLenis } from "lenis/react";
import { Pill, PillButton } from "@/components/ui/Buttons";
import { CONTACT } from "@/content/site";
import { prefersReducedMotion } from "@/lib/scroll";

/** Id of the enquiry form section on the Events page. */
export const ENQUIRE_ID = "enquire";

/**
 * Private Dining's buttons, side by side on every breakpoint, same Pill
 * styling as the main page: Enquire scrolls to the enquiry form (through
 * Lenis when it is running), Call Now dials the venue.
 */
export function EventActions({ enquire, call }: { enquire: string; call?: string }) {
  const lenis = useLenis();
  const toForm = () => {
    const target = document.getElementById(ENQUIRE_ID);
    if (!target) return;
    if (lenis) lenis.scrollTo(target);
    else
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
  };
  return (
    <div className="mt-6 flex flex-nowrap gap-3 md:mt-[42px]">
      <PillButton onClick={toForm} tone="outline" className="hover:border-forest hover:bg-forest">
        {enquire}
      </PillButton>
      {call && (
        <Pill href={CONTACT.phoneHref} tone="solid" className="hover:border-bloom hover:bg-bloom hover:text-cream">
          {call}
        </Pill>
      )}
    </div>
  );
}
