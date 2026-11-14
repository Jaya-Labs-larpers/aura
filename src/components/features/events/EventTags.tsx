import { type BadgeIcon, IconBadge } from "@/components/ui/IconBadge";
import { FanIcon, LockIcon, MicIcon, ScreenIcon, SnowflakeIcon, SunIcon, UmbrellaIcon, UsersIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * Matches a capacity/feature tag to the icon used for it in AURA's
 * corporate events deck (capacity, air-conditioned, KTV, presentation
 * screen, covered, fan-cooled, semi-private/private, outdoor). Unrecognised
 * tags render as text only.
 */
function iconFor(tag: string): BadgeIcon | null {
  // Tags carry NBSPs so they never wrap; normalise them before matching.
  const t = tag.replace(/ /g, " ").toLowerCase();
  if (t.startsWith("up to") || t.includes("seated") || t.includes("standing")) return UsersIcon;
  if (t.includes("air-conditioned")) return SnowflakeIcon;
  if (t.includes("ktv")) return MicIcon;
  if (t.includes("screen")) return ScreenIcon;
  if (t.includes("covered")) return UmbrellaIcon;
  if (t.includes("fan")) return FanIcon;
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
 * in an `IconBadge`. Badge, type size and gaps are the same on every
 * breakpoint; at `md` the narrow text column simply wraps to more rows.
 */
export function EventTags({ tags, className, tone = "bright" }: EventTagsProps) {
  return (
    <div className={cn("mt-5 flex flex-wrap items-center gap-x-5 gap-y-3", className)}>
      {tags.map((tag) => {
        const Icon = iconFor(tag);
        return (
          <span key={tag} className="inline-flex items-center gap-2.5">
            {Icon && <IconBadge icon={Icon} tone={tone} />}
            <span
              className={cn(
                "text-[12px] font-medium tracking-[0.18em] text-balance uppercase",
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
