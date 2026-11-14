"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { MenuData } from "@/content/types";
import { Eyebrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

/**
 * Shared frame for /menu and /menu/[category]: a sticky left list of
 * categories (Amazónico-style) and a right pane that shows `children` — the
 * hub's intro photo, or a category's items.
 */
export function MenuShell({ data, children }: { data: MenuData; children: ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "");
  const lenis = useLenis();

  // Each category is its own page, not a scroll position within one — land on top of it
  // instead of wherever Lenis's virtual scroll happened to be on the page you clicked from.
  // Skips the first render so loading a menu page directly doesn't jump.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  const active = data.categories.find((category) => pathname.endsWith(`/menu/${category.key}`))?.key;
  const activeMenu = data.categories.find((category) => category.key === active)?.menu;
  const [menuKey, setMenuKey] = useState(
    activeMenu ?? data.menus.find((menu) => menu.default)?.key ?? data.menus[0]?.key,
  );
  const categories = data.categories.filter((category) => category.menu === menuKey);

  // On a category page, the right pane is that category's items (`children`). On the hub
  // (no category picked yet), it's the selected top menu's own photo, swapped by `setMenuKey`
  // below — not `children`, which only changes when the category route changes.
  const hubMenu = data.menus.find((menu) => menu.key === menuKey);
  const pane = useMemo(
    () =>
      active ? (
        children
      ) : (
        <Photo
          slot={{ label: `${hubMenu?.label ?? "Menu"} overview`, photo: hubMenu?.photo }}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-[70vh] w-full md:h-dvh"
        />
      ),
    [active, children, hubMenu],
  );
  // Identifies the right pane's current content: the route for a category page, or the
  // selected top menu for the hub — so a tab click fades the pane the same way a nav click does.
  const paneKey = active ? pathname : `hub:${menuKey}`;

  // Crossfades the right pane across navigation instead of snapping: the old
  // content (hub photo or a category's items) fades out, then the new one fades in.
  const [content, setContent] = useState(pane);
  const [contentVisible, setContentVisible] = useState(true);
  const [renderedKey, setRenderedKey] = useState(paneKey);

  // Same pane: keep content in sync with no fade (e.g. a hover preview ending).
  // Adjusted during render, not an effect, so it takes effect before paint — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (paneKey === renderedKey && content !== pane) setContent(pane);

  useEffect(() => {
    if (paneKey === renderedKey) return;
    // Starts the fade-out transition in response to the pane change; the matching fade-in
    // happens via setContent/setContentVisible(true) once the timer below completes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContentVisible(false);
    const timer = setTimeout(() => {
      setRenderedKey(paneKey);
      setContent(pane);
      setContentVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [pane, paneKey, renderedKey]);

  return (
    // Unset background: shows the body's patterned green ground, same as the home page.
    // Desktop: Amazónico's split — two 50% halves from viewport y=0 (behind the fixed header). The
    // left half centres the category list both ways; the right half runs to the screen's right edge.
    <div className="pt-24 pb-24 text-cream md:pt-0 md:pb-0">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-0">
        <nav aria-label="Menu categories" className="px-5 md:px-0">
          <div className="md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:items-start md:justify-start md:px-8 md:py-28 lg:px-16">
            <div className="md:self-center md:text-center">
              <Eyebrow>Menu</Eyebrow>
              <div
                className={cn(
                  "mt-4 flex flex-wrap gap-x-4 gap-y-2 border-b border-cream/15 pb-4 md:justify-center",
                  active ? "lg:gap-x-6" : "gap-x-6",
                )}
              >
                {data.menus.map((menu) => (
                  <button
                    key={menu.key}
                    type="button"
                    onClick={() => setMenuKey(menu.key)}
                    aria-current={menuKey === menu.key || undefined}
                    className={cn(
                      "font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 ease-out-expo",
                      menuKey === menu.key ? "text-cream" : "text-cream/40 hover:text-cream/70",
                    )}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-6 space-y-1 md:ml-6 lg:ml-10">
              {categories.map((category) => (
                <li key={category.key}>
                  <Link
                    href={`/menu/${category.key}`}
                    aria-current={active === category.key || undefined}
                    className={cn(
                      "block font-display text-2xl leading-tight transition-colors duration-300 ease-out-expo md:text-3xl",
                      active === category.key ? "text-cream" : "text-cream/40 hover:text-cream/80",
                    )}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="relative min-h-[70vh] md:min-h-dvh">
          <div className={cn("transition-opacity duration-300 ease-out-expo", contentVisible ? "opacity-100" : "opacity-0")}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
