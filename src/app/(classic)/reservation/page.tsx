import type { Metadata } from "next";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { CheckStatus } from "@/components/reservation/CheckStatus";
import { BookingForm } from "@/components/reservation/BookingForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservation - AURA",
};

const ICON_WRAP = "p-3 rounded-full bg-white shadow-xs border border-[#D92B78]/30 text-[#D92B78] shrink-0";

export default function ReservationPage() {
  return (
    <>
      {/* HERO / TITLE SECTION */}
      <RevealGroup
        as="section"
        className="pt-28 pb-16 px-6 text-center flex flex-col items-center justify-center min-h-[320px] bg-[#083B2C]"
      >
        <RevealItem className="max-w-3xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 text-[#F2FFF7]">Reserve Your Table</h1>
          <div className="w-16 h-[2px] bg-[#D92B78] mb-4"></div>
          <p className="text-sm md:text-base text-emerald-100 font-light leading-relaxed tracking-wide md:leading-6">
            Reserve your table at Aura Restaurant. Book online for an unforgettable fine dining experience. Limited seating
            available.
          </p>
        </RevealItem>
      </RevealGroup>

      {/* RESERVATION MAIN SECTION */}
      <RevealGroup className="py-16 px-6 lg:px-12 bg-[#F2FFF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN */}
          <RevealItem
            from="left"
            className="lg:col-span-6 [&>:not([hidden])~:not([hidden])]:mt-8 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Reservation Details</h2>
              <div className="w-12 h-[2px] bg-[#D92B78]"></div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Dining Hours</h3>
                <p className="text-gray-700 text-xs leading-relaxed">Monday – Sunday: 11:30 AM – 10:00 PM</p>
                <p className="text-gray-500 text-[11px]">Lunch: 11:30 AM – 03:30 PM</p>
                <p className="text-gray-500 text-[11px]">Dinner: 05:00 PM – 10:00 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Party Size</h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  We accommodate parties from 01 to 120 guests. For groups larger than 8, please contact us directly at{" "}
                  {CONTACT.phone}.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={ICON_WRAP}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Cancellation Policy</h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  Please provide at least 24 hours notice for cancellations. Same-day cancellations may incur a fee.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 border border-[#D92B78]/30 relative shadow-xs">
              <div className="absolute top-6 left-6 text-[#D92B78]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="pl-7">
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">Special Requests</h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  We&apos;re happy to accommodate dietary restrictions, allergies, and special occasions. Please include any
                  special requests in the form, and our team will do their best to make your experience memorable.
                </p>
              </div>
            </div>

            <CheckStatus />
          </RevealItem>

          {/* RIGHT COLUMN: BOOK YOUR TABLE FORM */}
          <RevealItem
            from="right"
            className="lg:col-span-6 p-8 md:p-10 rounded-3xl shadow-xl text-white transition-all duration-1000 ease-out transform will-change-[opacity,transform] bg-[#083B2C] border border-[#D92B78]/20 delay-[400ms]"
          >
            <BookingForm />
          </RevealItem>
        </div>
      </RevealGroup>
    </>
  );
}
