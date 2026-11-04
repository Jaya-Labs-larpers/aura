/**
 * A media position on the page. While the site is in wireframe stage every slot
 * renders as a labelled placeholder; `photo` records the image planned for it,
 * relative to `assets/photos/`.
 */
export interface Slot {
  label: string;
  photo?: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface Feature {
  eyebrow?: string;
  title: string;
  body: string[];
  slot: Slot;
  cta?: Link;
}

export interface Card {
  /** Exactly two lines, rendered one per line so the title is always two lines. */
  title: [string, string];
  text?: string;
  slot: Slot;
  cta: Link;
}

export interface PageHero {
  eyebrow?: string;
  title: string;
  text?: string;
  slot: Slot;
}

export interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export interface MenuCategory {
  key: string;
  title: string;
  items: MenuItem[];
}

export interface MenuData {
  tabs: { key: string; label: string }[];
  categories: MenuCategory[];
}

export type GalleryCategory = "venue" | "menu" | "events";

export interface GalleryItem {
  category: GalleryCategory;
  photo: string;
  alt: string;
  width: number;
  height: number;
}
