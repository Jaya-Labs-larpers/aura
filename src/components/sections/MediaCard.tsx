"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Link as LinkType, MediaCardSlot } from "@/content/types";
import { TextLink } from "@/components/ui/Buttons";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

const AUTOPLAY_MS = 15000;

interface MediaCardProps {
  id: string;
  title: string;
  body: string[];
  cta: LinkType;
  slots: MediaCardSlot[];
}

/**
 * Full-bleed editorial card: photo edge to edge, one-word title, a two-paragraph
 * body and a plain-text CTA, bottom-anchored — Amazónico's repeating menu-card shape.
 */
export function MediaCard({ id, title, body, cta, slots }: MediaCardProps) {
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

  const current = slots[active];
  const activeTitle = current?.title ?? title;
  const activeBody = current?.body ?? body;
  const activeCta = current?.cta ?? cta;

  return (
    <section id={id} className="px-3 pt-4 pb-4 md:px-6">
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

        <div key={active} className="relative flex h-full flex-col items-center justify-end px-6 text-center">
          <div className="max-w-[680px] pb-16 md:pb-24 lg:max-w-[800px]">
            <Reveal variant="soft" delay={0}>
              <h2 className="text-balance font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">{activeTitle}</h2>
            </Reveal>
            {activeBody.map((paragraph, i) => (
              <Reveal
                key={i}
                variant="soft"
                delay={60 + i * 60}
                className={cn("text-sm", i === 0 ? "mt-[15px] opacity-85 md:text-base" : "mt-3 opacity-70 md:text-[15px]")}
              >
                <p className="text-pretty">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal variant="soft" delay={180} className="mt-7">
              <TextLink href={activeCta.href}>{activeCta.label}</TextLink>
            </Reveal>
          </div>
        </div>
      </article>
    </section>
  );
}
