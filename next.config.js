/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "dl.airtable.com",
      "lh3.googleusercontent.com",
      "openseauserdata.com",
      "gachi-collection.vercel.app",
      "hxyufkirxytryojpqkne.supabase.co",
      "i.seadn.io",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig
