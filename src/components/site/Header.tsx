"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LOGO, NAV_LINKS } from "@/lib/site";
import { Fade } from "@/components/site/Fade";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Alpine `@click.away="open = false"`
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 left-0 w-full z-50 px-6 lg:px-12 py-5 lg:py-6 shadow-md transition-transform duration-700 ease-out bg-[#002117]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src={LOGO} alt="AURA Logo" className="h-8 w-auto object-contain" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium tracking-wider">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "text-[#D92B78] border-b-2 border-[#D92B78] pb-1 font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            }}
            className="text-white focus:outline-none transition transform active:scale-90 p-2"
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      <Fade
        show={open}
        className="fixed inset-0 z-50 flex flex-col justify-between md:hidden backdrop-blur-md bg-[#002117]/95 h-screen w-screen"
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-5"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-5"
        leaveMs={200}
      >
        <div ref={drawerRef} className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <img src={LOGO} alt="AURA Logo" className="h-8 w-auto object-contain" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white text-xl p-2 focus:outline-none transition transform hover:rotate-90 duration-300"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="flex flex-col items-stretch justify-start text-base font-medium px-6 overflow-y-auto flex-1 divide-y divide-white/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between w-full py-4 transition",
                  isActive(link.href) ? "text-[#D92B78] font-bold" : "text-gray-200 hover:text-white",
                )}
              >
                <span>{link.label}</span>
                <i className="fa-solid fa-chevron-right text-xs opacity-50"></i>
              </Link>
            ))}
          </div>

          <div className="py-6 text-center text-xs text-gray-400 border-t border-white/10">
            <p>&copy; 2026 Aura Restaurant. All rights reserved.</p>
          </div>
        </div>
      </Fade>
    </header>
  );
}
