"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MenuData } from "@/types/site";

const ACTIVE_TAB =
  "font-semibold relative pb-3 text-[#F2FFF7] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[85%] after:h-[2.5px] after:bg-linear-to-r/srgb after:from-transparent after:via-[#D92B78] after:to-transparent after:rounded-full";
const INACTIVE_TAB = "text-gray-400 hover:text-[#F2FFF7] pb-3";

export function MenuTabs({ data }: { data: MenuData }) {
  const [activeTab, setActiveTab] = useState(data.tabs[0]?.key ?? "");

  return (
    <div className="pb-24 bg-[#002117]">
      {/* MENU NAVIGATION TABS SECTION */}
      <section className="sticky top-[72px] md:top-[80px] z-40 overflow-x-auto shadow-xl backdrop-blur-md border-t border-b border-white/10 bg-[#002117]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-start items-center space-x-8 py-4 text-sm font-medium tracking-wider whitespace-nowrap">
          {data.tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn("transition-all duration-200 cursor-pointer", activeTab === tab.key ? ACTIVE_TAB : INACTIVE_TAB)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* MENU SECTIONS DISPLAY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12">
        {data.categories.map((category) => (
          <section key={category.key} className={cn("w-full", activeTab !== category.key && "hidden")}>
            <div className="mb-10">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold tracking-wide text-[#F2FFF7]">{category.title}</h2>
                <div className="grow h-[1px] bg-linear-to-r/srgb from-[#D92B78]/50 to-transparent"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="menu-card flex flex-col bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl hover:border-[#D92B78]/40 transition-colors duration-200"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-base font-bold text-[#F2FFF7]">{item.name}</h3>
                    <span className="font-bold text-sm text-[#FF0577]">{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
