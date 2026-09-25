// Tailwind v3 quirk: a responsive font-size (e.g. md:text-base) also sets
// line-height and beats a base `leading-*` class. Tailwind v4 keeps the
// leading value. This adds the matching responsive leading so v4 renders
// exactly like the original v3 site. Idempotent.
import fs from "node:fs";
import path from "node:path";

const LH = { xs: "4", sm: "5", base: "6", lg: "7", xl: "7", "2xl": "8", "3xl": "9", "4xl": "10", "5xl": "none", "6xl": "none", "7xl": "none" };
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else if (p.endsWith(".tsx")) files.push(p);
});
walk("src");
let changed = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const out = src.replace(/"([^"\n]*\bleading-(?:none|tight|snug|normal|relaxed|loose)\b[^"\n]*)"/g, (m, cls) => {
    const adds = [];
    for (const [, bp, size] of cls.matchAll(/\b(sm|md|lg|xl):text-(xs|sm|base|lg|xl|[2-7]xl)\b/g)) {
      const want = `${bp}:leading-${LH[size]}`;
      if (!cls.includes(want)) adds.push(want);
    }
    return adds.length ? `"${cls} ${adds.join(" ")}"` : m;
  });
  if (out !== src) { fs.writeFileSync(f, out); changed++; console.log("patched", f); }
}
console.log("files changed:", changed);
