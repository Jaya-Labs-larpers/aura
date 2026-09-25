"use client";

import { CONTACT } from "@/lib/site";

export function MapCard() {
  return (
    <div
      className="group relative mt-6 overflow-hidden rounded-3xl border border-[#D92B78]/30 bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
      onDoubleClick={() => window.open(CONTACT.googleMaps, "_blank")}
      title="Double-click to open Google Maps"
    >
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=104.923%2C11.549%2C104.935%2C11.557&layer=mapnik&marker=11.55278%2C104.92977"
        width="100%"
        height="300"
        className="border-0 pointer-events-none"
        loading="lazy"
        title="Location Map"
      ></iframe>

      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
        <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-gray-900 shadow-xl">
          <svg className="w-4 h-4 text-[#D92B78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          </svg>
          Double-click to open Google Maps
        </div>
      </div>
    </div>
  );
}
