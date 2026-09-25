"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeProps {
  show: boolean;
  className?: string;
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
  /** Leave duration in ms — the element unmounts after this. */
  leaveMs: number;
  children: ReactNode;
}

type Phase = "enterFrom" | "enterTo" | "leaveFrom" | "leaveTo";

/**
 * Mount/unmount transition equivalent to Alpine's `x-show` + `x-transition`
 * enter/leave classes.
 */
export function Fade({ show, className, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, leaveMs, children }: FadeProps) {
  const [prevShow, setPrevShow] = useState(show);
  const [mounted, setMounted] = useState(show);
  const [phase, setPhase] = useState<Phase>(show ? "enterTo" : "leaveTo");
  const ref = useRef<HTMLDivElement | null>(null);

  // Adjust state while rendering when `show` flips (React's recommended pattern).
  if (show !== prevShow) {
    setPrevShow(show);
    if (show) {
      setMounted(true);
      setPhase("enterFrom");
    } else {
      setPhase("leaveFrom");
    }
  }

  useEffect(() => {
    if (phase === "enterFrom" || phase === "leaveFrom") {
      const target: Phase = phase === "enterFrom" ? "enterTo" : "leaveTo";
      // Flush the "from" styles so the browser has a start point, then switch to
      // the "to" classes. Unlike requestAnimationFrame this also runs in background tabs.
      void ref.current?.offsetHeight;
      const timer = setTimeout(() => setPhase(target), 0);
      return () => clearTimeout(timer);
    }
    if (phase === "leaveTo") {
      const timer = setTimeout(() => setMounted(false), leaveMs);
      return () => clearTimeout(timer);
    }
  }, [phase, leaveMs]);

  if (!mounted) return null;

  const transition =
    phase === "enterFrom" ? cn(enter, enterFrom)
    : phase === "enterTo" ? cn(enter, enterTo)
    : phase === "leaveFrom" ? cn(leave, leaveFrom)
    : cn(leave, leaveTo);

  return (
    <div ref={ref} className={cn(className, transition)}>
      {children}
    </div>
  );
}
