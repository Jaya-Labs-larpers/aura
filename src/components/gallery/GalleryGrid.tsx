"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
              className={cn(
                "break-inside-avoid rounded-2xl overflow-hidden shadow-md border border-black/10 transition-all duration-500 ease-in-out relative bg-[#0D4F3B]/10 w-full",
                isDisplayed(item) ? "inline-block" : "hidden",
                isVisible(item) ? "opacity-100 scale-100" : "opacity-0 scale-95",
              )}
            >
              {/* Photo placeholder: keeps the tile's aspect ratio without loading the image. */}
              <div
                role="img"
                aria-label={item.alt}
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
                className="w-full flex items-center justify-center text-[#0D4F3B]/40"
              >
                <i className="fa-regular fa-image text-3xl"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
