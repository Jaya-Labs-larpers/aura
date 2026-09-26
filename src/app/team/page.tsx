import type { Metadata } from "next";
import { CtaBand, Section } from "@/components/sections/Bands";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TEAM } from "@/content/pages";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <PageHero {...TEAM.hero} />
      <Section className="space-y-28 md:space-y-40">
        {TEAM.features.map((feature, i) => (
          <SplitFeature key={feature.title} feature={feature} reverse={i % 2 === 1} />
        ))}
      </Section>
      <CtaBand
        title={TEAM.join.title}
        text={TEAM.join.text}
        cta={{ label: "Send your CV", href: `mailto:${CONTACT.email}?subject=Careers` }}
      />
    </>
  );
}
