import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Outline of AURA's plate leaf (the deep-green layer of the traced plate,
 * `docs/leaf-v3-handover.md`). Used at low opacity only, in `currentColor`,
 * per the plate background rules in `docs/home-redesign-handover.md` §5:
 * one tone on its own ground, never full-contrast, never on text.
 */
const LEAF_VIEWBOX = "-115 -115 230 230";
const LEAF_D =
  "M26.4 48.0 L26.4 48.8 L27.5 49.3 L27.7 48.8 Z M22.7 41.4 L22.2 42.0 L23.3 42.5 L23.5 41.8 Z M34.1 40.7 L34.8 42.5 L34.5 43.8 L36.7 44.9 L39.2 43.8 L40.3 44.4 L44.4 43.8 L46.6 42.0 L46.4 41.4 L44.0 41.4 L42.9 40.5 L39.4 41.4 L38.3 40.7 Z M-19.6 38.5 L-20.5 39.4 L-19.6 43.3 L-20.5 46.9 L-18.9 52.6 L-16.9 56.8 L-13.6 58.7 L-10.3 59.4 L-8.1 60.7 L-6.6 60.7 L0.4 63.6 L3.5 63.4 L4.6 62.3 L3.5 59.2 L0.4 54.8 L-1.1 51.0 L-3.1 48.8 L-8.1 40.7 L-9.7 39.8 L-12.5 41.1 Z M-4.6 37.8 L-2.6 43.6 L-0.7 46.9 L2.9 49.9 L5.5 54.8 L10.3 59.0 L14.3 58.1 L18.5 58.3 L20.5 57.4 L24.2 53.0 L19.6 48.2 L15.8 46.0 L12.5 42.9 L11.2 43.1 L10.6 41.8 L9.2 42.0 L8.1 40.5 L0.0 37.6 L-3.5 37.2 Z M28.6 34.1 L29.3 35.0 L30.1 35.0 L30.1 34.3 Z M25.1 32.1 L24.9 32.6 L25.7 33.0 L26.0 32.3 Z M15.0 30.4 L17.6 33.2 L20.2 32.1 L20.0 31.5 L17.4 31.7 L16.3 29.7 Z M7.7 29.9 L10.3 32.6 L11.4 32.6 L12.5 31.2 L13.9 30.8 L13.0 29.5 Z M26.0 24.2 L28.6 26.0 L27.3 24.4 Z M10.3 23.8 L12.1 25.1 L13.6 24.9 L14.7 26.2 L16.7 26.2 L23.3 29.5 L24.0 31.2 L26.4 30.6 L27.3 32.3 L29.0 33.0 L31.0 32.8 L38.5 36.3 L41.6 36.7 L45.8 38.9 L48.0 39.4 L26.6 26.8 L23.8 26.2 L20.5 24.4 L20.9 23.5 L19.8 23.3 L19.1 24.2 L18.0 23.8 L17.6 22.0 L16.5 23.3 L14.1 22.2 L13.2 20.9 L12.3 20.9 L11.7 21.8 L11.9 22.9 Z M5.9 19.8 L7.3 21.3 L9.5 21.3 L8.8 20.5 Z M-34.1 19.1 L-35.4 20.9 L-35.0 21.6 L-35.4 24.9 L-37.0 27.3 L-38.9 28.4 L-37.4 28.2 L-35.2 29.7 L-33.4 29.0 L-31.7 30.6 L-28.6 30.8 L-26.0 29.7 L-26.2 26.8 L-27.5 26.0 L-29.9 22.0 L-32.6 19.4 Z M-39.4 18.7 L-43.8 20.0 L-47.5 20.2 L-49.7 18.5 L-53.7 21.3 L-53.5 22.7 L-52.1 22.9 L-51.7 23.8 L-54.1 28.6 L-54.3 30.4 L-53.7 31.5 L-54.1 33.0 L-51.3 31.2 L-49.9 32.3 L-49.9 33.4 L-53.0 38.9 L-52.8 40.3 L-51.0 40.5 L-50.8 39.4 L-49.5 38.3 L-46.0 37.0 L-42.2 37.6 L-41.8 38.9 L-41.6 37.0 L-39.6 33.2 L-40.3 33.2 L-41.8 31.5 L-40.9 29.3 L-42.9 28.8 L-42.5 27.5 L-42.9 26.0 L-41.4 22.9 L-38.7 20.7 Z M-50.2 23.1 L-49.1 24.0 L-49.7 25.1 L-50.8 24.6 L-50.8 23.5 Z M-56.8 13.6 L-55.9 14.5 L-53.9 14.7 Z M-44.2 12.8 L-45.3 12.5 L-46.9 13.4 Z M-42.2 11.4 L-41.8 12.1 L-41.6 11.4 Z M-29.5 10.3 L-28.6 11.0 L-27.7 10.8 L-28.6 10.1 Z M-67.3 4.6 L-65.3 5.3 L-65.8 4.6 Z M-69.3 4.0 L-70.0 4.8 L-67.5 8.6 L-65.8 9.5 L-69.3 5.7 L-69.3 5.1 L-68.4 4.6 Z M13.2 11.9 L16.1 15.4 L20.7 15.6 L23.8 19.6 L29.3 22.7 L31.9 26.0 L32.1 27.1 L30.6 27.3 L37.6 31.0 L44.4 32.6 L49.1 35.4 L51.3 36.1 L53.9 35.2 L57.0 35.4 L59.4 33.0 L59.4 32.1 L57.0 30.4 L50.2 28.6 L37.4 22.7 L26.4 15.6 L25.3 13.0 L26.2 12.3 L28.4 12.8 L31.2 14.7 L33.4 15.4 L37.4 18.9 L44.9 22.4 L48.6 23.5 L54.3 27.1 L60.5 29.3 L62.0 29.0 L63.6 27.3 L64.0 25.3 L55.2 22.4 L53.2 21.3 L52.6 20.0 L53.5 19.4 L63.8 22.9 L66.2 22.9 L68.4 22.0 L70.2 19.6 L70.0 16.7 L66.0 14.7 L53.9 10.3 L52.8 10.3 L53.2 11.2 L52.4 11.9 L50.8 11.2 L48.2 8.6 L46.9 5.9 L47.7 4.6 L49.1 4.6 L50.6 2.4 L46.2 2.4 L35.6 4.4 L30.6 6.4 L20.7 8.6 Z M40.7 3.7 L43.8 4.6 L44.0 6.4 L42.5 7.3 L42.7 8.6 L42.0 9.7 L44.2 10.3 L45.5 12.1 L45.1 13.4 L42.9 15.2 L39.2 15.6 L35.6 13.6 L34.5 11.4 L36.3 9.5 L38.7 9.7 L37.4 9.0 L38.3 7.7 L37.4 5.7 L38.9 4.2 Z M58.7 6.4 L59.2 7.5 L65.8 9.7 L68.6 9.2 L72.2 12.3 L77.4 9.9 L77.4 9.2 L74.8 7.0 L71.3 6.2 L63.4 2.2 L60.5 3.1 L60.9 4.2 L59.6 4.4 L59.8 5.5 Z M-65.1 -0.2 L-64.2 0.4 L-63.1 0.0 L-62.3 2.4 L-61.4 3.1 L-56.3 3.3 L-56.3 2.6 L-58.3 0.9 L-63.6 -0.4 Z M-54.6 -1.8 L-51.0 -0.7 L-51.7 -1.8 Z M62.5 -8.8 L68.0 -6.8 L71.9 -6.2 L72.6 -5.5 L73.9 -5.5 L74.6 -6.2 L73.7 -7.0 L68.4 -8.4 L66.7 -7.9 L65.8 -9.0 Z M55.7 -1.3 L53.7 -4.2 L50.8 -2.6 L45.5 -5.7 L47.3 -7.5 L42.5 -9.0 L39.6 -7.9 L37.2 -8.1 L30.6 -1.3 L29.5 1.1 L31.9 2.0 L42.2 -0.2 L55.7 -0.4 Z M55.7 -11.4 L56.3 -10.6 L56.5 -11.2 Z M49.3 -12.8 L53.7 -11.0 L54.8 -11.7 L50.8 -13.0 Z M59.0 -13.4 L71.1 -10.3 L75.7 -8.6 L77.9 -8.6 L75.0 -11.2 L74.6 -12.5 L72.8 -13.6 L70.6 -13.2 L66.2 -13.9 Z M38.5 -16.3 L38.9 -15.6 L40.9 -15.2 L40.3 -16.1 Z M34.3 -11.9 L28.2 -12.5 L23.3 -14.5 L18.9 -15.4 L17.2 -10.3 L15.6 -8.6 L14.1 -7.9 L11.9 -9.7 L11.4 -12.5 L14.5 -17.4 L13.0 -18.3 L10.1 -17.4 L3.5 -12.8 L4.8 -8.6 L4.8 -5.1 L4.0 -3.3 L2.4 -2.2 L0.9 -2.0 L-1.1 -4.2 L-3.5 -2.6 L-6.2 -2.9 L-9.0 2.2 L-6.4 4.8 L-6.6 6.2 L-5.5 6.8 L-5.7 8.1 L-6.8 8.8 L-4.8 9.2 L-4.0 10.6 L2.0 10.3 L5.3 8.4 L10.6 7.9 L22.2 4.8 L25.5 2.9 L30.1 -5.5 L34.1 -8.4 L34.3 -9.0 L33.0 -10.6 Z M12.5 -3.5 L13.2 -1.1 L12.1 1.3 L10.6 2.6 L7.9 2.4 L7.0 0.2 L7.0 -1.1 L7.9 -2.4 L10.3 -3.7 Z M68.6 -16.9 L64.7 -22.4 L62.5 -23.5 L58.1 -24.4 L45.3 -23.1 L43.3 -22.2 L34.8 -20.9 L35.0 -20.2 L38.5 -18.5 L41.1 -18.3 L49.5 -15.8 L62.0 -16.7 L68.0 -16.3 Z M-21.1 -28.8 L-20.7 -26.0 L-22.7 -22.0 L-22.2 -19.6 L-23.3 -18.0 L-21.6 -14.5 L-18.7 -12.5 L-17.4 -10.8 L-15.0 -11.2 L-15.2 -15.6 L-13.4 -18.7 L-11.7 -19.8 L-9.2 -17.6 L-8.6 -13.4 L-9.0 -10.1 L-6.8 -6.8 L-6.2 -6.8 L-4.6 -8.8 L-1.8 -9.5 L0.2 -12.3 L3.5 -14.5 L2.4 -20.5 L0.4 -21.8 L0.2 -23.5 L-0.9 -24.4 L-3.3 -25.1 L-7.7 -27.7 L-16.1 -30.8 L-20.0 -30.1 Z M37.2 -35.4 L41.6 -32.6 L43.8 -28.8 L48.4 -29.0 L48.2 -30.1 L49.9 -31.5 L49.5 -34.5 L46.4 -36.5 L41.4 -36.5 L39.6 -35.6 Z M-51.7 -37.6 L-51.7 -37.0 L-49.3 -35.6 L-48.4 -33.7 L-46.4 -32.1 L-44.9 -20.2 L-37.4 -5.1 L-38.7 -3.7 L-40.3 -4.0 L-43.8 -7.7 L-47.3 -13.0 L-50.6 -20.7 L-50.8 -24.9 L-51.9 -25.3 L-53.2 -22.4 L-51.7 -18.0 L-51.3 -12.5 L-51.9 -11.4 L-52.1 -6.8 L-53.5 -3.7 L-53.2 -3.1 L-52.1 -2.4 L-50.2 -2.6 L-48.4 -2.0 L-44.7 -2.4 L-42.7 -1.8 L-38.5 1.5 L-37.2 4.4 L-36.1 5.3 L-22.4 9.7 L-24.0 8.8 L-26.2 5.3 L-26.8 2.9 L-28.2 1.3 L-30.8 -4.6 L-35.2 -17.6 L-37.2 -28.6 L-46.4 -33.7 L-49.1 -37.0 Z M-14.3 -38.7 L-14.1 -37.6 L-13.2 -37.2 Z M-15.8 -45.1 L-16.1 -44.7 L-15.2 -44.2 Z M-52.4 -44.9 L-52.1 -44.4 L-48.6 -44.4 L-44.9 -42.2 L-48.2 -42.0 L-51.7 -43.3 L-51.0 -39.2 L-46.4 -37.6 L-44.7 -40.3 L-42.2 -39.6 L-40.5 -39.8 L-47.1 -44.2 L-51.5 -45.8 Z M-40.5 -47.5 L-38.7 -46.4 L-37.6 -46.6 L-39.6 -47.7 Z M-50.2 -47.1 L-44.0 -44.7 L-42.9 -46.0 L-43.8 -48.0 L-47.5 -49.3 L-49.1 -48.8 Z M35.0 -50.4 L27.3 -54.3 L23.3 -55.0 L20.7 -54.1 L11.4 -47.5 L11.9 -46.4 L9.2 -44.2 L8.6 -42.7 L9.9 -42.2 L11.7 -42.9 L16.1 -42.9 L18.9 -44.2 L24.6 -43.8 L32.6 -47.3 L34.1 -47.3 L35.0 -48.4 Z M4.2 -61.6 L1.1 -60.7 L-3.1 -58.3 L-7.9 -52.8 L-11.9 -46.6 L-13.6 -45.5 L-13.4 -44.4 L-14.7 -43.3 L-15.2 -41.6 L-14.1 -39.8 L-7.5 -34.8 L-4.6 -35.4 L-1.5 -40.9 L-0.4 -42.0 L0.7 -42.0 L1.8 -43.1 L1.8 -44.2 L5.1 -47.5 L3.7 -47.5 L3.1 -51.0 L5.5 -55.4 L5.7 -57.2 L6.8 -58.3 L6.8 -59.8 L5.1 -60.5 Z M-13.6 -43.6 L-11.4 -44.7 L-7.0 -40.5 L-5.9 -38.7 L-6.2 -37.8 L-7.9 -36.7 L-9.5 -37.2 L-12.5 -40.3 Z";

