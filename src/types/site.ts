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
  image: string;
  alt: string;
  width: number;
  height: number;
}
