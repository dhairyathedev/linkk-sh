/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.google.com", "avatar.vercel.sh"]
  }
}

module.exports = nextConfig
