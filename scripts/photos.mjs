// Publishes the photos a page uses. Reads every `photo: "..."` path from the
// given content files, writes resized WebP copies to `public/images/photos/`,
// and records them in `src/content/photos.json`. A slot renders its photo only
// once it is listed there; everything else stays a placeholder.
//
// `photo` paths are relative to `assets/photos/`. When the full-resolution
// original of a photo is in `assets-original/` (local only, not in git), that
// file is used instead, so large slots stay sharp on high-density screens.
//
//   node scripts/photos.mjs src/content/home.ts
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = "assets/photos";
const OUTPUT = "public/images/photos";
const MANIFEST = "src/content/photos.json";
const WIDTHS = [640, 1280, 1920, 2560, 3200];
const QUALITY = 82;

// Where each `assets/photos/` folder's originals live in `assets-original/`.
const ORIGINALS = {
  site: ["home", "about", "events", "team"],
  events: ["gallery/meetings-events"],
  venue: ["gallery/venue"],
  "venue-highlights": ["gallery/highlights"],
  menu: ["menu"],
};

const exists = (file) => access(file).then(() => true, () => false);

async function sourceFor(photo) {
  const [folder, ...rest] = photo.split("/");
  for (const dir of ORIGINALS[folder] ?? []) {
    const original = path.join("assets-original", dir, ...rest);
    if (await exists(original)) return original;
  }
  return path.join(SOURCE, photo);
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/photos.mjs <content file>...");
  process.exit(1);
}

const photos = new Set();
for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/photo:\s*"([^"]+)"/g)) photos.add(match[1]);
}

const manifest = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));

for (const photo of [...photos].sort()) {
  const input = await sourceFor(photo);
  const meta = await sharp(input).metadata();
  const { width, height } = meta.autoOrient ?? meta;
  const name = photo.replace(/\.[^.]+$/, "");
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))];

  await mkdir(path.dirname(path.join(OUTPUT, name)), { recursive: true });
  for (const w of widths) {
    await sharp(input)
      .rotate()
      .resize({ width: w })
      .sharpen({ sigma: 1, m1: 0.5, m2: 0.6 })
      .webp({ quality: QUALITY, smartSubsample: true })
      .toFile(path.join(OUTPUT, `${name}-${w}.webp`));
  }

  manifest[photo] = { src: `/images/photos/${name}`, width, height, widths };
  console.log(`${photo} ← ${input} (${width}×${height}) → ${widths.join(", ")}`);
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
