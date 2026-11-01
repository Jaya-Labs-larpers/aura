"use client";

import { useEffect, useRef } from "react";
import { Fade } from "@/components/site/Fade";

interface LightboxProps {
  image: string | null;
  onClose: () => void;
  /** Close-button color differs slightly between the home and gallery pages. */
  closeClassName?: string;
}

export function Lightbox({ image, onClose, closeClassName = "text-[#FCFAF6]/80" }: LightboxProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const show = image !== null;

  // `@keydown.escape.window`
  useEffect(() => {
    if (!show) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  return (
    <Fade
      show={show}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C1D19]/96"
      enter="transition ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      leaveMs={200}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute top-6 right-6 hover:text-[#D92B78] text-3xl z-50 focus:outline-none transition-colors ${closeClassName}`}
        aria-label="Close preview"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* `@click.outside` — clicking the dimmed backdrop closes the preview */}
      <div
        className="absolute inset-0"
        onClick={(event) => {
          if (frameRef.current && !frameRef.current.contains(event.target as Node)) onClose();
        }}
      />

      <div ref={frameRef} className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg">
        {image && (
          <img
            src={image}
            alt="Expanded Gallery Preview"
            className="max-w-full max-h-[85vh] object-contain mx-auto rounded-sm shadow-2xl border border-[#D92B78]/20"
          />
        )}
      </div>
    </Fade>
  );
}
