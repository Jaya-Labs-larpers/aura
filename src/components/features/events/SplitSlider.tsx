"use client";

import { useRef, useState, type PointerEvent } from "react";
import type { Slot } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

/** Horizontal drag, in px, that counts as a swipe. */
const SWIPE = 40;

/**
 * Photo slider filling one half of an Events split, after Amazónico's: slides
 * cross-fade, no autoplay, invisible prev/next zones over the outer 15% of each
 * side, swipe on touch, subtle round dots near the bottom (same treatment as
 * the Offers section's slide indicator).
 */
export function SplitSlider({ slides }: { slides: readonly Slot[] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);
  const count = slides.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  const onPointerDown = (event: PointerEvent) => {
    startX.current = event.clientX;
    swiped.current = false;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (startX.current === null) return;
    const dx = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) <= SWIPE) return;
    swiped.current = true;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className="absolute inset-0 touch-pan-y select-none"
      onPointerDown={count > 1 ? onPointerDown : undefined}
      onPointerUp={count > 1 ? onPointerUp : undefined}
      onPointerCancel={() => (startX.current = null)}
      // A swipe that ends over a prev/next zone must not also step through its click.
      onClickCapture={(event) => swiped.current && event.stopPropagation()}
    >
      {slides.map((slot, i) => (
        <div
          key={slot.label}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out-expo",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Photo slot={slot} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full" />
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 w-[15%] cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
          />
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 w-[15%] cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream"
          />
          <ol className="absolute inset-x-0 bottom-10 flex justify-center gap-1.5">
            {slides.map((slot, i) => (
              <li key={slot.label}>
                <button
                  type="button"
                  aria-label={`Photo ${i + 1} of ${count}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "block size-1.5 rounded-full cursor-pointer transition-colors duration-300",
                    i === index ? "bg-cream" : "bg-cream/35 hover:bg-cream/60",
                  )}
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
