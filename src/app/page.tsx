import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { VenuesSection } from "@/components/home/VenuesSection";
import { ChefsSection } from "@/components/home/ChefsSection";
import { GallerySection } from "@/components/home/GallerySection";

export const metadata: Metadata = {
  title: "Home - AURA",
};

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#17352F] text-[#FCFAF6]">
      <HeroCarousel />
      <WelcomeSection />
      <VenuesSection />
      <ChefsSection />
      <GallerySection />
    </div>
  );
}
