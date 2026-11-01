"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant = "up" | "fade" | "blur" | "clip";

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, shown };
}

interface RevealProps {
  as?: ElementType;
  variant?: Variant;
  /** Delay in ms, for staggering siblings. */
  delay?: number;
  className?: string;
  children?: ReactNode;
}

/** Animates its content in the first time it scrolls into view. */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className, children }: RevealProps) {
  const { ref, shown } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-shown={shown || undefined}
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

interface RevealTextProps {
  as?: ElementType;
  text: string;
  delay?: number;
  className?: string;
}

/** Headline that rises word by word, as on the Amazónico hero and section titles. */
export function RevealText({ as: Tag = "h2", text, delay = 0, className }: RevealTextProps) {
  const { ref, shown } = useInView<HTMLElement>(0.3);
  const words = text.split(" ");
  return (
    <Tag
      ref={ref}
      aria-label={text}
      data-shown={shown || undefined}
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="word">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
