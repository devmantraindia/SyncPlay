/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/devmantra-syncplay' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/devmantra-syncplay/' : '',
  trailingSlash: true,
}

module.exports = nextConfig
