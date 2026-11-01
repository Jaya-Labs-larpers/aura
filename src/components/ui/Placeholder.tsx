import type { Slot } from "@/content/types";
import { cn } from "@/lib/cn";

type Kind = "photo" | "video";

interface PlaceholderProps {
  slot: Slot;
  className?: string;
  /** Hide the caption, e.g. for thumbnails or when a moving layer shows it separately. */
  bare?: boolean;
  kind?: Kind;
}

/**
 * Wireframe stand-in for a photo or video. Shows the slot name and the planned
 * file from `assets/photos/`, so the layout can be reviewed before images go in.
 */
export function Placeholder({ slot, className, bare, kind = "photo" }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${slot.label} (placeholder)`}
      className={cn("wireframe relative isolate flex items-center justify-center overflow-hidden", className)}
    >
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-60" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeOpacity="0.12" vectorEffect="non-scaling-stroke" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeOpacity="0.12" vectorEffect="non-scaling-stroke" />
      </svg>
      {!bare && <SlotCaption slot={slot} kind={kind} className="max-w-[80%] items-center text-center" />}
    </div>
  );
}

/**
 * The slot's label on its own. Media layers that zoom or drift render a bare
 * placeholder and pin this caption to a corner so it stays readable.
 */
export function SlotCaption({ slot, kind = "photo", className }: { slot: Slot; kind?: Kind; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col gap-1.5 opacity-70", className)}>
      <span className="w-fit rounded-full border border-current/25 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] uppercase">
        {kind}
      </span>
      <span className="text-xs font-medium tracking-wide">{slot.label}</span>
      {slot.photo && <span className="font-mono text-[10px] opacity-60">{slot.photo}</span>}
    </div>
  );
}

/** Corner position for a pinned caption over full-bleed media. */
export const CORNER = "pointer-events-none absolute bottom-5 left-5 items-start text-left md:bottom-8 md:left-8";
