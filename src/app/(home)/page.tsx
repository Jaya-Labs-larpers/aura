import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ReserveCard } from "@/components/sections/Bands";
import { HeroFilm } from "@/components/sections/HeroFilm";
import { Identity } from "@/components/sections/Identity";
import { Location } from "@/components/sections/Location";
import { MediaCard } from "@/components/sections/MediaCard";
import { Offers } from "@/components/sections/Offers";
import { PhotoStrip } from "@/components/sections/PhotoStrip";
import { TripadvisorBand } from "@/components/sections/Tripadvisor";
import { HOME } from "@/content/home";
import { CONTACT, SITE, SOCIALS } from "@/content/site";

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
  sameAs: SOCIALS.map((social) => social.href),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
      <HeroFilm {...HOME.hero} />
      <Identity {...HOME.identity} />
      <PhotoStrip slots={HOME.strip} />
      <MediaCard id="taste" {...HOME.taste} />
      <MediaCard id="lunch" {...HOME.lunch} />
      <Offers heading={HOME.offersHeading} offers={HOME.offers} />
      {/* Unset background: shows the body's patterned green ground. */}
      <div className="h-6 md:h-8" aria-hidden="true" />
      <TripadvisorBand />
      <div className="h-6 md:h-8" aria-hidden="true" />
      <Location {...HOME.location} />
      {/* Reservation CTA + footer scroll up over the sticky Location photo; on desktop
          they combine into one full-screen close, on mobile the footer alone fills it.
          md:min-h is 100dvh minus the solid header's height (py-3 + h-10 button = 4rem),
          so the close stops flush under the header instead of sliding behind it. */}
      <div className="flex flex-col md:min-h-[calc(100dvh-4rem)]">
        <ReserveCard {...HOME.reserve} />
        <Footer />
      </div>
    </>
  );
}
