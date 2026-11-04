"use client";

import { useCallback, useRef } from "react";
import type { Link, Slot } from "@/content/types";
import { CONTACT } from "@/content/site";
import { Eyebrow } from "@/components/ui/Buttons";
import { CORNER, Placeholder, SlotCaption } from "@/components/ui/Placeholder";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { useScrollProgress } from "@/lib/scroll";

interface LocationProps {
  eyebrow: string;
  title: string;
  slot: Slot;
  cta: Omit<Link, "href">;
}

/**
 * Full-bleed aerial photo behind a rim-shaped lens: scrolling zooms the photo
 * in, as if looking down through the plate rim onto the rooftop. Address and
 * a directions link sit bottom left.
 */
export function Location({ eyebrow, title, slot, cta }: LocationProps) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  const onFrame = useCallback((progress: number) => {
    const scale = 1 + progress * 0.22;
    if (media.current) media.current.style.transform = `scale(${scale})`;
    if (ring.current) ring.current.style.transform = `translate(-50%, -50%) scale(${1.3 - progress * 0.6})`;
  }, []);
  useScrollProgress(section, onFrame);

  return (
    <section ref={section} className="sticky top-0 z-0 h-[115vh] overflow-hidden bg-jungle text-cream">
      <div ref={media} className="absolute inset-0 scale-[1.1] will-change-transform">
        {hasPhoto(slot) ? (
          <Photo slot={slot} sizes="100vw" bare className="h-full w-full" />
        ) : (
          <Placeholder slot={slot} bare className="h-full w-full" />
        )}
      </div>
      {!hasPhoto(slot) && <SlotCaption slot={slot} className={CORNER} />}
      <div className="absolute inset-0 bg-radial from-jungle/15 via-jungle/55 to-jungle/90" />

      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] rounded-full border-2 border-rim/70 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <Reveal variant="fade">
          <Eyebrow className="text-cream/70">{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText text={title} className="mt-3 max-w-xl font-display text-4xl leading-[1.1] md:text-5xl" />
        <Reveal delay={150} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm opacity-85">
          <address className="not-italic">
            {CONTACT.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={CONTACT.googleMaps}
            target="_blank"
            rel="noreferrer"
            className="text-cream underline underline-offset-4"
          >
            {cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
