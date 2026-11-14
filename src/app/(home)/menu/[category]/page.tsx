import { notFound } from "next/navigation";
import { Fragment } from "react";
import MENU from "@/content/menu.json";
import type { MenuData, MenuItem } from "@/content/types";
import { LeafTone, PlateLeaf } from "@/components/ui/LeafMotif";
import { Photo } from "@/components/ui/Photo";

const DATA = MENU as MenuData;

const TAG_MARK: Record<NonNullable<MenuItem["tags"]>[number], string> = { chef: "♡", khmer: "♦", v: "(V)" };
const TAG_LABEL: Record<NonNullable<MenuItem["tags"]>[number], string> = {
  chef: "Chef's recommendation",
  khmer: "Khmer speciality",
  v: "Vegetarian",
};

export function generateStaticParams() {
  return DATA.categories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[category]">) {
  const { category: key } = await params;
  const category = DATA.categories.find((c) => c.key === key);
  return { title: category?.title ?? "Menu" };
}

/** One category's items, filling the right pane in place of its hover-preview photo. */
export default async function CategoryMenuPage({ params }: PageProps<"/menu/[category]">) {
  const { category: key } = await params;
  const category = DATA.categories.find((c) => c.key === key);
  if (!category) notFound();
  const index = DATA.categories.filter((c) => c.menu === category.menu).findIndex((c) => c.key === key);

  return (
    <div className="md:grid md:min-h-dvh md:grid-cols-[3fr_2fr] md:items-stretch">
      {/* The photo sits on the right of the menu paper, Zuma-style — sticky so it stays in
          view while the paper scrolls past. Mobile stacks it above the paper instead, and
          fades into the paper's glaze at the seam instead of cutting straight to it. */}
      <div className="relative h-[45vh] md:order-2 md:h-auto">
        <div className="md:sticky md:top-0 md:h-dvh">
          <Photo
            slot={{ label: `${category.title} photo`, photo: category.photo }}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-full w-full"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-glaze md:hidden" />
      </div>

      {/* The menu paper: one glaze card throughout — header and footer share the same fill,
          told apart by the leaf-tone wash (faint at top and bottom, clear behind the list)
          instead of a second colour. */}
      <div className="relative isolate flex flex-col bg-glaze text-ink md:order-1">
        <div className="relative px-6 pt-10 pb-8 md:px-12 md:pt-28 lg:px-16">
          <LeafTone clear="linear-gradient(to bottom, #000 18%, transparent 42%)" />
          <PlateLeaf
            sizes="80px"
            className="pointer-events-none absolute top-6 right-6 w-14 rotate-[-12deg] opacity-45 mix-blend-multiply md:top-10 md:right-10 md:w-16"
          />
          <div className="relative">
            <p className="font-mono text-xs opacity-50">{String(index + 1).padStart(2, "0")}</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl">{category.title}</h1>
            {category.note && <p className="mt-4 text-sm italic opacity-60">{category.note}</p>}

            <ul className="mt-10">
              {category.items.map((item, i) => (
                <Fragment key={item.name}>
                  {item.group && item.group !== category.items[i - 1]?.group && (
                    <li aria-hidden="true" className="pt-8 pb-1 font-mono text-[11px] tracking-[0.2em] uppercase opacity-50 first:pt-0">
                      {item.group}
                    </li>
                  )}
                  <li className="border-b border-ink/10 py-6 first:pt-0">
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-display text-xl md:text-2xl">
                        {item.name}
                        {item.tags?.map((tag) => (
                          <span key={tag} title={TAG_LABEL[tag]} className="ml-2 align-middle text-sm opacity-60">
                            {TAG_MARK[tag]}
                          </span>
                        ))}
                      </h3>
                      <span aria-hidden="true" className="flex-1 translate-y-[-4px] border-b border-dotted border-ink/25" />
                      <span className="shrink-0 text-sm tabular-nums">{item.price}</span>
                    </div>
                    {item.description && <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-65">{item.description}</p>}
                  </li>
                </Fragment>
              ))}
            </ul>
            {category.footnote && <p className="mt-6 text-sm italic opacity-50">{category.footnote}</p>}
          </div>
        </div>

        {DATA.legend && (
          <div className="relative mt-auto border-t border-ink/8 bg-glaze px-6 py-6 font-mono text-[11px] leading-relaxed md:px-12 lg:px-16">
            <LeafTone clear="linear-gradient(to top, #000 55%, transparent 100%)" />
            <div className="relative">
              <p className="flex flex-wrap gap-x-5 gap-y-1.5 opacity-70">
                {DATA.legend.tags.map((tag) => (
                  <span key={tag.mark}>
                    <span className="opacity-100">{tag.mark}</span> {tag.label}
                  </span>
                ))}
              </p>
              <p className="mt-4 max-w-xl italic opacity-55">{DATA.legend.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
