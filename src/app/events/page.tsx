import type { Metadata } from "next";
import { CtaBand, Section } from "@/components/sections/Bands";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStrip } from "@/components/sections/PhotoStrip";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { EVENTS } from "@/content/pages";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHero {...EVENTS.hero} />
      <Section className="space-y-28 md:space-y-40">
        {EVENTS.features.map((feature, i) => (
          <SplitFeature key={feature.title} feature={feature} reverse={i % 2 === 1} />
        ))}
      </Section>
      <PhotoStrip slots={EVENTS.strip} />
      <CtaBand
        title="Plan your event"
        text={`Tell us about your occasion — call ${CONTACT.phone} or send an enquiry.`}
        cta={{ label: "Enquire", href: "/contact" }}
      />
    </>
  );
}
