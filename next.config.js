/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development optimizations
  ...(process.env.NODE_ENV === 'development' && {
    // Disable caching in development
    generateEtags: false,
  }),

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features
  experimental: {
    // Better development experience
    optimizeCss: true,
  },

  // Webpack configuration for better hot reloading
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Ensure CSS changes trigger full reload
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      
      // Disable performance hints in development
      config.performance = false;
    }
    return config;
  },

  // Headers for development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development' 
              ? 'no-cache, no-store, must-revalidate' 
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development' 
              ? 'no-cache, no-store, must-revalidate' 
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

