"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { CalendarIcon, ChevronIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/scroll";

const WEEKDAY_HEADER = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const isoOf = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const parseIso = (iso: string) => {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const formatDisplay = (iso: string) => {
  const date = parseIso(iso);
  if (!date) return "";
  return `${WEEKDAY_SHORT[date.getDay()]} ${date.getDate()} ${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`;
};

// Mon-start 6x7 grid, padded with the adjacent months' days so the height never shifts.
const buildGrid = (year: number, month: number) => {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const start = new Date(year, month, 1 - firstWeekday);
  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
};

export interface DatePickerHandle {
  focus: () => void;
}

interface DatePickerProps {
  name: string;
  value: string;
  today: string;
  placeholder?: string;
  className?: string;
  /** "light" for the glaze ground (default); "dark" for a green card or page. */
  variant?: "light" | "dark";
  onChange: (iso: string) => void;
}

/**
 * Custom calendar popover, styled to the ground it sits in rather than the
 * browser's native date input (which can't be restyled consistently across
 * Chrome/Safari/Firefox). See docs/events-form-tweaks-handover.md §3.
 */
export const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>(function DatePicker(
  { name, value, today, placeholder = "Select date", className, variant = "light", onChange },
  ref,
) {
  const dark = variant === "dark";
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [view, setView] = useState(() => {
    const base = parseIso(value || today) ?? new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const [focusedIso, setFocusedIso] = useState(value || today);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());
  const reducedMotion = prefersReducedMotion();

  useImperativeHandle(ref, () => ({ focus: () => buttonRef.current?.focus() }));

  const openPopover = () => {
    const base = parseIso(value || today) ?? new Date();
    setView({ year: base.getFullYear(), month: base.getMonth() });
    setFocusedIso(value || today);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const width = Math.min(280, window.innerWidth - 24);
      const left = Math.min(Math.max(rect.left, 12), window.innerWidth - width - 12);
      const upward = rect.bottom + 360 > window.innerHeight && rect.top > 360;
      setOpenUpward(upward);
      setPosition({ left, width, top: upward ? rect.top - 8 : rect.bottom + 8 });
    }
    setVisible(reducedMotion);
    setOpen(true);
  };

  useEffect(() => {
    if (!open || reducedMotion) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open, reducedMotion]);

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
    dayRefs.current.get(focusedIso)?.focus();
  }, [open, focusedIso, view]);

  const grid = buildGrid(view.year, view.month);

  const changeMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
    setFocusedIso(isoOf(next));
  };

  const pick = (iso: string) => {
    onChange(iso);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const moveFocus = (fromIso: string, deltaDays: number) => {
    const current = parseIso(fromIso) ?? new Date();
    current.setDate(current.getDate() + deltaDays);
    if (current.getMonth() !== view.month || current.getFullYear() !== view.year) {
      setView({ year: current.getFullYear(), month: current.getMonth() });
    }
    setFocusedIso(isoOf(current));
  };

  const onGridKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, iso: string) => {
    const weekday = (parseIso(iso)!.getDay() + 6) % 7;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(iso, -1);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveFocus(iso, 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(iso, -7);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveFocus(iso, 7);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(iso, -weekday);
        break;
      case "End":
        event.preventDefault();
        moveFocus(iso, 6 - weekday);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (iso >= today) pick(iso);
        break;
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => (open ? setOpen(false) : openPopover())}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(className, "flex items-center justify-between text-left", !value && "text-current/40")}
      >
        <span>{value ? formatDisplay(value) : placeholder}</span>
        <CalendarIcon className="pointer-events-none h-3 w-3 shrink-0 opacity-60" />
      </button>
      <input type="hidden" name={name} value={value} required />
      {open && position && (
        <div style={{ position: "fixed", top: position.top, left: position.left, width: position.width }} className="z-20">
          <div className={cn(openUpward && "-translate-y-full")}>
            <div
              ref={popoverRef}
              role="dialog"
              aria-label="Choose a date"
              className={cn(
                "rounded-2xl p-3 shadow-lg ring-1",
                dark ? "bg-forest text-cream ring-cream/15" : "bg-glaze text-ink ring-ink/10",
                !reducedMotion && "transition-[opacity,transform] duration-300 ease-out-expo",
                visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                  className={cn("rounded-full p-1.5", dark ? "hover:bg-cream/10" : "hover:bg-ink/5")}
                >
                  <ChevronIcon className="h-3.5 w-3.5 rotate-90" />
                </button>
                <span className="text-[13px] font-medium">
                  {MONTH_FULL[view.month]} {view.year}
                </span>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                  className={cn("rounded-full p-1.5", dark ? "hover:bg-cream/10" : "hover:bg-ink/5")}
                >
                  <ChevronIcon className="h-3.5 w-3.5 -rotate-90" />
                </button>
              </div>
              <div role="grid" className="mt-2">
                <div className="grid grid-cols-7 text-center text-[11px] opacity-50">
                  {WEEKDAY_HEADER.map((day) => (
                    <span key={day} className="py-1">
                      {day}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {grid.map((day) => {
                    const iso = isoOf(day);
                    const inMonth = day.getMonth() === view.month;
                    const isPast = iso < today;
                    const selected = iso === value;
                    const isToday = iso === today;
                    return (
                      <button
                        key={iso}
                        type="button"
                        ref={(el) => {
                          if (el) dayRefs.current.set(iso, el);
                          else dayRefs.current.delete(iso);
                        }}
                        role="gridcell"
                        tabIndex={iso === focusedIso ? 0 : -1}
                        aria-selected={selected}
                        aria-label={day.toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        onFocus={() => setFocusedIso(iso)}
                        onKeyDown={(event) => onGridKeyDown(event, iso)}
                        onClick={() => !isPast && pick(iso)}
                        className={cn(
                          "flex h-9 w-full items-center justify-center rounded-full text-[13px] transition-colors",
                          !inMonth && "opacity-40",
                          isPast && "cursor-default opacity-25",
                          !isPast && !selected && (dark ? "hover:bg-cream/10" : "hover:bg-ink/10"),
                          isToday && !selected && (dark ? "ring-1 ring-cream/40" : "ring-1 ring-ink/40"),
                          selected && (dark ? "bg-cream text-jungle" : "bg-ink text-glaze"),
                        )}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
