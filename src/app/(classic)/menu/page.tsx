import type { Metadata } from "next";
import { MenuTabs } from "@/components/menu/MenuTabs";
import menuData from "@/data/menu.json";
import type { MenuData } from "@/types/site";

export const metadata: Metadata = {
  title: "Menu - AURA",
};

export default function MenuPage() {
  return (
    <>
      {/* HERO / TITLE SECTION */}
      <section className="py-24 px-6 text-center flex items-center justify-center min-h-[320px] bg-[#083B2C]">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4 text-[#F2FFF7]">Our Menu</h1>
          <p className="text-base md:text-lg text-emerald-100 font-light leading-relaxed tracking-wide md:leading-7">
            A carefully curated selection of dishes that celebrate seasonal ingredients and culinary artistry.
          </p>
        </div>
      </section>

      <MenuTabs data={menuData as MenuData} />
    </>
  );
}
