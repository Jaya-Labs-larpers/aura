import type { Metadata } from "next";
import { MENU_PAGE } from "@/content/pages";

export const metadata: Metadata = {
  title: MENU_PAGE.hero.title,
  description: MENU_PAGE.hero.text,
};

// No category selected yet: MenuShell fills the right pane with the active top menu's own
// photo (see src/content/menu.json's `menus[].photo`), so there's nothing to render here.
export default function MenuPage() {
  return null;
}
