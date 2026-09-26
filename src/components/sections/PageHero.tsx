"use client";

import { useCallback, useRef } from "react";
import type { PageHero as PageHeroContent } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { CORNER, Placeholder, SlotCaption } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { clamp, useScrollProgress } from "@/lib/scroll";

/** Opening band for inner pages: media backdrop with a centred serif title. */
export function PageHero({ eyebrow, title, text, slot }: PageHeroContent) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  const onFrame = useCallback((_: number, rect: DOMRect) => {
    const out = clamp(-rect.top / rect.height);
    if (media.current) media.current.style.transform = `translate3d(0, ${out * 25}%, 0) scale(${1.08 - out * 0.05})`;
  }, []);
  useScrollProgress(section, onFrame);

  return (
    <section ref={section} className="relative h-[72svh] min-h-[460px] overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 scale-[1.08] will-change-transform">
        <Placeholder slot={slot} bare className="h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-b from-jungle/70 via-jungle/20 to-jungle" />
      </div>
      <SlotCaption slot={slot} className={CORNER} />
      <div className="relative flex h-full flex-col items-center justify-end px-5 pb-20 text-center md:pb-24">
        {eyebrow && (
          <Reveal variant="fade" delay={150}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <RevealText as="h1" text={title} delay={250} className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl" />
        {text && (
          <Reveal variant="blur" delay={750}>
            <p className="mt-5 max-w-xl text-sm opacity-80 md:text-base">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
