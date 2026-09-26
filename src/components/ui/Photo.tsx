import type { Slot } from "@/content/types";
import PHOTOS from "@/content/photos.json";
import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/cn";

interface PublishedPhoto {
  src: string;
  width: number;
  height: number;
  widths: number[];
}

const published: Record<string, PublishedPhoto | undefined> = PHOTOS;

/** Whether the slot's photo has been published by `npm run photos`. */
export function hasPhoto(slot: Slot) {
  return Boolean(slot.photo && published[slot.photo]);
}

interface PhotoProps {
  slot: Slot;
  /** Rendered width of the image, for the browser to pick from the srcset. */
  sizes: string;
  className?: string;
  fit?: "cover" | "contain";
  /** Passed to the placeholder shown while the photo is unpublished. */
  bare?: boolean;
}

/**
 * The slot's photo as a responsive WebP, or its placeholder when the photo has
 * not been published yet (see `scripts/photos.mjs`).
 */
export function Photo({ slot, sizes, className, fit = "cover", bare }: PhotoProps) {
  const photo = slot.photo ? published[slot.photo] : undefined;
  if (!photo) return <Placeholder slot={slot} bare={bare} className={className} />;

  const largest = photo.widths[photo.widths.length - 1];
  return (
    // next/image cannot build a srcset for a static export without a loader; the files are pre-sized.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${photo.src}-${largest}.webp`}
      srcSet={photo.widths.map((w) => `${photo.src}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={slot.label}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
