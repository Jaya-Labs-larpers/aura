import type { ReactNode } from "react";
import { LockIcon, MicIcon, SnowflakeIcon, SunIcon, UmbrellaIcon, UsersIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type TagIcon = (props: { className?: string }) => ReactNode;

/**
 * Matches a capacity/feature tag to the icon used for it in AURA's
 * corporate events deck (capacity, air-conditioned, KTV, covered,
 * semi-private/private, outdoor). Unrecognised tags render as text only.
 */
function iconFor(tag: string): TagIcon | null {
  const t = tag.replace(/ /g, " ").toLowerCase();
  if (t.startsWith("up to") || t.includes("seated") || t.includes("standing")) return UsersIcon;
  if (t.includes("air-conditioned")) return SnowflakeIcon;
  if (t.includes("ktv")) return MicIcon;
  if (t.includes("covered")) return UmbrellaIcon;
  if (t.includes("private")) return LockIcon;
  if (t.includes("outdoor")) return SunIcon;
  return null;
}

interface EventTagsProps {
  tags: readonly string[];
  className?: string;
  /** "bright" (default) for the space splits' full-cream tags; "muted" for the dimmer whole-venue buyout line. */
  tone?: "bright" | "muted";
}

/**
 * Capacity/feature line under a space title, each tag flagged with its icon
 * in a cream badge — the same move as AURA's corporate events deck, where
 * every tag icon sits in a filled circle, recoloured to the site's own
 * cream-on-jungle button (see `Pill`/`SubmitButton`) so it pops off the dark ground.
 */
export function EventTags({ tags, className, tone = "bright" }: EventTagsProps) {
  return (
    <div className={cn("mt-4 flex flex-wrap items-center gap-x-5 gap-y-3", className)}>
      {tags.map((tag) => {
        const Icon = iconFor(tag);
        return (
          <span key={tag} className="inline-flex items-center gap-2.5">
            {Icon && (
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-jungle",
                  tone === "muted" ? "bg-cream/75" : "bg-cream",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            )}
            <span
              className={cn(
                "text-[11px] font-medium tracking-[0.2em] text-balance uppercase",
                tone === "muted" ? "text-cream/70" : "text-cream",
              )}
            >
              {tag}
            </span>
          </span>
        );
      })}
    </div>
  );
}
