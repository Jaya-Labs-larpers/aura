"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Link, Slot } from "@/content/types";
import { Pill } from "@/components/ui/Buttons";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { clamp, prefersReducedMotion, useScrollProgress } from "@/lib/scroll";

interface HeroFilmProps {
  eyebrow: string;
  title: string;
  text?: string;
  chips?: string[];
  slides: [Slot, Slot];
  ctas: Link[];
}

/**
 * Full-bleed opening shot: the two still photos cross-fade with a slow Ken
 * Burns drift. The brand title and tagline sit centered on a dark fade, with
 * the menu/booking CTAs beneath. Scrolling lifts and fades this layer while
 * the media moves at half speed.
 */
export function HeroFilm({ title, text, slides, ctas }: HeroFilmProps) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [second, setSecond] = useState(false);

  const onFrame = useCallback((_: number, rect: DOMRect) => {
    const out = clamp(-rect.top / rect.height);
    if (media.current) media.current.style.transform = `translate3d(0, ${out * 30}%, 0)`;
    if (content.current) {
      content.current.style.transform = `translate3d(0, ${out * -20}%, 0)`;
      content.current.style.opacity = String(1 - out * 1.6);
    }
  }, []);
  useScrollProgress(section, onFrame);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setSecond((value) => !value), 9000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section ref={section} className="relative h-svh min-h-[560px] overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 will-change-transform">
        {slides.map((slot, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 animate-kenburns transition-opacity duration-[2000ms] ease-in-out",
              (i === 1) === second ? "opacity-100" : "opacity-0",
            )}
          >
            <Photo slot={slot} sizes="100vw" bare className="h-full w-full" />
            {!hasPhoto(slot) && <SlotCaption slot={slot} kind="video" className={cn(CORNER, "z-10")} />}
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-jungle/90 via-jungle/25 to-jungle/10" />
      </div>

      <div
        ref={content}
        className="relative flex h-full flex-col items-center justify-center px-5 text-center will-change-transform md:px-12"
      >
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">{title}</h1>
        {text && <p className="mt-4 max-w-md text-lg text-cream/80 md:text-xl">{text}</p>}
        {ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {ctas.map((cta, i) => (
              <Pill key={cta.href} href={cta.href} tone={i === 0 ? "solid" : "outline"}>
                {cta.label}
              </Pill>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
