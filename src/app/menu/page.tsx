import type { Metadata } from "next";
import { MenuBrowser } from "@/components/features/menu/MenuBrowser";
import { CtaBand } from "@/components/sections/Bands";
import { PageHero } from "@/components/sections/PageHero";
import menu from "@/content/menu.json";
import { MENU_PAGE } from "@/content/pages";
import type { MenuData } from "@/content/types";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <>
      <PageHero {...MENU_PAGE.hero} />
      <MenuBrowser data={menu as MenuData} />
      <CtaBand />
    </>
  );
}
