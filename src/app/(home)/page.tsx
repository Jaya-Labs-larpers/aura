import type { Metadata } from "next";
import { HeroFilm } from "@/components/sections/HeroFilm";
import { Identity } from "@/components/sections/Identity";
import { Location } from "@/components/sections/Location";
import { Offers } from "@/components/sections/Offers";
import { PhotoStrip } from "@/components/sections/PhotoStrip";
import { StackedCards } from "@/components/sections/StackedCards";
import { Story } from "@/components/sections/Story";
import { HOME } from "@/content/home";
import { CONTACT, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: HOME.meta.title },
  description: HOME.meta.description,
};

// Structured data for Google's rich results (schema.org Restaurant).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  description: HOME.meta.description,
  servesCuisine: "Cambodian",
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: { "@type": "PostalAddress", ...CONTACT.postal },
  hasMap: CONTACT.googleMaps,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
      <HeroFilm {...HOME.hero} />
      <Identity {...HOME.identity} />
      <PhotoStrip slots={HOME.strip} />
      <StackedCards heading={HOME.cardsHeading} cards={HOME.cards} />
      <Offers offers={HOME.offers} />
      <Story {...HOME.story} />
      <Location {...HOME.location} />
    </>
  );
}
