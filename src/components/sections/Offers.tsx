"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Feature } from "@/content/types";
import { Eyebrow, Pill } from "@/components/ui/Buttons";
import { LeafMark } from "@/components/ui/LeafMotif";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

const AUTOPLAY_MS = 7000;

/**
 * Full-bleed crossfade carousel, one offer per slide (Happy Hour, Private
 * Events, ...). Same autoplay-and-fade move as Céla Vi's offerings slider,
 * rebuilt in AURA's own palette and type. Slide dimensions match Céla Vi's
 * own carousel (aspect-ratio 1920/900 desktop, 3/2 tablet, full-screen 2/3
 * portrait on mobile) instead of forcing one screen on every breakpoint.
 */
export function Offers({ heading, offers }: { heading?: string; offers: Feature[] }) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (prefersReducedMotion() || offers.length < 2) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % offers.length), AUTOPLAY_MS);
  }, [offers.length]);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  const goTo = (i: number) => {
    setActive((i + offers.length) % offers.length);
    restart();
  };

  const offer = offers[active];

  return (
    <>
      {heading && (
        <RevealText
          as="h2"
          text={heading}
          className="px-3 pt-10 pb-10 text-center font-display text-4xl leading-[1.1] text-cream md:px-6 md:pt-14 md:pb-14 md:text-5xl"
        />
      )}
      <section className="relative flex min-h-dvh max-w-full flex-col justify-end overflow-hidden bg-jungle text-cream aspect-[2/3] md:aspect-[3/2] md:min-h-0 lg:aspect-[1920/900]">
      {offers.map((o, i) => (
        <div
          key={`${o.title}-${i}`}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Photo slot={o.slot} sizes="100vw" bare className="h-full w-full" />
          {!hasPhoto(o.slot) && <SlotCaption slot={o.slot} className={cn(CORNER, "z-10")} />}
        </div>
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-jungle/95 via-jungle/40 to-jungle/10" />
      <LeafMark className="pointer-events-none absolute -top-20 -left-24 h-[50vmin] w-[50vmin] rotate-[12deg] text-leaf/[0.18]" />

      <div key={active} className="relative z-10 px-6 pb-16 md:px-12 md:pb-20">
        <Reveal variant="soft" delay={0}>
          <Eyebrow className="text-cream/75">{offer.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal variant="soft" delay={60}>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.1] md:max-w-[min(36rem,calc(100vw/3-3rem))] md:text-5xl">
            {offer.title}
          </h2>
        </Reveal>
        {offer.body?.map((line, i) => (
          <Reveal key={line} variant="soft" delay={120 + i * 60} className="mt-4 max-w-sm text-[15px] leading-relaxed opacity-85">
            <p>{line}</p>
          </Reveal>
        ))}
        {(offer.cta || offer.cta2) && (
          <Reveal
            variant="soft"
            delay={180}
            className="absolute inset-x-5 bottom-8 flex flex-wrap items-center justify-center gap-3 md:static md:inset-auto md:mt-7 md:justify-start"
          >
            {offer.cta2 && (
              <Pill href={offer.cta2.href} tone="white">
                {offer.cta2.label}
              </Pill>
            )}
            {offer.cta && (
              <Pill href={offer.cta.href} tone="outline" className="hover:border-forest hover:bg-forest">
                {offer.cta.label}
              </Pill>
            )}
          </Reveal>
        )}
      </div>

      {offers.length > 1 && (
        <div className="relative z-10 flex justify-end px-6 pb-8 md:px-12 md:pb-10">
          <div className="flex gap-1.5">
            {offers.map((o, i) => (
              <button
                key={`${o.title}-${i}`}
                type="button"
                aria-label={`Show ${o.title}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                  i === active ? "bg-cream" : "bg-cream/35 hover:bg-cream/60",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
    </>
  );
}
