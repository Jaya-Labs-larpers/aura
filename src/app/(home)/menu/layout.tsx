import type { ReactNode } from "react";
import { MenuShell } from "@/components/features/menu/MenuShell";
import MENU from "@/content/menu.json";
import type { MenuData } from "@/content/types";

/** Sticky category list, shared by the hub and every /menu/[category] page. */
export default function MenuLayout({ children }: { children: ReactNode }) {
  return <MenuShell data={MENU as MenuData}>{children}</MenuShell>;
}
