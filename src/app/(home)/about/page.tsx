import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { ABOUT } from "@/content/pages";

export const metadata: Metadata = {
  title: ABOUT.hero.title,
  description: ABOUT.hero.text,
};

/** Page hero, then the Wagyu story (modelled on the AURA steak-menu one-pager). */
export default function AboutPage() {
  return (
    <>
      <PageHero {...ABOUT.hero} />
      <IntroBlock {...ABOUT.beef} />
      <section className="bg-ivory px-5 py-24 text-ink md:px-8 md:py-36">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 md:gap-36">
          {ABOUT.beefFeatures.map((feature, i) => (
            <SplitFeature key={feature.title} feature={feature} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
