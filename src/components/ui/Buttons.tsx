import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "solid" | "outline" | "dark";

const TONES: Record<Tone, string> = {
  solid: "border border-cream bg-cream text-jungle hover:border-forest hover:bg-forest hover:text-cream",
  outline: "border border-cream text-cream hover:border-bloom hover:bg-bloom hover:text-cream",
  dark: "bg-forest text-cream hover:bg-bloom",
};

interface PillProps {
  href: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

/** Rounded call-to-action, the site's primary button. */
export function Pill({ href, tone = "solid", className, children }: PillProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-full px-6 text-[13px] font-medium tracking-wide transition-colors duration-500 ease-out-expo",
    TONES[tone],
    className,
  );
  if (external) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** "See more" text link with an underline that redraws on hover. */
export function TextLink({ href, className, children }: Omit<PillProps, "tone">) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block pb-1 text-sm font-medium tracking-wide",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:opacity-35",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
      />
    </Link>
  );
}

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-[11px] font-medium tracking-[0.28em] uppercase opacity-70", className)}>{children}</p>;
}
