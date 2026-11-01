import type { Metadata } from "next";
import { AwardBand, CtaBand, GettingHereBand, Section } from "@/components/sections/Bands";
import { HeroFilm } from "@/components/sections/HeroFilm";
import { PhotoStrip } from "@/components/sections/PhotoStrip";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { StackedCards } from "@/components/sections/StackedCards";
import { HOME } from "@/content/home";

export const metadata: Metadata = {
  title: { absolute: HOME.meta.title },
  description: HOME.meta.description,
};

export default function HomePage() {
  return (
    <>
      <HeroFilm {...HOME.hero} />
      <Section tone="forest">
        <SplitFeature feature={HOME.rooftop} />
      </Section>
      <StackedCards heading={HOME.cardsHeading} cards={HOME.cards} />
      <Section tone="jungle">
        <SplitFeature feature={HOME.chefAndTeam} reverse />
      </Section>
      <GettingHereBand link={HOME.gettingHere} />
      <PhotoStrip slots={HOME.strip} />
      <AwardBand {...HOME.award} />
      <CtaBand {...HOME.booking} />
    </>
  );
}
