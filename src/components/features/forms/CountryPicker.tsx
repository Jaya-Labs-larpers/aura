"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type SyntheticEvent } from "react";
import { ChevronIcon } from "@/components/ui/Icons";
import type { Country } from "@/content/countries";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

// flagcdn.com serves a flag SVG per ISO 3166-1 alpha-2 code — no API key, no
// scraping a third-party page for images.
const flagUrl = (iso2: string) => `https://flagcdn.com/${iso2.toLowerCase()}.svg`;

const hideOnError = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.style.visibility = "hidden";
};

interface CountryPickerProps {
  name: string;
  countries: Country[];
  value: string;
  onChange: (iso2: string) => void;
}

/**
 * Dial-code control for the phone field: a flag + "+dial" trigger that opens
 * a searchable country list. A native <select> can't show flags or filter by
 * typed text, so this is a custom listbox (see
 * docs/events-form-feedback-handover.md §5).
 */
export function CountryPicker({ name, countries, value, onChange }: CountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef(new Map<string, HTMLButtonElement>());
  const reducedMotion = prefersReducedMotion();

  const selected = countries.find((country) => country.iso2 === value) ?? countries[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((country) => country.name.toLowerCase().includes(q) || country.dial.includes(q));
  }, [countries, query]);

  const openPopover = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const width = Math.min(300, window.innerWidth - 24);
      const left = Math.min(Math.max(rect.left, 12), window.innerWidth - width - 12);
      const upward = rect.bottom + 360 > window.innerHeight && rect.top > 360;
      setOpenUpward(upward);
      setPosition({ left, width, top: upward ? rect.top - 8 : rect.bottom + 8 });
    }
    setQuery("");
    setHighlighted(Math.max(0, countries.findIndex((country) => country.iso2 === value)));
    setVisible(reducedMotion);
    setOpen(true);
  };

  useEffect(() => {
    if (!open || reducedMotion) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open, reducedMotion]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (popoverRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const country = filtered[highlighted];
    if (country) optionRefs.current.get(country.iso2)?.scrollIntoView({ block: "nearest" });
  }, [open, highlighted, filtered]);

  const pick = (iso2: string) => {
    onChange(iso2);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const country = filtered[highlighted];
      if (country) pick(country.iso2);
    }
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => (open ? setOpen(false) : openPopover())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code, ${selected.name} ${selected.dial}`}
        className="flex items-center gap-1.5 py-3 pr-2 text-[15px]"
      >
        <img src={flagUrl(selected.iso2)} alt="" className="h-[14px] w-5 shrink-0 rounded-[2px] object-cover" onError={hideOnError} />
        <span className="whitespace-nowrap">{selected.dial}</span>
        <ChevronIcon className="h-3 w-3 shrink-0 opacity-60" />
      </button>
      <input type="hidden" name={name} value={selected.dial} />

      {open && position && (
        <div style={{ position: "fixed", top: position.top, left: position.left, width: position.width }} className="z-20">
          <div className={cn(openUpward && "-translate-y-full")}>
            <div
              ref={popoverRef}
              role="dialog"
              aria-label="Choose a country"
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl bg-glaze text-ink shadow-lg ring-1 ring-ink/10",
                !reducedMotion && "transition-[opacity,transform] duration-300 ease-out-expo",
                visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              <div className="border-b border-ink/10 p-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setHighlighted(0);
                  }}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Search countries"
                  aria-label="Search countries"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="country-picker-listbox"
                  className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-1.5 text-[14px] placeholder:text-ink/40 focus:border-ink/40 focus:outline-none"
                />
              </div>
              <div
                role="listbox"
                id="country-picker-listbox"
                aria-label="Countries"
                className="max-h-64 overflow-y-auto p-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(16,35,30,0.3)_transparent]"
              >
                {filtered.length === 0 && <p className="px-3 py-4 text-center text-[13px] opacity-60">No countries found</p>}
                {filtered.map((country, index) => (
                  <button
                    key={country.iso2}
                    type="button"
                    ref={(el) => {
                      if (el) optionRefs.current.set(country.iso2, el);
                      else optionRefs.current.delete(country.iso2);
                    }}
                    role="option"
                    aria-selected={country.iso2 === selected.iso2}
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => pick(country.iso2)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors",
                      index === highlighted ? "bg-ink/10" : "hover:bg-ink/5",
                    )}
                  >
                    <img src={flagUrl(country.iso2)} alt="" className="h-[14px] w-5 shrink-0 rounded-[2px] object-cover" onError={hideOnError} />
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="shrink-0 text-[13px] opacity-60">{country.dial}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
