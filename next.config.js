/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "dl.airtable.com",
      "lh3.googleusercontent.com",
      "openseauserdata.com",
      "nftotaku.vercel.app",
      "nftotaku.xyz",
      "hxyufkirxytryojpqkne.supabase.co",
      "i.seadn.io",
      "storage.googleapis.com",
      "weev.media",
    ],
  },
  experimental: {
    optimizeFonts: true,
    scrollRestoration: true,
  },
});

module.exports = nextConfig
