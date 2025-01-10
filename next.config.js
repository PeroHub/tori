/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com'
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  // Ensure the middleware is correctly configured
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/src/app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;