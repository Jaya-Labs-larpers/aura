"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/lib/scroll";

interface ParallaxProps {
  /** How far the content drifts, in percent of its height. */
  amount?: number;
  className?: string;
  children: ReactNode;
}

/** Clips its child and drifts it vertically while the frame crosses the viewport. */
export function Parallax({ amount = 10, className, children }: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const onFrame = useCallback(
    (progress: number) => {
      if (inner.current) inner.current.style.transform = `translate3d(0, ${(progress - 0.5) * -amount}%, 0) scale(1.15)`;
    },
    [amount],
  );
  useScrollProgress(frame, onFrame);

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-0 scale-[1.15] will-change-transform">
        {children}
      </div>
    </div>
  );
}
