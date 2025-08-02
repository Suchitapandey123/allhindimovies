/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add your image host domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allow all paths from this host
      },
    ],
    // Optional optimization settings
    minimumCacheTTL: 60, // 60 seconds cache
    formats: ['image/webp'], // Prefer WebP format
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Standard device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Common image sizes
  },
  // Other Next.js config options...
}

export default nextConfig