/**
 * A media position on the page. While the site is in wireframe stage every slot
 * renders as a labelled placeholder; `photo` records the image planned for it,
 * relative to `assets/photos/`.
 */
export interface Slot {
  label: string;
  photo?: string;
  /** CSS `object-position`, for a published photo whose default crop cuts off the subject. */
  position?: string;
  /** Object-position override below the `md` breakpoint only; desktop keeps the default/`position` crop. */
  mobilePosition?: "left" | "right" | "top" | "bottom";
  /** Reverses the hero's Ken Burns zoom (zoom out instead of in), for a slide the zoom-in crops. */
  zoomOut?: boolean;
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
  cta2?: Link;
}

/** A MediaCard slot that can override the card's title/body/cta while it's active. */
export interface MediaCardSlot extends Slot {
  title?: string;
  body?: string[];
  cta?: Link;
}

export interface MediaCard {
  title: string;
  /** Concept/story paragraph, then a shorter semicolon-list paragraph — Amazónico's menu-card copy shape. */
  body: [string, string];
  cta: Link;
  /** Crossfades through the slots in order, same autoplay move as the Offers carousel. Each slot may override title/body/cta. */
  slots: MediaCardSlot[];
}

/** A bookable space on the Events page. Copy follows AURA's corporate events deck. */
export interface EventSpace {
  /** Option value in the enquiry form's space list. */
  value: string;
  title: string;
  /** Capacity first, then setting and features, shown as one line under the title. */
  tags: string[];
  body: string[];
  bestFor: string;
  slides: Slot[];
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
  description?: string;
  /** Sits above the item as a small subheading when it differs from the previous item's, e.g. "Beef" within Mains. */
  group?: string;
  /** Small marks after the name: chef's recommendation, Khmer speciality, vegetarian. */
  tags?: ("chef" | "khmer" | "v")[];
}

export interface MenuCategory {
  key: string;
  title: string;
  /** Line under the category title, e.g. the steak sides' "Additional side $5". */
  note?: string;
  items: MenuItem[];
  /** Fine print at the end of the category, e.g. the steak breed note. */
  footnote?: string;
}

export interface MenuData {
  tabs: { key: string; label: string }[];
  categories: MenuCategory[];
  /** Shown once after the last category: the allergen/dietary legend and tax note. */
  legend?: string;
}

export type GalleryCategory = "venue" | "menu" | "events";

export interface GalleryItem {
  category: GalleryCategory;
  photo: string;
  alt: string;
  width: number;
  height: number;
}
