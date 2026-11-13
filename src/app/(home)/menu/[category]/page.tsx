import { notFound } from "next/navigation";
import { Fragment } from "react";
import MENU from "@/content/menu.json";
import type { MenuData, MenuItem } from "@/content/types";

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
    <div className="md:px-12 md:pt-28 md:pb-24 lg:px-16">
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
            <li className="border-b border-cream/10 py-6 first:pt-0">
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-xl md:text-2xl">
                  {item.name}
                  {item.tags?.map((tag) => (
                    <span key={tag} title={TAG_LABEL[tag]} className="ml-2 align-middle text-sm opacity-60">
                      {TAG_MARK[tag]}
                    </span>
                  ))}
                </h3>
                <span aria-hidden="true" className="flex-1 translate-y-[-4px] border-b border-dotted border-cream/25" />
                <span className="shrink-0 text-sm tabular-nums">{item.price}</span>
              </div>
              {item.description && <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-65">{item.description}</p>}
            </li>
          </Fragment>
        ))}
      </ul>
      {category.footnote && <p className="mt-6 text-sm italic opacity-50">{category.footnote}</p>}

      {DATA.legend && (
        <div className="mt-16 border-t border-cream/10 pt-6 font-mono text-[11px] leading-relaxed">
          <p className="flex flex-wrap gap-x-5 gap-y-1.5 opacity-60">
            {DATA.legend.tags.map((tag) => (
              <span key={tag.mark}>
                <span className="opacity-100">{tag.mark}</span> {tag.label}
              </span>
            ))}
          </p>
          <p className="mt-4 max-w-xl italic opacity-45">{DATA.legend.note}</p>
        </div>
      )}
    </div>
  );
}
