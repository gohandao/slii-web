/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "dl.airtable.com",
      "lh3.googleusercontent.com",
      "openseauserdata.com",
      "gachi.vercel.app",
    ],
  },
  experimental: {
    //scrollRestoration: true,
  },
};

module.exports = nextConfig
