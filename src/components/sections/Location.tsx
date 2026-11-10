"use client";

import { useCallback, useRef } from "react";
import type { Link, Slot } from "@/content/types";
import { CONTACT, HOURS } from "@/content/site";
import { Eyebrow, Pill } from "@/components/ui/Buttons";
import { CORNER, Placeholder, SlotCaption } from "@/components/ui/Placeholder";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { useScrollProgress } from "@/lib/scroll";

interface LocationProps {
  eyebrow: string;
  title: string;
  slot: Slot;
  cta: Omit<Link, "href">;
  gettingUp: string;
}

/**
 * Full-bleed aerial photo that zooms in on scroll. An info row
 * (address, hours, getting up) and a directions pill sit bottom left.
 */
export function Location({ eyebrow, title, slot, cta, gettingUp }: LocationProps) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  const onFrame = useCallback((progress: number) => {
    const scale = 1 + progress * 0.22;
    if (media.current) media.current.style.transform = `scale(${scale})`;
  }, []);
  useScrollProgress(section, onFrame);

  return (
    <section ref={section} className="sticky top-0 z-0 h-dvh overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 scale-[1.1] will-change-transform">
        {hasPhoto(slot) ? (
          <Photo slot={slot} sizes="100vw" bare className="h-full w-full" />
        ) : (
          <Placeholder slot={slot} bare className="h-full w-full" />
        )}
      </div>
      {!hasPhoto(slot) && <SlotCaption slot={slot} className={CORNER} />}
      <div className="absolute inset-0 bg-radial from-jungle/15 via-jungle/55 to-jungle/90" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <Reveal variant="fade">
          <Eyebrow className="text-cream/70">{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText
          text={title}
          className="mt-3 max-w-xl font-display text-4xl leading-[1.1] md:max-w-[min(36rem,calc(100vw/3-3rem))] md:text-5xl"
        />
        <Reveal delay={150}>
          <dl className="mt-6 grid gap-3.5 text-sm opacity-85 md:mt-7 md:grid-cols-3 md:gap-6">
            <div className="border-t border-cream/20 pt-2.5">
              <dt className="text-[10px] font-medium tracking-[0.28em] text-cream/60 uppercase">Address</dt>
              <dd>
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div className="border-t border-cream/20 pt-2.5">
              <dt className="text-[10px] font-medium tracking-[0.28em] text-cream/60 uppercase">Hours</dt>
              <dd>
                <span className="block">{HOURS[0].label}</span>
                <span className="block">{HOURS[0].value}</span>
              </dd>
            </div>
            <div className="border-t border-cream/20 pt-2.5">
              <dt className="text-[10px] font-medium tracking-[0.28em] text-cream/60 uppercase">Getting up</dt>
              <dd>{gettingUp}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={300}>
          <Pill tone="outline" href={CONTACT.googleMaps} className="mt-6 md:mt-7">
            {cta.label}
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}
