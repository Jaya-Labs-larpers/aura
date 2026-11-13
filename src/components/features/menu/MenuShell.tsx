"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
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
  const hovered = hoverKey && hoverKey !== active ? data.categories.find((c) => c.key === hoverKey) : undefined;
  const preview = hovered?.photo ? hovered : undefined;

  // Crossfades the right pane across navigation instead of snapping: the old
  // content (hub photo or a category's items) fades out, then the new one
  // fades in, in step with the hover-preview photo's own fade below.
  const [content, setContent] = useState(children);
  const [contentVisible, setContentVisible] = useState(true);
  const [renderedPathname, setRenderedPathname] = useState(pathname);

  // Same route: keep content in sync with no fade (e.g. a hover preview ending).
  // Adjusted during render, not an effect, so it takes effect before paint — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (pathname === renderedPathname && content !== children) setContent(children);

  useEffect(() => {
    if (pathname === renderedPathname) return;
    // Starts the fade-out transition in response to the route change; the matching fade-in
    // happens via setContent/setContentVisible(true) once the timer below completes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContentVisible(false);
    const timer = setTimeout(() => {
      setRenderedPathname(pathname);
      setContent(children);
      setContentVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [children, pathname, renderedPathname]);

  // Keeps the preview photo mounted while it fades out, instead of popping
  // out the instant the hover ends or a click navigates away.
  const [previewPhoto, setPreviewPhoto] = useState(preview);
  const [previewVisible, setPreviewVisible] = useState(false);

  if (preview && (previewPhoto !== preview || !previewVisible)) {
    setPreviewPhoto(preview);
    setPreviewVisible(true);
  }

  useEffect(() => {
    if (preview) return;
    // Starts the fade-out transition; the Photo unmounts once it finishes (see timer below).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewVisible(false);
    const timer = setTimeout(() => setPreviewPhoto(undefined), 300);
    return () => clearTimeout(timer);
  }, [preview]);

  return (
    // Unset background: shows the body's patterned green ground, same as the home page.
    // Desktop: Amazónico's split — two 50% halves from viewport y=0 (behind the fixed header). The
    // left half centres the category list both ways; the right half runs to the screen's right edge.
    <div className="pt-24 pb-24 text-cream md:pt-0 md:pb-0">
      <div className="grid gap-10 px-5 md:grid-cols-2 md:gap-0 md:px-0">
        <nav aria-label="Menu categories">
          <div className="md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:items-start md:justify-center md:px-16 md:py-28">
            <div className="md:self-center md:text-center">
              <Eyebrow>Menu</Eyebrow>
              <div className="mt-4 flex gap-6 border-b border-cream/15 pb-4 md:justify-center">
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
                      "block font-display text-4xl leading-tight transition-colors duration-300 ease-out-expo md:text-6xl",
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
          {previewPhoto && (
            // Zero-height sticky anchor placed first, so its native flow position starts at the top
            // of the pane (not after the possibly-tall {content} below) — sticky then pins it to the
            // viewport top from the very first pixel of scroll. It never pushes {content} down (no
            // height of its own), but its absolutely-positioned child is sized to the full viewport
            // height, so the preview reaches up behind the fixed header, Amazónico-style, without
            // trapping the page's normal scroll the way a fixed-height overflow wrapper would.
            // Mobile: top/-top match the wrapper's pt-24, so the photo sits at viewport y=0 both at
            // rest and once the anchor is stuck. Desktop: the pane already starts at y=0.
            <div className="sticky top-24 z-10 h-0 md:top-0">
              <Photo
                slot={{ label: `${previewPhoto.title} preview`, photo: previewPhoto.photo }}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={cn(
                  "pointer-events-none absolute inset-x-0 -top-24 h-dvh w-full transition-opacity duration-300 ease-out-expo md:top-0",
                  previewVisible ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          )}
          <div className={cn("transition-opacity duration-300 ease-out-expo", contentVisible ? "opacity-100" : "opacity-0")}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
