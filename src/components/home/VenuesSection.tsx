import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export function VenuesSection() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-20 overflow-hidden text-[#FCFAF6] bg-[#083B2C] transition-colors duration-700 ease-out">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest uppercase text-[#F2FFF7]">OUR VENUES</h2>
          <div className="w-16 md:w-20 h-[2px] bg-[#D92B78] mx-auto mt-3 md:mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <Reveal
            from="left"
            className="flex flex-col items-start text-left transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
          >
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#F2FFF7] leading-snug sm:leading-8 md:leading-10">
              AURA PHNOM PENH
              <br />
            </h3>

            <p className="mt-3 md:mt-6 text-[#D8E0DC] text-xs sm:text-sm md:text-base font-light leading-relaxed sm:leading-5 md:leading-6">
              AURA offers an elevated rooftop dining experience overlooking the Phnom Penh skyline. Featuring a vibrant
              open-air lounge and sophisticated indoor seating,
            </p>

            <p className="mt-2.5 md:mt-4 text-[#D8E0DC] text-xs sm:text-sm md:text-base font-light leading-relaxed sm:leading-5 md:leading-6">
              AURA pairs refined Khmer heritage and international cuisine with artisanal cocktails. Open for Lunch , dinner
              and late-night lounge service, it is ideal for sunset cocktails, intimate dinners, and private events.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/menu"
                className="relative group overflow-hidden rounded-full px-6 sm:px-8 py-3 border border-[#D92B78] text-[#D92B78] text-xs sm:text-sm font-medium tracking-widest transition-all duration-500 shadow-lg inline-flex items-center justify-center flex-1 sm:flex-none"
              >
                <span className="absolute inset-0 w-full h-full bg-[#D92B78] transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0"></span>
                <span className="relative z-10 transition-colors duration-500 text-[#D92B78] group-hover:text-[#102823]">OVERVIEW</span>
              </Link>

              <Link
                href="/reservation"
                className="relative group overflow-hidden rounded-full px-6 sm:px-8 py-3 bg-[#D92B78] text-[#102823] text-xs sm:text-sm font-medium tracking-widest transition-all duration-500 shadow-lg inline-flex items-center justify-center flex-1 sm:flex-none"
              >
                <span className="absolute inset-0 w-full h-full bg-[#b82264] transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0"></span>
                <span className="relative z-10 transition-colors duration-500 text-[#102823]">BOOK NOW</span>
              </Link>
            </div>
          </Reveal>

          <Reveal
            from="right"
            className="relative w-full order-first lg:order-last transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
          >
            <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-[#D92B78]/20 bg-[#102823]/50 group">
              <img
                src="/images/home/venue-aura-phnom-penh.jpg"
                alt="Khmer Culinary Dish"
                className="w-full h-[240px] sm:h-[300px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
