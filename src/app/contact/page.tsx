import type { Metadata } from "next";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapCard } from "@/components/contact/MapCard";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - AURA",
};

const ICON_WRAP = "p-3 rounded-full bg-white shadow-xs border border-[#D92B78]/30 text-[#D92B78] shrink-0";

export default function ContactPage() {
  return (
    <>
      {/* HERO / TITLE SECTION */}
      <RevealGroup
        as="section"
        className="pt-28 pb-16 px-6 text-center flex flex-col items-center justify-center min-h-[320px] bg-[#083B2C]"
      >
        <RevealItem className="max-w-3xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 text-[#F2FFF7]">Get in Touch</h1>
          <div className="w-16 h-[2px] bg-[#D92B78] mb-4"></div>
          <p className="text-sm md:text-base text-emerald-100 font-light leading-relaxed tracking-wide md:leading-6">
            We&apos;d love to hear from you. Whether you have questions, feedback, or special requests, our team is here
            to help.
          </p>
        </RevealItem>
      </RevealGroup>

      {/* CONTACT MAIN SECTION */}
      <RevealGroup className="py-16 px-6 lg:px-12 bg-[#F2FFF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: CONTACT INFORMATION & MAP */}
          <RevealItem
            from="left"
            className="lg:col-span-6 [&>:not([hidden])~:not([hidden])]:mt-6 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Contact Information</h2>
              <div className="w-12 h-[2px] bg-[#D92B78]"></div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Address</h3>
                <p className="text-gray-700 text-xs leading-relaxed">14 St 308, Tonle Bassac</p>
                <p className="text-gray-700 text-xs leading-relaxed">Chamkar Mon</p>
                <p className="text-gray-700 text-xs leading-relaxed">Phnom Penh 120101, Cambodia</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Phone</h3>
                <p className="text-gray-700 text-xs leading-relaxed">{CONTACT.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Email</h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Hours</h3>
                <p className="text-gray-700 text-xs leading-relaxed">Monday – Sunday: 11:30 AM – 01:00 AM</p>
              </div>
            </div>

            <MapCard />
          </RevealItem>

          {/* RIGHT COLUMN: SEND US A MESSAGE FORM */}
          <RevealItem
            from="right"
            className="lg:col-span-6 p-8 md:p-10 rounded-3xl shadow-xl text-white transition-all duration-1000 ease-out transform will-change-[opacity,transform] bg-[#083B2C] border border-[#D92B78]/20 delay-[400ms]"
          >
            <ContactForm />
          </RevealItem>
        </div>
      </RevealGroup>
    </>
  );
}
