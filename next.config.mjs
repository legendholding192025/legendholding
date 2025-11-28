/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.legendholding.com' },
    ],
  },
  // Increase body size limit for API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/tinymce/:path*',
        destination: '/tinymce/:path*',
      },
    ]
  },
}

export default nextConfig
