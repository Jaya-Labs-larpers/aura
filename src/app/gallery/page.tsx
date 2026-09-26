import type { Metadata } from "next";
import { GalleryGrid } from "@/components/features/gallery/GalleryGrid";
import { PageHero } from "@/components/sections/PageHero";
import gallery from "@/content/gallery.json";
import { GALLERY_PAGE } from "@/content/pages";
import type { GalleryItem } from "@/content/types";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero {...GALLERY_PAGE.hero} />
      <GalleryGrid items={gallery as GalleryItem[]} />
    </>
  );
}
