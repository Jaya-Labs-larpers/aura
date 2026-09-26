import { AwardBand } from "@/components/sections/Bands";
import { HeroFilm } from "@/components/sections/HeroFilm";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { PhotoStrip } from "@/components/sections/PhotoStrip";
import { StackedCards } from "@/components/sections/StackedCards";
import { HOME } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <HeroFilm {...HOME.hero} />
      <IntroBlock {...HOME.intro} />
      <PhotoStrip slots={HOME.strip} />
      <StackedCards cards={HOME.cards} />
      <AwardBand {...HOME.award} />
    </>
  );
}
