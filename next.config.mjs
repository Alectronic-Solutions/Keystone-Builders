/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages (per CLAUDE.md tech stack).
  output: 'export',
  // next/image optimization is incompatible with static export, so serve
  // images unoptimized. Real images arrive in later sessions.
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages serves clean directory URLs more reliably with this on.
  trailingSlash: true,
};

export default nextConfig;
