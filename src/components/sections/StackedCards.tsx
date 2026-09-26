"use client";

import { useEffect, useRef } from "react";
import type { Card } from "@/content/types";
import { TextLink } from "@/components/ui/Buttons";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { CORNER, SlotCaption } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { clamp, prefersReducedMotion, subscribeScroll } from "@/lib/scroll";

// Distinct greens behind each card while its photo loads, or while it is still a wireframe.
const TONES = ["bg-moss", "bg-leaf", "bg-forest", "bg-moss"];

/**
 * Full-height feature cards that pin and stack as you scroll. Each card's media
 * drifts inside its frame; when the next card slides over, the one beneath
 * shrinks slightly and darkens.
 */
export function StackedCards({ cards }: { cards: Card[] }) {
  const wrappers = useRef<(HTMLDivElement | null)[]>([]);
  const articles = useRef<(HTMLElement | null)[]>([]);
  const media = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    return subscribeScroll(() => {
      const vh = window.innerHeight;
      articles.current.forEach((article, i) => {
        const layer = media.current[i];
        if (!article || !layer) return;
        const rect = article.getBoundingClientRect();
        const travel = clamp((vh - rect.top) / (vh + rect.height));
        layer.style.transform = `translate3d(0, ${(0.5 - travel) * 14}%, 0) scale(1.18)`;

        const next = wrappers.current[i + 1];
        if (!next) return;
        const covered = clamp(1 - (next.getBoundingClientRect().top - rect.top) / rect.height);
        article.style.transform = `scale(${1 - covered * 0.07})`;
        article.style.setProperty("--dim", String(covered * 0.75));
      });
    });
  }, []);

  return (
    <section className="relative bg-jungle px-3 pb-3 text-cream md:px-6 md:pb-6">
      {cards.map((card, i) => (
        <div
          key={card.title}
          ref={(el) => {
            wrappers.current[i] = el;
          }}
          className="sticky top-3 not-first:mt-3 md:top-6 md:not-first:mt-6"
        >
          <article
            ref={(el) => {
              articles.current[i] = el;
            }}
            className={cn(
              "relative h-[calc(100svh-24px)] origin-top overflow-hidden rounded-sm will-change-transform md:h-[calc(100svh-48px)]",
              TONES[i % TONES.length],
            )}
          >
            <div
              ref={(el) => {
                media.current[i] = el;
              }}
              className="absolute inset-0 scale-[1.18] will-change-transform"
            >
              {/* The layer is scaled 1.18; on a portrait screen a landscape photo covers the height, so it renders far wider than the viewport. */}
              <Photo slot={card.slot} sizes="(orientation: portrait) 180vh, 118vw" bare className="h-full w-full" />
            </div>
            {!hasPhoto(card.slot) && <SlotCaption slot={card.slot} className={CORNER} />}
            <div className="absolute inset-0 bg-linear-to-t from-jungle/90 via-jungle/35 to-transparent" />

            <div className="relative flex h-full flex-col items-center justify-end px-6 pb-16 text-center md:pb-24">
              <RevealText text={card.title} className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl" />
              <Reveal delay={200}>
                <p className="mt-5 max-w-lg text-sm opacity-85 md:text-base">{card.text}</p>
              </Reveal>
              <Reveal delay={350} className="mt-7">
                <TextLink href={card.cta.href}>{card.cta.label}</TextLink>
              </Reveal>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-jungle opacity-(--dim,0)" />
          </article>
        </div>
      ))}
    </section>
  );
}
