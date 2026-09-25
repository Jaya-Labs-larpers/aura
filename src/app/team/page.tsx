import type { Metadata } from "next";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Team - AURA",
};

export default function TeamPage() {
  return (
    <>
      {/* HERO / TITLE SECTION */}
      <RevealGroup
        as="section"
        className="pt-28 pb-16 px-6 text-center flex flex-col items-center justify-center min-h-[320px] bg-[#083B2C]"
      >
        <RevealItem className="max-w-3xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 text-[#F2FFF7]">Our Team</h1>
          <div className="w-16 h-[2px] bg-[#D92B78] mb-4"></div>
          <p className="text-sm md:text-base text-emerald-100 font-light leading-relaxed tracking-wide md:leading-6">
            Meet the passionate professionals who bring Aura&apos;s culinary vision to life every day.
          </p>
        </RevealItem>
      </RevealGroup>

      {/* TEAM MAIN SECTION */}
      <div className="py-16 px-6 lg:px-12 bg-[#F2FFF7]">
        <div className="max-w-7xl mx-auto [&>:not([hidden])~:not([hidden])]:mt-16">
          {/* SECTION 1: HEART OF THE HOUSE */}
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <RevealItem
              from="left"
              className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl bg-gray-300 transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
            >
              <img
                src="/images/team/heart-of-the-house.jpg"
                alt="Heart of the House - Culinary Team"
                className="w-full h-[350px] md:h-[420px] object-cover"
              />
            </RevealItem>

            <RevealItem
              from="right"
              className="lg:col-span-6 [&>:not([hidden])~:not([hidden])]:mt-4 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D92B78]">The Culinary Team</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">HEART OF THE HOUSE</h2>
              <div className="w-12 h-[2px] bg-[#D92B78] mb-2"></div>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed md:leading-5">
                Every dish that leaves Aura&apos;s kitchen reflects a simple philosophy: Cambodian cuisine is a living
                heritage, not a relic of nostalgia. Our culinary team is led by chefs trained in both traditional Khmer
                kitchens and international fine dining, blending generations of technique with a contemporary
                perspective. Signature dishes such as amok, lok lak, and saraman are reimagined using methods that honor
                their origins while elevating them for the modern table.
              </p>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed md:leading-5">
                Long before our guests arrive, this team is hard at work behind the scenes sourcing the freshest
                ingredients at dawn, refining every sauce and plate, and maintaining the same exacting standards whether
                serving an intimate table of two or a gala of two hundred. Precision, discipline, and craftsmanship define
                the kitchen at Aura.
              </p>
            </RevealItem>
          </RevealGroup>

          {/* SECTION 2: FRONT OF HOUSE */}
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <RevealItem
              from="left"
              className="lg:col-span-6 [&>:not([hidden])~:not([hidden])]:mt-4 order-2 lg:order-1 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D92B78]">
                The Host, Service, &amp; Bar Team
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">FRONT OF HOUSE</h2>
              <div className="w-12 h-[2px] bg-[#D92B78] mb-2"></div>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed md:leading-5">
                If the kitchen is Aura&apos;s heart, our front-of-house team is its voice. From a warm welcome at the door
                to the final farewell, our servers, bartenders, and hosts are trained in both authentic Khmer hospitality
                and international service standards. The team is attentive without being intrusive anticipating guest
                needs, reading the moment, and ensuring every visit feels considered, whether it is a guest&apos;s first
                time with us or a return to their favorite table.
              </p>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed md:leading-5">
                From our mixologists crafting Aura&apos;s signature cocktails to the seamless coordination required to
                manage a full house on a Friday evening, the service team delivers hospitality that feels effortless the
                result of meticulous care behind the scenes.
              </p>
            </RevealItem>

            <RevealItem
              from="right"
              className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl bg-gray-300 order-1 lg:order-2 transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
            >
              <img
                src="/images/team/front-of-house.jpg"
                alt="Front of House - Service Team"
                className="w-full h-[350px] md:h-[420px] object-cover"
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </div>

      {/* JOIN OUR TEAM SECTION */}
      <RevealGroup as="section" className="py-20 px-6 text-center text-white bg-[#083B2C]">
        <RevealItem className="max-w-3xl mx-auto flex flex-col items-center [&>:not([hidden])~:not([hidden])]:mt-4 transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">Join Our Team</h2>
          <div className="w-12 h-[2px] bg-[#D92B78]"></div>
          <p className="text-xs md:text-sm text-emerald-100 font-light leading-relaxed tracking-wide max-w-xl md:leading-5">
            We&apos;re always looking for talented individuals who share our passion for culinary excellence. If you&apos;re
            interested in joining the Aura family, we&apos;d love to hear from you.
          </p>
          <div className="pt-3">
            <a
              href="#"
              className="inline-block py-3.5 px-6 rounded-xl font-semibold tracking-wide text-xs text-white transition shadow-lg bg-[#D92B78] hover:bg-[#b52062]"
            >
              View Career Opportunities
            </a>
          </div>
        </RevealItem>
      </RevealGroup>
    </>
  );
}
