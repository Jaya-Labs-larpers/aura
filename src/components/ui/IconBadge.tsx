import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeIcon = (props: { className?: string }) => ReactNode;

/**
 * A stroke icon in a filled cream circle, the move from AURA's corporate
 * events deck, recoloured to the site's cream-on-jungle button. One size on
 * every breakpoint (30px circle, 16px icon), so the space tags, the Event
 * Services grid and anything else that uses it line up the same on phone,
 * laptop and desktop.
 */
export function IconBadge({ icon: Icon, tone = "bright", className }: { icon: BadgeIcon; tone?: "bright" | "muted"; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-[30px] shrink-0 items-center justify-center rounded-full text-jungle",
        tone === "muted" ? "bg-cream/75" : "bg-cream",
        className,
      )}
    >
      <Icon className="size-4" />
    </span>
  );
}
