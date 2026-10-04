// optimize-images: builds responsive WebP variants of every JPG in public/images
// so phones download a right-sized file instead of the full original.
// Output goes to public/images/opt/<name>-<width>.webp, and the available widths
// per image are written to src/lib/image-manifest.json for the next/image loader.
// Run with `npm run images` after adding or replacing a photo, then commit the output.
import { readdir, mkdir, stat, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/images";
const OUT_DIR = "public/images/opt";
const MANIFEST = "src/lib/image-manifest.json";

// Must stay in sync with images.deviceSizes + images.imageSizes in next.config.mjs.
const WIDTHS = [256, 384, 640, 828, 1080, 1400, 1920];
const QUALITY = 72;

async function isFresh(src, out) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

await mkdir(OUT_DIR, { recursive: true });
const files = (await readdir(SRC_DIR)).filter((f) => /\.jpe?g$/i.test(f)).sort();
const manifest = {};
let written = 0;

for (const file of files) {
  const name = file.replace(/\.jpe?g$/i, "");
  const src = path.join(SRC_DIR, file);
  const { width: original } = await sharp(src).metadata();

  // Every standard width below the original, plus the original itself as the top size.
  const widths = WIDTHS.filter((w) => w < original);
  widths.push(Math.min(original, WIDTHS[WIDTHS.length - 1]));
  manifest[name] = widths;

  for (const w of widths) {
    const out = path.join(OUT_DIR, `${name}-${w}.webp`);
    if (await isFresh(src, out)) continue;
    await sharp(src).resize({ width: w }).webp({ quality: QUALITY, effort: 6 }).toFile(out);
    written++;
  }
}

// Remove variants whose source photo was deleted or renamed.
const expected = new Set(
  Object.entries(manifest).flatMap(([name, widths]) => widths.map((w) => `${name}-${w}.webp`))
);
let removed = 0;
for (const file of await readdir(OUT_DIR)) {
  if (!expected.has(file)) {
    await unlink(path.join(OUT_DIR, file));
    removed++;
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`optimize-images: ${files.length} images, ${written} variants written, ${removed} stale removed`);
