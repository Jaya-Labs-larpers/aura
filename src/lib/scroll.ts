"use client";

import { useEffect, type RefObject } from "react";

/**
 * One shared requestAnimationFrame loop for every scroll-driven effect.
 * Subscribers write styles directly to the DOM, so scrolling never re-renders React.
 */
type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let queued = false;

function flush() {
  queued = false;
  subscribers.forEach((run) => run());
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(flush);
}

export function subscribeScroll(run: Subscriber) {
  if (subscribers.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  subscribers.add(run);
  run();
  return () => {
    subscribers.delete(run);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Calls `onFrame` with how far the element has travelled through the viewport:
 * 0 when its top meets the viewport bottom, 1 when its bottom leaves the viewport top.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onFrame: (progress: number, rect: DOMRect) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return subscribeScroll(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      onFrame(clamp((vh - rect.top) / (vh + rect.height)), rect);
    });
  }, [ref, onFrame]);
}
