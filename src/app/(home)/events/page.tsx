import type { Metadata } from "next";
import { EventActions } from "@/components/features/events/EventActions";
import { EventEnquiry } from "@/components/features/events/EventEnquiry";
import { EventTags } from "@/components/features/events/EventTags";
import { EventGrid } from "@/components/sections/EventGrid";
import { EventHero } from "@/components/sections/EventHero";
import { EventSplit } from "@/components/sections/EventSplit";
import { Eyebrow } from "@/components/ui/Buttons";
import { EVENTS } from "@/content/events";

export const metadata: Metadata = {
  title: EVENTS.meta.title,
  description: EVENTS.meta.description,
};

/** Opens like Zuma's private dining page: a short full-bleed photo hero, then Amazónico-style split sections, photo side alternating. */
export default function EventsPage() {
  const { intro, spaces, occasions, included } = EVENTS;
  return (
    <>
      {/* First screen, like Zuma's: photo, title, intro and actions, and nothing of the next section. The hero
          takes whatever height the intro leaves; on very short screens it keeps a floor and the block scrolls. */}
      <div className="flex min-h-svh flex-col">
        <EventHero title={intro.title} slot={intro.slides[0]} className="min-h-[260px] flex-1" />
        <IntroCopy />
      </div>
      <SpacesHeader />
      {spaces.items.map((space, i) => (
        <EventSplit key={space.value} {...space} flip={i % 2 === 0} />
      ))}
      <EventGrid {...occasions} />
      <EventGrid {...included} />
      <EventEnquiry {...EVENTS.enquiry} />
    </>
  );
}

/**
 * Below the hero, laid out like Zuma's private dining intro: a bold lead
 * paragraph (plus a lighter one on the spaces) on the left; on the right a
 * short value-proposition paragraph with the Enquire / Call buttons under
 * it. Padding is kept tight (not the usual vw-scaling section padding) so
 * the hero above keeps most of the first screen.
 */
function IntroCopy() {
  const { body, valueProp, enquire, call } = EVENTS.intro;
  return (
    <section className="grid gap-8 px-5 py-6 text-cream md:grid-cols-[3fr_2fr] md:gap-16 md:px-[30px] md:py-12">
      <div>
        <p className="text-balance font-display text-[clamp(17px,calc(14px+1.2vw),26px)] leading-[1.3] font-normal tracking-[0.01em]">
          {body[0]}
        </p>
        {body[1] && <p className="mt-4 text-pretty text-[15px] leading-[1.47] text-cream/60">{body[1]}</p>}
      </div>
      <div className="md:pt-2">
        <p className="text-pretty text-[15px] leading-[1.47] text-cream/60">{valueProp}</p>
        <EventActions enquire={enquire} call={call} />
      </div>
    </section>
  );
}

/** Opens the spaces run: section line, then the whole-venue buyout option. Static, like the splits. */
function SpacesHeader() {
  const { eyebrow, title, text, buyout } = EVENTS.spaces;
  return (
    <section className="px-5 py-[clamp(60px,calc(-8.38px+8.9153vw),120px)] text-center text-cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,calc(19px+1.2vw),40px)] leading-[1.2] font-normal tracking-[0.01em] text-balance">
          {title}
        </h2>
        <p className="mt-3 text-pretty text-[15px] leading-[1.47] text-cream/60">{text}</p>
        <div className="mt-10 border-t border-cream/15 pt-8 text-[15px] leading-[1.47] text-cream/60">
          <p className="font-display text-xl text-balance text-cream">{buyout.title}</p>
          <EventTags tags={buyout.tags} tone="muted" className="mt-2 justify-center" />
          <p className="mt-3">{buyout.text}</p>
        </div>
      </div>
    </section>
  );
}
