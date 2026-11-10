import type { ReactNode } from "react";
import type { Slot } from "@/content/types";
import { SplitSlider } from "@/components/features/events/SplitSlider";
import { Eyebrow } from "@/components/ui/Buttons";
import { cn } from "@/lib/cn";

interface EventSplitProps {
  title: string;
  /** Capacity and features, one line under the title. */
  tags?: readonly string[];
  body: string[];
  /** Closing "Best for" line. */
  bestFor?: string;
  slides: readonly Slot[];
  /** Photo on the right from `md` up. Below `md` the photo always sits on top. */
  flip?: boolean;
  /** The page's first split carries the h1. */
  as?: "h1" | "h2";
  /** Buttons under the copy, each spaced like Amazónico's (42px apart). */
  actions?: ReactNode;
}

/**
 * One section of the Events page, sized like Amazónico's private dining
 * splits: two 50% columns at least one screen tall from `md`; below it the
 * photo stacks on top at 26:21. The copy is static (no scroll reveals).
 */
export function EventSplit({ title, tags, body, bestFor, slides, flip, as: Heading = "h2", actions }: EventSplitProps) {
  return (
    <section className="grid text-cream md:min-h-svh md:grid-cols-2">
      <div className={cn("relative aspect-[26/21] overflow-hidden md:aspect-auto", flip && "md:order-2")}>
        <SplitSlider slides={slides} />
      </div>
      <div className="flex items-center px-5 py-[68px] md:justify-center md:px-[30px] md:py-[90px]">
        <div className="w-full text-[15px] leading-[1.47] text-cream/60 md:max-w-[350px]">
          <Heading className="font-display text-[clamp(24px,calc(19.4413px+0.594354vw),28px)] leading-[1.32] font-normal tracking-[0.01em] text-cream">
            {title}
          </Heading>
          {tags && <Eyebrow className="mt-3 tracking-[0.2em] text-cream">{tags.join(" · ")}</Eyebrow>}
          {body.map((paragraph) => (
            <p key={paragraph} className="mt-[15px]">
              {paragraph}
            </p>
          ))}
          {bestFor && (
            <p className="mt-[15px]">
              <span className="mr-2 text-[11px] font-medium tracking-[0.2em] text-cream uppercase">Best for</span>
              {bestFor}
            </p>
          )}
          {actions}
        </div>
      </div>
    </section>
  );
}
