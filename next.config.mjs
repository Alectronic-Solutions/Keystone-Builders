/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Keystone-Builders',
  // Static export cannot resize images at request time, so photos are pre-built
  // as WebP variants (npm run images) and this loader picks the right one per srcset width.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    deviceSizes: [640, 828, 1080, 1400, 1920],
    imageSizes: [256, 384],
  },
  trailingSlash: true,
};

export default nextConfig;
