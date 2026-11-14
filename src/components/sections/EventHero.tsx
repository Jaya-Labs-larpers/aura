import type { Slot } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface EventHeroProps {
  title: string;
  slot: Slot;
  className?: string;
}

/**
 * Opens the Events page like Zuma's private dining masthead: one full-bleed
 * photo under the header, anchored to its bottom edge, title set bottom-left.
 * Zuma fades the bottom half of the photo into the page with a
 * `linear-gradient(transparent, #000)` over its lower 50%. Our ground is
 * patterned (grain + leaves), so a solid fade would leave a seam; the same
 * curve is applied as a mask instead, so the photo melts into the real ground.
 * Height comes from the parent (see the Events page): it fills whatever the
 * intro copy below leaves of the first screen.
 */
export function EventHero({ title, slot, className }: EventHeroProps) {
  return (
    <section className={cn("relative flex flex-col justify-end overflow-hidden text-cream", className)}>
      <div className="absolute inset-0 mask-b-from-50% mask-b-to-100%">
        <Photo slot={slot} sizes="100vw" className="h-full w-full object-bottom" />
        {/* Zuma's masthead is a dark shot; ours is a bright party photo, so the header gets a short scrim to stay legible. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-jungle/60 to-transparent" />
      </div>
      {/* Zuma measures 38px from the title's line box to the photo's bottom edge; our masked fade makes the
          visible edge read higher, so the title sits a little further up than Zuma's number alone would. */}
      <div className="relative px-5 pb-[38px] md:px-[30px] md:pb-[56px]">
        <RevealText
          as="h1"
          text={title}
          delay={150}
          className="max-w-2xl text-balance font-display text-[clamp(32px,calc(20px+6vw),56px)] leading-[1.05] font-normal tracking-[0.01em] text-shadow-md text-shadow-jungle/30"
        />
      </div>
    </section>
  );
}
