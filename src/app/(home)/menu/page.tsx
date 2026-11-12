import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { MENU_PAGE } from "@/content/pages";

export const metadata: Metadata = {
  title: MENU_PAGE.hero.title,
  description: MENU_PAGE.hero.text,
};

/** Menu hub: no category selected yet, so the right pane just shows a photo — pick one from the left. */
export default function MenuPage() {
  return <Photo slot={{ label: "Menu overview", photo: "menu/hub/" }} sizes="(min-width: 768px) 60vw, 100vw" className="h-full min-h-[70vh] w-full" />;
}
