import type { Metadata } from "next";
import { AwardBand, CtaBand, Section } from "@/components/sections/Bands";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Reveal } from "@/components/ui/Reveal";
import { HOME } from "@/content/home";
import { ABOUT } from "@/content/pages";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero {...ABOUT.hero} />
      <IntroBlock {...ABOUT.mission} />
      <Section tone="forest" className="space-y-28 md:space-y-40">
        {ABOUT.features.map((feature, i) => (
          <SplitFeature key={feature.title} feature={feature} reverse={i % 2 === 1} />
        ))}
      </Section>
      <Section>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          {ABOUT.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 120} className="border-t border-cream/20 pt-8">
              <p className="font-mono text-xs opacity-50">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-3xl">{value.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed opacity-75">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <AwardBand {...HOME.award} />
      <CtaBand />
    </>
  );
}
