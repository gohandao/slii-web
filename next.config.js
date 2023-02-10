/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  experimental: {
    optimizeFonts: true,
    scrollRestoration: true,
  },
  images: {
    domains: [
      "dl.airtable.com",
      "lh3.googleusercontent.com",
      "openseauserdata.com",
      "slii.vercel.app",
      "slii.vercel.app",
      "slii.xyz",
      "hxyufkirxytryojpqkne.supabase.co",
      "i.seadn.io",
      "storage.googleapis.com",
      "weev.media",
      "placehold.jp",
    ],
  },
  pageExtensions: ["page.tsx", "page.ts", "page.js"],
  reactStrictMode: false,
  swcMinify: true,
});

module.exports = nextConfig
