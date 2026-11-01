"use client";

import { createContext, useContext, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mirrors Alpine's `x-intersect.once="shown = true"`: returns a ref to observe
 * and a flag that flips to true the first time the element enters the viewport.
 */
export function useIntersectOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setShown(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

export type RevealDirection = "up" | "left" | "right";

const HIDDEN: Record<RevealDirection, string> = {
  up: "opacity-0 translate-y-12",
  left: "opacity-0 -translate-x-12",
  right: "opacity-0 translate-x-12",
};

const SHOWN: Record<RevealDirection, string> = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
};

interface RevealStyleProps {
  as?: ElementType;
  className?: string;
  from?: RevealDirection;
  /** Override the hidden-state classes (e.g. a smaller translate). */
  hiddenClassName?: string;
  shownClassName?: string;
  children: ReactNode;
}

/** Element that observes itself and animates in once (`x-data` + `x-intersect` + `:class` on one node). */
export function Reveal({
  as: Tag = "div",
  className,
  from = "up",
  hiddenClassName,
  shownClassName,
  children,
}: RevealStyleProps) {
  const { ref, shown } = useIntersectOnce<HTMLElement>();
  return (
    <Tag ref={ref} className={cn(className, shown ? (shownClassName ?? SHOWN[from]) : (hiddenClassName ?? HIDDEN[from]))}>
      {children}
    </Tag>
  );
}

const RevealContext = createContext(false);

interface RevealGroupProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Observed container whose descendants (`RevealItem`) animate when it enters the viewport. */
export function RevealGroup({ as: Tag = "div", className, children }: RevealGroupProps) {
  const { ref, shown } = useIntersectOnce<HTMLElement>();
  return (
    <Tag ref={ref} className={className}>
      <RevealContext.Provider value={shown}>{children}</RevealContext.Provider>
    </Tag>
  );
}

/** Animated child of a `RevealGroup`. */
export function RevealItem({
  as: Tag = "div",
  className,
  from = "up",
  hiddenClassName,
  shownClassName,
  children,
}: RevealStyleProps) {
  const shown = useContext(RevealContext);
  return (
    <Tag className={cn(className, shown ? (shownClassName ?? SHOWN[from]) : (hiddenClassName ?? HIDDEN[from]))}>
      {children}
    </Tag>
  );
}
