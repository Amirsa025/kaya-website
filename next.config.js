/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true,
    typedRoutes: true
  }
}

module.exports = nextConfig