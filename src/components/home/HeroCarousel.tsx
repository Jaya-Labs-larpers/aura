"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SLIDES = ["/images/home/hero-slide-1.jpg", "/images/home/hero-slide-2.jpg", "/images/home/hero-slide-3.jpg"];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // `x-init="setTimeout(() => loaded = true, 200)"`
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // `init() { setInterval(() => this.next(), 5000) }`
  useEffect(() => {
    const id = setInterval(() => setActive((index) => (index + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const next = () => setActive((index) => (index + 1) % SLIDES.length);
  const prev = () => setActive((index) => (index - 1 + SLIDES.length) % SLIDES.length);

  const entrance = (delay: string) =>
    cn("transition-all duration-1000 transform", delay, loaded ? "translate-y-0" : "opacity-0 translate-y-8");

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[calc(80vh-84px)] flex items-center justify-center overflow-hidden bg-[#0C1D19]">
      {SLIDES.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out",
            active === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={active !== index}
        >
          <img
            src={image}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[5000ms]"
            alt="Hero Slide"
          />
          <div className="absolute inset-0 bg-linear-to-b/srgb from-[#102823]/50 via-[#102823]/40 to-[#0C1D19]/85"></div>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 md:left-10 z-20 text-[#FCFAF6]/70 hover:text-white p-3 transition-all duration-300 transform hover:scale-125 focus:outline-none"
      >
        <i className="fa-solid fa-chevron-left text-xl md:text-2xl drop-shadow-v3-md"></i>
      </button>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center -mt-6 sm:-mt-10">
        <h1
          className={cn(
            "text-2xl sm:text-4xl lg:text-7xl font-bold tracking-wider text-[#F2FFF7] uppercase drop-shadow-v3-xl leading-tight sm:leading-10 lg:leading-none",
            entrance(""),
            loaded && "opacity-100",
          )}
        >
          ESCAPE THE ORDINARY
        </h1>

        {/* On the live site this line carries both opacity-0 and opacity-95 before load;
            opacity-95 wins in the stylesheet, so it only slides up and never fades. */}
        <p
          className={cn(
            "mt-3 sm:mt-4 text-xs sm:text-base md:text-xl text-[#FCFAF6] tracking-widest font-light drop-shadow-v3 opacity-95 transition-all duration-1000 delay-300 transform",
            loaded ? "translate-y-0" : "translate-y-8",
          )}
        >
          Experience The Rooftop Vibe.
        </p>

        <div
          className={cn(
            "mt-6 flex flex-row items-center justify-center gap-3",
            entrance("delay-500"),
            loaded && "opacity-100",
          )}
        >
          <Link
            href="/reservation"
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-[#F2FFF7] text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-md text-center"
          >
            Reserve a Table
          </Link>
          <Link
            href="/menu"
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 text-[#F2FFF7] text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-md text-center"
          >
            Explore Menu
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 md:right-10 z-20 text-[#FCFAF6]/70 hover:text-white p-3 transition-all duration-300 transform hover:scale-125 focus:outline-none"
      >
        <i className="fa-solid fa-chevron-right text-xl md:text-2xl drop-shadow-v3-md"></i>
      </button>

      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex items-center justify-center space-x-3">
        {SLIDES.map((image, index) => (
          <span
            key={image}
            onClick={() => setActive(index)}
            className={cn(
              "h-2 rounded-full cursor-pointer transition-all duration-500",
              active === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70",
            )}
          ></span>
        ))}
      </div>
    </section>
  );
}