/**
 * One leaf silhouette, positioned and rotated by the caller. Used for the
 * corner leaf behind "Our story" and the single leaf drifting in the hero.
 */
export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox={LEAF_VIEWBOX} className={className} aria-hidden="true">
      <path d={LEAF_D} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/**
 * Tiled leaf pattern at low opacity, one tone on its own ground. Caller sets
 * the tone and opacity via `currentColor` (e.g. `text-cream/5`, `text-ink/5`).
 */
export function LeafPattern({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={cn("pointer-events-none", className)} aria-hidden="true">
      <defs>
        <pattern id={id} width="190" height="190" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <svg viewBox={LEAF_VIEWBOX} width="190" height="190">
            <path d={LEAF_D} fill="currentColor" fillRule="evenodd" />
          </svg>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Tonal leaves: the body's leaf tile in reverse, one darker tone on the glaze
 * grounds (`.leaf-tone` in globals.css). `clear` is a CSS mask image, opaque
 * where the leaves show, transparent over the copy so text stays pattern-free.
 */
export function LeafTone({ clear }: { clear: string }) {
  return <div aria-hidden="true" className="leaf-tone" style={{ "--leaf-clear": clear } as CSSProperties} />;
}

/**
 * The plate leaf in full colour: the v5 hi-fi render (watercolour wash, lime
 * bleed, glaze sheen) of the v4 trace, as a transparent WebP. Caller sets the
 * size; `sizes` is the rendered width, for the browser to pick from the srcset.
 */
const PLATE_LEAF = "/images/brand/plate-leaf";

export function PlateLeaf({ className, sizes }: { className?: string; sizes: string }) {
  return (
    // Pre-sized files; next/image cannot build a srcset for a static export without a loader.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${PLATE_LEAF}-1420.webp`}
      srcSet={`${PLATE_LEAF}-710.webp 710w, ${PLATE_LEAF}-1420.webp 1420w`}
      sizes={sizes}
      width={1420}
      height={1300}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
