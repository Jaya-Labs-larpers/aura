"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReservation } from "@/components/features/reservation/ReservationProvider";
import { NAV, RESERVE, SITE, SOCIALS } from "@/content/site";
import { CloseIcon, SocialIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { subscribeScroll } from "@/lib/scroll";

/**
 * Fixed header: transparent over the hero, solid once the page scrolls.
 * Nav links sit centred on desktop; on mobile they open a full-screen menu.
 */
export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { show } = useReservation();
  const headerRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu after navigating.
  if (open && openedAt !== pathname) setOpen(false);

  const isHome = pathname === "/";

  useEffect(
    () =>
      subscribeScroll(() => {
        if (!isHome) {
          setSolid(window.scrollY > 40);
          return;
        }
        const identity = document.getElementById("identity");
        const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
        setSolid(identity ? identity.getBoundingClientRect().top <= headerBottom : window.scrollY > 40);
      }),
    [isHome],
  );

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    setOpenedAt(pathname);
    setOpen((value) => !value);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-500 ease-out-expo",
          solid && !open ? "bg-jungle/85 py-3 backdrop-blur-md" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" aria-label={`${SITE.name} home`} className="relative z-10 shrink-0">
            <Image src={SITE.logo} alt={SITE.name} width={478} height={140} priority className="h-8 w-auto md:h-9" />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-1 text-[15px] tracking-wide">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative py-1 transition-opacity hover:opacity-100",
                      pathname.startsWith(item.href) ? "opacity-100" : "opacity-80",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <button
              type="button"
              onClick={show}
              className="hidden h-10 items-center rounded-full border border-cream bg-cream px-5 text-[13px] font-medium text-jungle transition-colors duration-500 ease-out-expo hover:border-forest hover:bg-forest hover:text-cream sm:inline-flex"
            >
              {RESERVE.label}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] lg:hidden"
            >
              {open ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onReserve={() => {
          setOpen(false);
          show();
        }}
      />
    </>
  );
}

function MobileMenu({ open, onReserve }: { open: boolean; onReserve: () => void }) {
  const itemClass = cn(
    "block font-display text-4xl leading-tight transition-transform duration-700 ease-out-expo [transition-delay:calc(var(--i)*50ms+150ms)]",
    open ? "translate-y-0" : "translate-y-full",
  );
  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-jungle px-6 pt-28 pb-10 transition-[clip-path] duration-700 ease-in-out-quart lg:hidden",
        open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
      )}
    >
      <nav aria-label="Mobile" className="flex-1">
        <ul className="space-y-1">
          {NAV.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <Link href={item.href} style={{ "--i": i } as CSSProperties} className={itemClass}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="overflow-hidden">
            <button type="button" onClick={onReserve} style={{ "--i": NAV.length } as CSSProperties} className={itemClass}>
              {RESERVE.label}
            </button>
          </li>
        </ul>
      </nav>
      <ul className={cn("flex gap-5 transition-opacity duration-700 delay-500", open ? "opacity-80" : "opacity-0")}>
        {SOCIALS.map((social) => (
          <li key={social.href}>
            <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              <SocialIcon name={social.icon} className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
