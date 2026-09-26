"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/content/types";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const FILTERS: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "venue", label: "The Venue" },
  { key: "events", label: "Meetings & Events" },
  { key: "menu", label: "Menu" },
];

/** Filterable masonry grid with a keyboard-friendly lightbox. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => (filter === "all" ? items : items.filter((item) => item.category === filter)), [items, filter]);

  return (
    <div className="bg-jungle px-5 pb-28 text-cream md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-2 py-10" role="tablist" aria-label="Gallery filter">
          {FILTERS.map((option) => {
            const count = option.key === "all" ? items.length : items.filter((item) => item.category === option.key).length;
            return (
              <button
                key={option.key}
                type="button"
                role="tab"
                aria-selected={filter === option.key}
                onClick={() => setFilter(option.key)}
                className={cn(
                  "h-10 rounded-full px-5 text-[13px] transition-colors duration-300",
                  filter === option.key ? "bg-cream text-jungle" : "border border-cream/20 text-cream/75 hover:border-cream/60",
                )}
              >
                {option.label} <span className="ml-1 opacity-50">{count}</span>
              </button>
            );
          })}
        </div>

        <div key={filter} className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {shown.map((item, i) => (
            <Reveal key={item.photo} delay={(i % 8) * 50} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${item.alt}`}
                className="group block w-full overflow-hidden bg-moss"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <Placeholder
                  slot={{ label: item.alt, photo: item.photo }}
                  bare
                  className="h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={shown} index={open} onChange={setOpen} />
    </div>
  );
}

function Lightbox({
  items,
  index,
  onChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const lenis = useLenis();
  const show = index !== null;
  const item = show ? items[index] : null;

  const step = useCallback(
    (delta: number) => index !== null && onChange((index + delta + items.length) % items.length),
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!show) return;
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [show, lenis, onChange, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      aria-hidden={!show}
      inert={!show}
      onClick={(event) => event.target === event.currentTarget && onChange(null)}
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center bg-jungle/95 p-5 backdrop-blur-sm transition-opacity duration-500",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {item && (
        <div
          key={item.photo}
          className="w-full max-w-5xl animate-[lightbox-in_600ms_var(--ease-out-expo)]"
          style={{ aspectRatio: `${item.width} / ${item.height}`, maxHeight: "82vh" }}
        >
          <Placeholder slot={{ label: item.alt, photo: item.photo }} className="mx-auto h-full max-h-[82vh] w-full bg-moss" />
        </div>
      )}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs opacity-60">
        {index !== null && `${index + 1} / ${items.length}`}
      </p>
      <button type="button" onClick={() => onChange(null)} aria-label="Close" className="absolute top-5 right-5 p-2">
        <CloseIcon className="h-7 w-7" />
      </button>
      <button type="button" onClick={() => step(-1)} aria-label="Previous" className="absolute left-3 p-3 md:left-6">
        <ArrowIcon className="h-6 w-6 rotate-180" />
      </button>
      <button type="button" onClick={() => step(1)} aria-label="Next" className="absolute right-3 p-3 md:right-6">
        <ArrowIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
