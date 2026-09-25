// Keeps full-resolution originals in assets-original/ and writes web-sized
// copies (max 2400px long edge, same path, name and format) to public/images/.
// Safe to re-run: originals are only copied once, copies are always regenerated.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = "public/images";
const ORIGINALS = "assets-original";
const MAX = 2400;

const files = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) files.push(p);
  }
};
walk(PUBLIC);

let resized = 0;
let before = 0;
let after = 0;
for (const file of files) {
  const rel = path.relative(PUBLIC, file);
  const original = path.join(ORIGINALS, rel);
  if (!fs.existsSync(original)) {
    fs.mkdirSync(path.dirname(original), { recursive: true });
    fs.copyFileSync(file, original);
  }
  const input = fs.readFileSync(original);
  before += input.length;
  const meta = await sharp(input).metadata();
  if (Math.max(meta.width ?? 0, meta.height ?? 0) <= MAX) {
    fs.writeFileSync(file, input);
    after += input.length;
    continue;
  }
  let pipeline = sharp(input).rotate().resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true });
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9 });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: 86 });
  else pipeline = pipeline.jpeg({ quality: 86, mozjpeg: true });
  const out = await pipeline.toBuffer();
  fs.writeFileSync(file, out);
  after += out.length;
  resized++;
}
console.log(`images: ${files.length}, resized: ${resized}, originals: ${(before / 1e6).toFixed(0)} MB, web copies: ${(after / 1e6).toFixed(0)} MB`);
