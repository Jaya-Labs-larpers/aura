"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Link, Slot } from "@/content/types";
import { Pill, PillButton } from "@/components/ui/Buttons";
import { useReservation } from "@/components/features/reservation/ReservationProvider";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { RESERVE } from "@/content/site";
import { cn } from "@/lib/cn";
import { clamp, prefersReducedMotion, useScrollProgress } from "@/lib/scroll";

interface HeroFilmProps {
  eyebrow: string;
  title: string;
  text?: string;
  chips?: string[];
  slides: Slot[];
  ctas: Link[];
}

/** How long each slide shows; the `kenburns` zoom in globals.css spans this plus the 2s fade. */
const SLIDE_MS = 8000;

/**
 * Full-bleed opening shot: the still photos cross-fade in turn, each with one
 * slow Ken Burns zoom. The brand title and tagline sit centered on a soft dark
 * glow, with the menu/booking CTAs beneath. Scrolling lifts and fades this
 * layer while the media moves at half speed.
 */
export function HeroFilm({ title, text, slides, ctas }: HeroFilmProps) {
  const { show } = useReservation();
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  // The outgoing slide keeps its zoom while it fades out; the rest drop it, so it restarts on their next turn.
  const [{ active, prev }, setTurn] = useState({ active: 0, prev: -1 });

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
    if (prefersReducedMotion() || slides.length < 2) return;
    const id = window.setInterval(
      () => setTurn(({ active }) => ({ active: (active + 1) % slides.length, prev: active })),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section ref={section} className="relative h-svh min-h-[560px] overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 will-change-transform">
        {slides.map((slot, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out motion-reduce:animate-none",
              i === active ? "opacity-100" : "opacity-0",
              (i === active || i === prev) && (slot.zoomOut ? "animate-kenburns-out" : "animate-kenburns"),
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
        className="relative isolate flex h-full flex-col items-center justify-center px-5 text-center will-change-transform md:px-12"
      >
        {/* Soft dark glow behind the title only, so bright photos keep their light. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-[ellipse_75%_32%_at_50%_50%] from-jungle/55 to-transparent md:bg-radial-[ellipse_42%_36%_at_50%_50%]"
        />
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-shadow-md text-shadow-jungle/30 md:text-7xl">
          {title}
        </h1>
        {text && (
          <p className="mt-4 max-w-md text-lg text-cream/80 text-shadow-sm text-shadow-jungle/35 md:text-xl">{text}</p>
        )}
        {/* Mobile: pinned near the bottom of the hero, like Amazónico's mobile layout. Desktop: back in flow under the text. */}
        {ctas.length > 0 && (
          <div className="absolute inset-x-5 bottom-8 flex flex-wrap items-center justify-center gap-4 md:static md:inset-auto md:mt-8">
            {ctas.map((cta, i) => {
              const tone = i === 0 ? "outline" : "solid";
              const className = i === 0 ? "hover:border-forest hover:bg-forest" : "hover:border-bloom hover:bg-bloom";
              if (cta.href === RESERVE.href) {
                return (
                  <PillButton key={cta.href} onClick={show} tone={tone} className={className}>
                    {cta.label}
                  </PillButton>
                );
              }
              return (
                <Pill key={cta.href} href={cta.href} tone={tone} className={className}>
                  {cta.label}
                </Pill>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
