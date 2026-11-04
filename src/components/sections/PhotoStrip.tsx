"use client";

import { useEffect, useRef } from "react";
import type { Slot } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { prefersReducedMotion } from "@/lib/scroll";

interface PhotoStripProps {
  slots: Slot[];
  /** Auto-scroll speed in px per frame. */
  speed?: number;
}

/**
 * Endless horizontal strip that drifts on its own, pauses on hover and can be
 * dragged or flicked (mouse and touch). The list is rendered twice so it loops.
 */
export function PhotoStrip({ slots, speed = 0.45 }: PhotoStripProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;

    const auto = prefersReducedMotion() ? 0 : speed;
    let x = 0;
    let velocity = 0;
    let lastX = 0;
    let dragging = false;
    let hovering = false;
    let visible = false;
    let frame = 0;

    const tick = () => {
      if (!dragging) {
        if (!hovering) x -= auto;
        x += velocity;
        velocity *= 0.94;
        if (Math.abs(velocity) < 0.02) velocity = 0;
      }
      const loop = tr.scrollWidth / 2;
      if (loop > 0) x = ((x % loop) - loop) % loop;
      tr.style.transform = `translate3d(${x}px, 0, 0)`;
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    observer.observe(vp);

    const onDown = (event: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastX = event.clientX;
      vp.setPointerCapture(event.pointerId);
      vp.dataset.dragging = "";
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      x += dx;
      velocity = dx;
    };
    const onUp = () => {
      dragging = false;
      delete vp.dataset.dragging;
    };
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onUp);
    vp.addEventListener("pointerenter", onEnter);
    vp.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onUp);
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
    };
  }, [speed]);

  return (
    <Reveal as="section" variant="fade" className="overflow-hidden py-4 text-cream">
      <div
        ref={viewport}
        className="cursor-grab touch-pan-y select-none data-dragging:cursor-grabbing"
      >
        <div ref={track} className="flex w-max gap-4 will-change-transform">
          {[...slots, ...slots].map((slot, i) => (
            <div
              key={i}
              aria-hidden={i >= slots.length || undefined}
              className="group aspect-[5/4] w-[72vw] shrink-0 overflow-hidden bg-moss sm:w-[44vw] lg:w-[34vw] lg:max-w-[560px]"
            >
              <Photo
                slot={slot}
                sizes="(min-width: 1024px) min(34vw, 560px), (min-width: 640px) 44vw, 72vw"
                className="h-full w-full transition-transform duration-1000 ease-out-expo group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
