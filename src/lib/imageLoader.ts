// imageLoader: custom next/image loader for the static export. Maps a photo in
// /images to the closest pre-built WebP variant (see scripts/optimize-images.mjs),
// so the srcset next/image emits serves small files to phones and large ones to desktops.
import manifest from "./image-manifest.json";

const widthsByName = manifest as Record<string, number[]>;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const match = src.match(/^(.*\/images)\/([^/]+)\.jpe?g$/i);
  const widths = match ? widthsByName[match[2]] : undefined;
  // Anything without variants (SVGs, unknown files) is served as-is.
  if (!match || !widths) return src;

  const best = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return `${match[1]}/opt/${match[2]}-${best}.webp`;
}
