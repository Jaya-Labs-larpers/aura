import type { Metadata } from "next";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events - AURA",
};

export default function EventsPage() {
  return (
    <>
      {/* HERO / TITLE SECTION */}
      <RevealGroup as="section" className="py-24 px-6 text-center flex items-center justify-center min-h-[320px] bg-[#083B2C]">
        <RevealItem className="max-w-3xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4 text-[#F2FFF7]">EVENTS &amp; CELEBRATIONS</h1>
          <p className="text-base md:text-lg text-emerald-100 font-light leading-relaxed tracking-wide md:leading-7">
            From intimate gatherings to exclusive celebrations, discover unique culinary experiences tailored to your
            moments.
          </p>
        </RevealItem>
      </RevealGroup>

      {/* CONTENT SECTION */}
      <div className="py-20 px-6 lg:px-20 [&>:not([hidden])~:not([hidden])]:mt-24 bg-[#F2FFF7]">
        {/* PRIVATE DINING SECTION */}
        <RevealGroup className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealItem from="left" className="relative w-full transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#F2FFF7]/50">
              <img
                src="/images/events/private-dining.jpg"
                alt="Private Dining"
                className="w-full h-[350px] md:h-[420px] object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
          </RevealItem>

          <RevealItem
            from="right"
            className="flex flex-col items-start text-left transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">PRIVATE DINING</h2>

            <p className="text-gray-700 text-base md:text-lg font-light leading-relaxed mb-6 md:leading-7">
              For guests seeking a more intimate setting to celebrate a birthday, anniversary, or host a business lunch
              or cocktail event, AURA&apos;s private dining spaces offer a comfortable and well-appointed option. Our team
              can arrange menu selections, beverage pairings, and event details such as seating, lighting, and decoration
              to suit your occasion. AURA is also available for exclusive use for weddings and corporate events,
              accommodating up to 120 guests.
            </p>

            <Link
              href="/contact"
              className="inline-block py-3 px-8 rounded-xl font-medium text-sm text-white transition shadow-lg hover:opacity-90 bg-[#083B2C]"
            >
              CONTACT US
            </Link>
          </RevealItem>
        </RevealGroup>

        {/* EVENT CATERING SECTION */}
        <RevealGroup className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealItem
            from="left"
            className="flex flex-col items-start text-left order-2 lg:order-1 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">EVENT CATERING</h2>

            <p className="text-gray-700 text-base md:text-lg font-light leading-relaxed mb-6 md:leading-7">
              AURA offers off-site catering for events at your home or a venue of your choice. Our kitchen and service
              team bring the same standard of food and service found at the restaurant to create a well-organized and
              enjoyable experience for you and your guests. To discuss your event, please contact us at {CONTACT.phone}{" "}
              or{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-emerald-800 underline font-medium">
                {CONTACT.email}
              </a>
              .
            </p>

            <Link
              href="/contact"
              className="inline-block py-3 px-8 rounded-xl font-medium text-sm text-white transition shadow-lg hover:opacity-90 bg-[#083B2C]"
            >
              CONTACT US
            </Link>
          </RevealItem>

          <RevealItem
            from="right"
            className="relative w-full order-1 lg:order-2 transition-all duration-1000 ease-out transform will-change-[opacity,transform]"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#F2FFF7]/50">
              <img
                src="/images/events/event-catering.jpg"
                alt="Event Catering"
                className="w-full h-[350px] md:h-[420px] object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
