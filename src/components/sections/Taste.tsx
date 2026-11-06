"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Slot } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

const AUTOPLAY_MS = 7000;

interface TasteProps {
  eyebrow: string;
  title: string;
  lead: string;
  slots: Slot[];
}

export function Taste({ eyebrow, title, lead, slots }: TasteProps) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (prefersReducedMotion() || slots.length < 2) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % slots.length), AUTOPLAY_MS);
  }, [slots.length]);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  return (
    // Full-screen card, same treatment as the StackedCards below it: photo bleeds edge to
    // edge, copy sits over a bottom gradient instead of beside the photo in a split panel.
    <section id="taste" className="px-3 pt-4 pb-3 md:px-6 md:pb-6">
      <article className="relative h-[calc(100svh-24px)] overflow-hidden rounded-sm bg-moss text-cream md:h-[calc(100svh-48px)]">
        {slots.map((slot, i) => (
          <div
            key={slot.photo ?? i}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Photo slot={slot} sizes="100vw" bare className="h-full w-full" />
            {!hasPhoto(slot) && <SlotCaption slot={slot} className={CORNER} />}
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-jungle/90 via-jungle/35 to-transparent" />

        <div className="relative flex h-full flex-col items-center justify-end px-6 text-center">
          <div className="max-w-lg pb-16 md:pb-24">
            <Reveal variant="fade">
              <Eyebrow className="text-cream/70">{eyebrow}</Eyebrow>
            </Reveal>
            <RevealText
              text={title}
              className="mt-3 text-balance font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
            />
            <Reveal delay={400} className="mt-5 text-sm opacity-85 md:text-base">
              <p>{lead}</p>
            </Reveal>
          </div>
        </div>
      </article>
    </section>
  );
}
