"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Link, Slot } from "@/content/types";
import { SITE } from "@/content/site";
import { Pill } from "@/components/ui/Buttons";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { clamp, prefersReducedMotion, useScrollProgress } from "@/lib/scroll";

interface HeroFilmProps {
  title: string;
  text?: string;
  slides: [Slot, Slot];
  ctas: Link[];
}

/**
 * Full-screen opening shot: two photos cross-fade with a slow Ken Burns drift.
 * The H1, subline, CTAs and rating strip are one static layer, visible on the
 * first frame — no entrance reveal. Scrolling lifts and fades this layer while
 * the media moves at half speed.
 */
export function HeroFilm({ title, text, slides, ctas }: HeroFilmProps) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
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
    if (!playing || prefersReducedMotion()) return;
    const id = window.setInterval(() => setSecond((value) => !value), 9000);
    return () => window.clearInterval(id);
  }, [playing]);

  const rating = SITE.rating;

  return (
    <section ref={section} className="relative h-svh min-h-[560px] overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 will-change-transform">
        {slides.map((slot, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 animate-kenburns transition-opacity duration-[2000ms] ease-in-out",
              !playing && "[animation-play-state:paused]",
              (i === 1) === second ? "opacity-100" : "opacity-0",
            )}
          >
            <Photo slot={slot} sizes="100vw" bare className="h-full w-full" />
            {!hasPhoto(slot) && <SlotCaption slot={slot} kind="video" className={cn(CORNER, "z-10")} />}
          </div>
        ))}
        <div className="absolute inset-0 bg-radial from-jungle/75 via-jungle/55 to-jungle/30" />
      </div>

      <div
        ref={content}
        className="relative flex h-full flex-col items-center justify-center px-5 text-center will-change-transform"
      >
        <h1 className="font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl">{title}</h1>
        {text && <p className="mt-6 max-w-md text-sm opacity-80 md:text-base">{text}</p>}
        {ctas.length > 0 && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {ctas.map((cta, i) => (
              <Pill key={cta.href} href={cta.href} tone={i === 0 ? "solid" : "outline"}>
                {cta.label}
              </Pill>
            ))}
          </div>
        )}
        {rating.score && rating.reviews && (
          <a
            href={rating.href}
            target="_blank"
            rel="noreferrer"
            className="mt-7 text-xs tracking-wide opacity-80 underline-offset-4 hover:underline"
          >
            {rating.score} from {rating.reviews} {rating.source} reviews
          </a>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase opacity-70">
        <span>Scroll</span>
        <span className="block h-12 w-px animate-cue bg-current" />
      </div>

      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        aria-label={playing ? "Pause background motion" : "Play background motion"}
        className="absolute right-5 bottom-7 flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream md:right-8"
      >
        {playing ? (
          <span className="flex gap-[3px]" aria-hidden="true">
            <span className="h-3 w-[2px] bg-current" />
            <span className="h-3 w-[2px] bg-current" />
          </span>
        ) : (
          <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M2 1l9 5-9 5z" />
          </svg>
        )}
      </button>
    </section>
  );
}
