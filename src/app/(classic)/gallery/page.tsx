import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import galleryData from "@/data/gallery.json";
import type { GalleryItem } from "@/types/site";

export const metadata: Metadata = {
  title: "Gallery - AURA",
};

export default function GalleryPage() {
  return <GalleryGrid items={galleryData as GalleryItem[]} />;
}
