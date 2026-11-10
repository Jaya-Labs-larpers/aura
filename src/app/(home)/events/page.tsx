import type { Metadata } from "next";
import { EventActions } from "@/components/features/events/EventActions";
import { EventEnquiry } from "@/components/features/events/EventEnquiry";
import { Footer } from "@/components/layout/Footer";
import { EventSplit } from "@/components/sections/EventSplit";
import { Eyebrow } from "@/components/ui/Buttons";
import { EVENTS } from "@/content/events";

export const metadata: Metadata = {
  title: EVENTS.meta.title,
  description: EVENTS.meta.description,
};

/** Laid out like Amazónico's private dining page: split sections from the top, photo side alternating. */
export default function EventsPage() {
  const { intro, spaces, catering } = EVENTS;
  return (
    <>
      <EventSplit
        as="h1"
        title={intro.title}
        body={intro.body}
        slides={intro.slides}
        actions={<EventActions enquire={intro.enquire} call={intro.call} />}
      />
      <SpacesHeader />
      {spaces.items.map((space, i) => (
        <EventSplit key={space.value} {...space} flip={i % 2 === 0} />
      ))}
      <EventSplit {...catering} flip={spaces.items.length % 2 === 0} />
      <EventEnquiry {...EVENTS.enquiry} />
      <Footer />
    </>
  );
}

/** Opens the spaces run: section line, then the whole-venue buyout option. Static, like the splits. */
function SpacesHeader() {
  const { eyebrow, title, text, buyout } = EVENTS.spaces;
  return (
    <section className="px-5 py-[clamp(60px,calc(-8.38px+8.9153vw),120px)] text-center text-cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(28px,calc(19px+1.2vw),40px)] leading-[1.2] font-normal tracking-[0.01em]">
          {title}
        </h2>
        <p className="mt-3 text-[15px] leading-[1.47] text-cream/60">{text}</p>
        <div className="mt-10 border-t border-cream/15 pt-8 text-[15px] leading-[1.47] text-cream/60">
          <p className="font-display text-xl text-cream">{buyout.title}</p>
          <Eyebrow className="mt-2 tracking-[0.2em]">{buyout.tags.join(" · ")}</Eyebrow>
          <p className="mt-3">{buyout.text}</p>
        </div>
      </div>
    </section>
  );
}
