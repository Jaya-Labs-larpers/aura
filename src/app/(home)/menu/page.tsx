import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { MENU_PAGE } from "@/content/pages";

export const metadata: Metadata = {
  title: MENU_PAGE.hero.title,
  description: MENU_PAGE.hero.text,
};

/** Menu hub: no category selected yet, so the right pane just shows a photo — pick one from the left. */
export default function MenuPage() {
  return (
    // Desktop: the right half starts at viewport y=0, so the photo fills it edge to edge behind the
    // header. Mobile: the pane sits below the nav, so normal flow.
    <Photo
      slot={{ label: "Menu overview", photo: "menu/chef-carving.jpg" }}
      sizes="(min-width: 768px) 50vw, 100vw"
      className="h-[70vh] w-full md:h-dvh"
    />
  );
}
