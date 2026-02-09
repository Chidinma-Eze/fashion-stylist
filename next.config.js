/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow serving images from the public folder by using relative paths
    // No remote patterns needed since images live in /public
  }
}

module.exports = nextConfig
