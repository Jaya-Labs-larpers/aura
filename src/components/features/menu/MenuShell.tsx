"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { MenuData } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Buttons";
import { cn } from "@/lib/cn";

/**
 * Shared frame for /menu and /menu/[category]: a sticky left list of
 * categories (Amazónico-style) and a right pane that shows `children` — the
 * hub's intro photo, or a category's items. Hovering a category previews its
 * photo over the right pane; clicking navigates straight to the real page.
 */
export function MenuShell({ data, children }: { data: MenuData; children: ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "");
  const active = data.categories.find((category) => pathname.endsWith(`/menu/${category.key}`))?.key;
  const activeMenu = data.categories.find((category) => category.key === active)?.menu;
  const [menuKey, setMenuKey] = useState(activeMenu ?? data.menus[0]?.key);
  const categories = data.categories.filter((category) => category.menu === menuKey);
  const [hoverKey, setHoverKey] = useState<string>();
  const preview = hoverKey && hoverKey !== active ? data.categories.find((c) => c.key === hoverKey) : undefined;

  return (
    // Unset background: shows the body's patterned green ground, same as the home page.
    <div className="pt-24 pb-24 text-cream md:pt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:gap-16 md:px-8">
        <nav aria-label="Menu categories" className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <Eyebrow>Menu</Eyebrow>
            <div className="mt-4 flex gap-6 border-b border-cream/15 pb-4">
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
            <ul className="mt-6 space-y-1">
              {categories.map((category) => (
                <li key={category.key}>
                  <Link
                    href={`/menu/${category.key}`}
                    onMouseEnter={() => setHoverKey(category.key)}
                    onMouseLeave={() => setHoverKey(undefined)}
                    onFocus={() => setHoverKey(category.key)}
                    onBlur={() => setHoverKey(undefined)}
                    aria-current={active === category.key || undefined}
                    className={cn(
                      "block font-display text-3xl leading-tight transition-colors duration-300 ease-out-expo md:text-4xl",
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

        <div className="relative min-h-[70vh] md:col-span-8">
          {children}
          {preview && (
            <Photo
              slot={{ label: `${preview.title} preview`, photo: `menu/${preview.key}/` }}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
