"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import type { MenuData } from "@/content/types";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const OFFSET = 150; // header + category bar

/**
 * The full menu on one page. A sticky category bar scrolls smoothly to each
 * section and highlights whichever section is in view.
 */
export function MenuBrowser({ data }: { data: MenuData }) {
  const lenis = useLenis();
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(data.tabs[0]?.key ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id.replace("menu-", "")));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    data.tabs.forEach((tab) => {
      const section = document.getElementById(`menu-${tab.key}`);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [data]);

  // Keep the active category centred in the horizontal bar.
  useEffect(() => {
    const nav = bar.current;
    const button = nav?.querySelector<HTMLElement>(`[data-key="${active}"]`);
    if (!nav || !button) return;
    nav.scrollTo({ left: button.offsetLeft - nav.clientWidth / 2 + button.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  const goTo = (key: string) => {
    const section = document.getElementById(`menu-${key}`);
    if (!section) return;
    if (lenis) lenis.scrollTo(section, { offset: -OFFSET + 10 });
    else window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - OFFSET + 10, behavior: "smooth" });
  };

  return (
    <div className="bg-jungle text-cream">
      <div className="sticky top-16 z-30 border-y border-cream/10 bg-jungle/90 backdrop-blur-md">
        <div ref={bar} className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-8">
          {data.tabs.map((tab) => (
            <button
              key={tab.key}
              data-key={tab.key}
              type="button"
              onClick={() => goTo(tab.key)}
              aria-current={active === tab.key || undefined}
              className={cn(
                "h-9 shrink-0 rounded-full px-4 text-[13px] whitespace-nowrap transition-colors duration-300",
                active === tab.key ? "bg-cream text-jungle" : "text-cream/70 hover:text-cream",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        {data.categories.map((category, index) => (
          <section
            key={category.key}
            id={`menu-${category.key}`}
            className="grid gap-10 border-b border-cream/10 py-16 md:grid-cols-12 md:gap-16 md:py-24"
          >
            <div className="md:col-span-4">
              <div className="md:sticky md:top-40">
                <p className="font-mono text-xs opacity-50">{String(index + 1).padStart(2, "0")}</p>
                <RevealText text={category.title} className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl" />
                <Reveal variant="clip" delay={150} className="mt-8 hidden md:block">
                  <Placeholder
                    slot={{ label: `${category.title} feature`, photo: `menu/${category.key}/` }}
                    className="aspect-[4/3] w-full"
                  />
                </Reveal>
              </div>
            </div>

            <ul className="md:col-span-8">
              {category.items.map((item, i) => (
                <Reveal as="li" key={item.name} delay={(i % 4) * 60} className="border-b border-cream/10 py-6 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-xl md:text-2xl">{item.name}</h3>
                    <span aria-hidden="true" className="flex-1 translate-y-[-4px] border-b border-dotted border-cream/25" />
                    <span className="shrink-0 text-sm tabular-nums">{item.price}</span>
                  </div>
                  {item.description && <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-65">{item.description}</p>}
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
