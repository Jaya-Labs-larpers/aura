"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lightbox } from "@/components/site/Lightbox";

const IMAGES = Array.from({ length: 12 }, (_, index) => `/images/gallery/highlights/${String(index + 1).padStart(2, "0")}.jpg`);

export function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const close = useCallback(() => setActiveImage(null), []);

  return (
    <section className="py-12 md:py-20 px-6 lg:px-20 overflow-hidden bg-[#F2FFF7] text-[#26332F] transition-colors duration-700 ease-out border-t border-[#EEE8DD]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest uppercase text-[#17352F]">GALLERY</h2>
          <div className="w-16 md:w-20 h-[2px] bg-[#D92B78] mx-auto mt-3 md:mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {IMAGES.map((image) => (
            <div
              key={image}
              onClick={() => setActiveImage(image)}
              className="group relative overflow-hidden rounded-[4px] shadow-xs border border-[#E4DDD2] bg-[#EEE8DD] aspect-[4/3] cursor-pointer"
            >
              <Image
                src={image}
                alt="Gallery Image"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-[#0C1D19]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass-plus text-[#D92B78] text-xl opacity-90"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/gallery"
            className="relative group overflow-hidden rounded-full px-7 py-3 border border-[#D92B78] text-[#17352F] text-xs sm:text-sm font-medium tracking-widest transition-all duration-500 shadow-lg inline-flex items-center justify-center bg-transparent hover:text-[#F2FFF7]"
          >
            <span className="absolute inset-0 w-full h-full bg-[#D92B78] transition-all duration-500 ease-out transform -translate-x-full group-hover:translate-x-0"></span>
            <span className="relative z-10 transition-colors duration-500">EXPLORE MORE</span>
          </Link>
        </div>

        <Lightbox image={activeImage} onClose={close} closeClassName="text-[#FCFAF6]/80" />
      </div>
    </section>
  );
}
