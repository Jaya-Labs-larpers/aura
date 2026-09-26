"use client";

import { useCallback, useRef, useState } from "react";
import type { Slot } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { CORNER, Placeholder, SlotCaption } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { clamp, useScrollProgress } from "@/lib/scroll";

interface HeroFilmProps {
  eyebrow?: string;
  title: string;
  text?: string;
  slot: Slot;
}

/**
 * Full-screen opening shot. The media layer is the future hero film; until it
 * exists it is a wireframe with a slow Ken Burns drift. Scrolling lifts and fades
 * the title while the media moves at half speed.
 */
export function HeroFilm({ eyebrow, title, text, slot }: HeroFilmProps) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  const onFrame = useCallback((_: number, rect: DOMRect) => {
    const out = clamp(-rect.top / rect.height);
    if (media.current) media.current.style.transform = `translate3d(0, ${out * 30}%, 0)`;
    if (content.current) {
      content.current.style.transform = `translate3d(0, ${out * -20}%, 0)`;
      content.current.style.opacity = String(1 - out * 1.6);
    }
  }, []);
  useScrollProgress(section, onFrame);

  return (
    <section ref={section} className="relative h-svh min-h-[560px] overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <div className={cn("absolute inset-0 animate-kenburns", !playing && "[animation-play-state:paused]")}>
          <Placeholder slot={slot} kind="video" bare className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-jungle/70 via-jungle/10 to-jungle" />
      </div>
      <SlotCaption slot={slot} kind="video" className={CORNER} />

      <div ref={content} className="relative flex h-full flex-col items-center justify-center px-5 text-center will-change-transform">
        {eyebrow && (
          <Reveal variant="fade" delay={200}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <RevealText as="h1" text={title} delay={350} className="mt-5 font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl" />
        {text && (
          <Reveal variant="blur" delay={1000}>
            <p className="mt-6 max-w-md text-sm opacity-80 md:text-base">{text}</p>
          </Reveal>
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
