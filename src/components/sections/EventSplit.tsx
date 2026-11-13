import type { ReactNode } from "react";
import type { Slot } from "@/content/types";
import { EventTags } from "@/components/features/events/EventTags";
import { SplitSlider } from "@/components/features/events/SplitSlider";
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
  /** Buttons under the copy, each spaced like Amazónico's (42px apart). */
  actions?: ReactNode;
}

/**
 * One section of the Events page, sized like Amazónico's private dining
 * splits: two 50% columns at least one screen tall from `md`; below it the
 * photo stacks on top at 26:21. The copy is static (no scroll reveals).
 */
export function EventSplit({ title, tags, body, bestFor, slides, flip, actions }: EventSplitProps) {
  return (
    <section className="grid text-cream md:min-h-svh md:grid-cols-2">
      <div className={cn("relative aspect-[26/21] overflow-hidden md:aspect-auto", flip && "md:order-2")}>
        <SplitSlider slides={slides} />
      </div>
      <div className="flex items-center px-5 py-[68px] md:justify-center md:px-4 md:py-16 lg:px-[30px] lg:py-[90px]">
        <div className="w-full text-[15px] leading-[1.47] text-cream/60 md:max-w-[340px] md:text-[14px] lg:max-w-[480px] lg:text-[15px]">
          <h2 className="font-display text-[clamp(24px,calc(19.4413px+0.594354vw),28px)] leading-[1.32] font-normal tracking-[0.01em] text-balance text-cream">
            {title}
          </h2>
          {tags && <EventTags tags={tags} />}
          {body.map((paragraph) => (
            <p key={paragraph} className="mt-[15px] text-pretty">
              {paragraph}
            </p>
          ))}
          {bestFor && (
            <p className="mt-[15px] text-pretty">
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
