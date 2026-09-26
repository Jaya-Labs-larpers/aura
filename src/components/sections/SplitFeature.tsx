import type { Feature } from "@/content/types";
import { Eyebrow, Pill } from "@/components/ui/Buttons";
import { Parallax } from "@/components/ui/Parallax";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface SplitFeatureProps {
  feature: Feature;
  /** Put the media on the right. */
  reverse?: boolean;
}

/** Media and text side by side; the media wipes up into view and drifts on scroll. */
export function SplitFeature({ feature, reverse }: SplitFeatureProps) {
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-12 md:gap-16">
      <Reveal variant="clip" className={cn("md:col-span-7", reverse && "md:order-2")}>
        <Parallax className="aspect-[4/5] md:aspect-[6/5]">
          <Placeholder slot={feature.slot} className="h-full w-full" />
        </Parallax>
      </Reveal>

      <div className={cn("md:col-span-5", reverse && "md:order-1")}>
        {feature.eyebrow && (
          <Reveal variant="fade">
            <Eyebrow>{feature.eyebrow}</Eyebrow>
          </Reveal>
        )}
        <RevealText text={feature.title} className="mt-4 font-display text-4xl leading-[1.1] md:text-5xl" />
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed opacity-80">
          {feature.body.map((paragraph, i) => (
            <Reveal key={i} as="p" delay={150 + i * 100}>
              {paragraph}
            </Reveal>
          ))}
        </div>
        {feature.cta && (
          <Reveal delay={400} className="mt-8">
            <Pill href={feature.cta.href} tone="outline">
              {feature.cta.label}
            </Pill>
          </Reveal>
        )}
      </div>
    </div>
  );
}
