"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/** Inertia scrolling for the whole page; native scrolling when reduced motion is on. */
export function SmoothScroll() {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
  if (reduced) return null;
  return <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.9 }} />;
}
