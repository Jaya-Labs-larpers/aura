import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About - AURA",
};

export default function AboutPage() {
  return (
    <>
      {/* SECTION 1: Our Mission (Dark Background) */}
      <RevealGroup
        as="section"
        className="pt-28 pb-16 px-6 text-center flex flex-col items-center justify-center min-h-[320px] bg-[#083B2C]"
      >
        <RevealItem className="max-w-3xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 text-[#F2FFF7]">Our Mission</h1>
          <div className="w-16 h-[2px] bg-[#D92B78] mb-4"></div>
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed tracking-wide md:leading-6">
            Aura&apos;s mission is to provide you with an unforgettable experience, second to none.
            <br />
            Connecting families and friends so you can celebrate and enjoy life&apos;s moments.
          </p>
        </RevealItem>
      </RevealGroup>

      {/* WHERE IT ALL BEGAN SECTION */}
      <section className="py-16 px-6 lg:px-12 text-gray-900 bg-[#F2FFF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal
            from="left"
            className="lg:col-span-6 flex flex-col items-start text-left transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D92B78] mb-2">Our History</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#17352F] leading-tight mb-2 md:leading-9">Where it all began</h2>
            <div className="w-12 h-[2px] bg-[#D92B78] mb-4"></div>

            <p className="text-[#17352F] font-medium text-xs md:text-sm mb-3">
              AURA - Phnom Penh first opened its doors in December 2023.
            </p>

            <p className="text-[#5F6B66] text-xs md:text-sm font-light leading-relaxed md:leading-5">
              Located in the vibrant Bassac Lane neighborhood, the multi-level rooftop venue established itself as a
              premier restaurant and lounge experience known for its refined atmosphere, international charcoal-grilled
              cuisine, and curated signature cocktails.
            </p>
          </Reveal>

          <Reveal
            from="right"
            className="lg:col-span-6 relative w-full transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#D92B78]/30 bg-white">
              <img
                src="/images/about/where-it-all-began.jpg"
                alt="Where it all began"
                className="w-full h-[350px] md:h-[420px] object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR PHILOSOPHY SECTION */}
      <section className="py-16 px-6 lg:px-12 bg-[#F2FFF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal
            from="left"
            className="lg:col-span-6 relative w-full order-2 lg:order-1 transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#D92B78]/30 bg-white">
              <img
                src="/images/about/our-philosophy.jpg"
                alt="Our Philosophy"
                className="w-full h-[350px] md:h-[420px] object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
          </Reveal>

          <Reveal
            from="right"
            className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D92B78] mb-2">Our Standards</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#17352F] leading-tight mb-2 md:leading-9">Our Philosophy</h2>
            <div className="w-12 h-[2px] bg-[#D92B78] mb-4"></div>

            <p className="text-[#5F6B66] text-xs md:text-sm font-light leading-relaxed mb-3 md:leading-5">
              We believe that exceptional cuisine begins with exceptional ingredients. Our relationships with local
              farms, artisan producers, and sustainable fisheries ensure that every plate showcases the finest seasonal
              offerings.
            </p>

            <p className="text-[#5F6B66] text-xs md:text-sm font-light leading-relaxed md:leading-5">
              But ingredients are only the beginning. Our culinary team approaches each dish as a canvas, balancing
              flavors, textures, and visual appeal to create compositions that engage all the senses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3: What Sets Us Apart */}
      <RevealGroup as="section" className="py-20 px-6 bg-[#083B2C]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <RevealItem
            className="text-center mb-12 transition-all duration-1000 ease-out transform text-[#F2FFF7]"
            hiddenClassName="opacity-0 translate-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">What Sets Us Apart</h2>
            <div className="w-12 h-[2px] bg-[#D92B78] mx-auto"></div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <RevealItem className="text-gray-900 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center transition-all duration-1000 ease-out transform border border-[#D92B78]/30 bg-[#F2FFF7] delay-200">
              <div className="w-12 h-12 rounded-full bg-[#FCFAF6] shadow-xs border border-[#D92B78]/30 flex items-center justify-center mb-6 text-xl text-[#D92B78]">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#17352F]">Sustainable Sourcing</h3>
              <div className="w-8 h-[1px] bg-[#D92B78] mb-3"></div>
              <p className="text-[#5F6B66] text-xs font-light leading-relaxed">
                We partner with local farms and sustainable suppliers, ensuring our ingredients are fresh, ethical, and
                environmentally responsible.
              </p>
            </RevealItem>

            <RevealItem className="text-gray-900 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center transition-all duration-1000 ease-out transform border border-[#D92B78]/30 bg-[#F2FFF7] delay-[400ms]">
              <div className="w-12 h-12 rounded-full bg-[#FCFAF6] shadow-xs border border-[#D92B78]/30 flex items-center justify-center mb-6 text-xl text-[#D92B78]">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#17352F]">Expert Team</h3>
              <div className="w-8 h-[1px] bg-[#D92B78] mb-3"></div>
              <p className="text-[#5F6B66] text-xs font-light leading-relaxed">
                Our culinary and service teams bring decades of combined experience, trained in some of the world&apos;s
                most prestigious kitchens.
              </p>
            </RevealItem>

            <RevealItem className="text-gray-900 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center transition-all duration-1000 ease-out transform border border-[#D92B78]/30 bg-[#F2FFF7] delay-[600ms]">
              <div className="w-12 h-12 rounded-full bg-[#FCFAF6] shadow-xs border border-[#D92B78]/30 flex items-center justify-center mb-6 overflow-hidden p-2">
                <img
                  src="/images/about/tripadvisor-travelers-choice.png"
                  alt="Tripadvisor Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#17352F]">Tripadvisor Travelers&apos; Choice Awards</h3>
              <div className="w-8 h-[1px] bg-[#D92B78] mb-3"></div>
              <div className="mt-2">
                <span className="inline-block text-xl font-bold text-[#D92B78] tracking-wider">2025</span>
              </div>
            </RevealItem>
          </div>
        </div>
      </RevealGroup>
    </>
  );
}
