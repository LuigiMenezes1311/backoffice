/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove swcMinify as it's now default in Next.js 14+
  reactStrictMode: true,
  // Keep error ignoring for initial deployment, but consider removing later
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // Add domains if you're using external image sources
    domains: [],
  },
  // Add experimental features if needed
  experimental: {
    // serverActions: true, // No longer needed in Next.js 14+
  }
}

export default nextConfig
