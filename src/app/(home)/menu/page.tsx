import type { Metadata } from "next";
import { MenuBrowser } from "@/components/features/menu/MenuBrowser";
import { Footer } from "@/components/layout/Footer";
import { ReserveCard } from "@/components/sections/Bands";
import { PageHero } from "@/components/sections/PageHero";
import { MENU_PAGE } from "@/content/pages";
import MENU from "@/content/menu.json";
import type { MenuData } from "@/content/types";

export const metadata: Metadata = {
  title: MENU_PAGE.hero.title,
  description: MENU_PAGE.hero.text,
};

/** Page hero, the full menu, then a reserve band. */
export default function MenuPage() {
  return (
    <>
      <PageHero {...MENU_PAGE.hero} />
      <MenuBrowser data={MENU as MenuData} />
      <ReserveCard title="Reserve your table" />
      <Footer />
    </>
  );
}
