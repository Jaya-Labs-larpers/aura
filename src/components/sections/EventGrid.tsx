import type { EventGridItem } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Reveal";

interface EventGridProps {
  eyebrow: string;
  title: string;
  text?: string;
  items: readonly EventGridItem[];
}

/**
 * A centred intro over a left-aligned item grid, on the home page's plain
 * jungle ground. Used for the Events page's "Whatever the occasion" (4
 * items) and "Included with every event" (12 items) sections.
 */
export function EventGrid({ eyebrow, title, text, items }: EventGridProps) {
  return (
    <section className="px-5 py-[clamp(60px,calc(-8.38px+8.9153vw),120px)] text-cream">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="fade" className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(28px,calc(19px+1.2vw),40px)] leading-[1.2] font-normal tracking-[0.01em] text-balance">
            {title}
          </h2>
          {text && <p className="mt-3 text-[15px] leading-[1.47] text-cream/60">{text}</p>}
          <span aria-hidden className="mx-auto mt-7 block h-px w-14 bg-rim" />
        </Reveal>
        <div
          className={
            items.length > 4
              ? "mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
              : "mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {items.map((item, i) => (
            <Reveal key={item.title} variant="soft" delay={i * 60} className="border-t border-cream/15 pt-5">
              <p className="font-display text-xl leading-[1.3] text-balance text-cream">{item.title}</p>
              <p className="mt-2 text-pretty text-[15px] leading-[1.47] text-cream/60">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
