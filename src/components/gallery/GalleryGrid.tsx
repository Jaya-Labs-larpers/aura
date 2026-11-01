"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/site/Lightbox";
import { useIntersectOnce } from "@/components/site/Reveal";
import type { GalleryCategory, GalleryItem } from "@/types/site";

type Filter = "all" | GalleryCategory;

const TABS: { filter: Filter; label: string }[] = [
  { filter: "all", label: "ALL" },
  { filter: "menu", label: "MENU" },
  { filter: "venue", label: "THE VENUE" },
  { filter: "events", label: "MEETINGS & EVENTS" },
];

const matches = (item: GalleryItem, filter: Filter) => filter === "all" || item.category === filter;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { ref: heroRef, shown: heroShown } = useIntersectOnce<HTMLElement>();
  const { ref: gridRef, shown: gridShown } = useIntersectOnce<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>("all");
  // Mirrors the site's script: matching items fade/scale in after 50ms, while items
  // from the previous filter fade out and leave the layout after 300ms.
  const [previous, setPrevious] = useState<Filter>("all");
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const close = useCallback(() => setActiveImage(null), []);

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(fadeIn);
  }, []);

  const applyFilter = (next: Filter) => {
    setPrevious(filter);
    setFilter(next);
    setVisible(false);
    setTimeout(() => setVisible(true), 50);
    setTimeout(() => setPrevious(next), 300);
  };

  const isDisplayed = (item: GalleryItem) => matches(item, filter) || matches(item, previous);
  const isVisible = (item: GalleryItem) => visible && matches(item, filter);

  return (
    <>
      {/* HERO / TITLE SECTION */}
      <section ref={heroRef} className="pt-24 pb-16 px-6 text-center bg-[#0D4F3B]">
        <div
          className={cn(
            "max-w-4xl mx-auto flex flex-col items-center transition-all duration-1000 ease-out transform will-change-[opacity,transform]",
            heroShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          <h1 className="text-3xl md:text-5xl font-serif font-normal tracking-widest uppercase mb-3 text-[#F2FFF7]">Gallery</h1>

          <div
            className={cn(
              "w-12 h-[2px] bg-[#D92B78] mb-8 transition-all duration-1000 ease-out",
              heroShown ? "opacity-100 scale-100" : "opacity-0 scale-50",
            )}
          ></div>

          <div className="flex flex-wrap justify-center gap-8 text-xs md:text-sm tracking-widest uppercase font-medium">
            {TABS.map((tab) => (
              <button
                key={tab.filter}
                type="button"
                onClick={() => applyFilter(tab.filter)}
                className={cn(
                  "relative pb-2 transition",
                  filter === tab.filter ? "text-[#F2FFF7]" : "text-gray-400 hover:text-[#F2FFF7]",
                )}
              >
                {tab.label}
                <span className={cn("absolute bottom-0 left-0 w-full h-[2px] bg-[#D92B78]", filter !== tab.filter && "hidden")}></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY MASONRY CONTAINER */}
      <div ref={gridRef} className="py-16 px-6 lg:px-16 min-h-screen bg-[#F2FFF7]">
        <div
          className={cn(
            "max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*+*]:mt-6 transition-all duration-1000 ease-out transform will-change-[opacity,transform] delay-200",
            gridShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          {items.map((item) => (
            <div
              key={item.image}
              onClick={() => setActiveImage(item.image)}
              className={cn(
                "break-inside-avoid rounded-2xl overflow-hidden shadow-md border border-black/10 transition-all duration-500 ease-in-out cursor-pointer group relative bg-white/50 w-full",
                isDisplayed(item) ? "inline-block" : "hidden",
                isVisible(item) ? "opacity-100 scale-100" : "opacity-0 scale-95",
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-[#0C1D19]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass-plus text-[#D92B78] text-xl opacity-90"></i>
              </div>
            </div>
          ))}
        </div>

        <Lightbox image={activeImage} onClose={close} closeClassName="text-[#FCFAF6]/85" />
      </div>
    </>
  );
}
