// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable type checking during builds for better code quality
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Keep: valid, helpful for bundle size.
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'react-hook-form',
      'date-fns',
      'clsx',
      'tailwind-merge',
      'react-hot-toast',
      'zustand',
      'zod',
      '@hookform/resolvers',
    ],
    optimizeCss: true,
    // Keep turbo svg rule if you use it; safe to leave.
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Remove invalid/unstable flags that trigger warnings:
    // optimizeServerReact: true,
    // taint: true,
    // webpackBuildWorker: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },

  images: {
    // Prefer remotePatterns so localhost:3000/3001 work in both envs
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'http', hostname: 'localhost', port: '3001' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
    path: '/_next/image',
  },

  compress: true, // Next handles compression responses; no webpack compression plugin needed.
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Remove 'standalone' unless you’re actually running the standalone server.
  // If you need it for deploy, set NEXT_OUTPUT=standalone in that environment and use the conditional below.
  ...(process.env.NEXT_OUTPUT === 'standalone' ? { output: 'standalone' } : {}),

  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 1,
  },
  trailingSlash: false,

  async redirects() {
    return [];
  },

  webpack: (config, { isServer, dev, webpack }) => {
    // Browser fallbacks – keep minimal false shims to avoid polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
        os: false,
        url: false,
        querystring: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        constants: false,
        events: false,
        punycode: false,
        string_decoder: false,
        sys: false,
        timers: false,
        tty: false,
        vm: false,
        domain: false,
        module: false,
        _stream_duplex: false,
        _stream_passthrough: false,
        _stream_readable: false,
        _stream_transform: false,
        _stream_writable: false,
      };
    }

    // Handle sharp as external during build time to prevent build-time evaluation
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        sharp: 'commonjs sharp',
      });
    }

    // Helpful aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-is': require.resolve('react-is'),
      '@': require('path').resolve(__dirname, 'src'),
    };

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      'node_modules',
    ];

    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        minimize: true,
        minimizer: [
          ...config.optimization.minimizer,
          new webpack.optimize.AggressiveMergingPlugin(),
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '~',
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix-ui',
              chunks: 'all',
              priority: 15,
              enforce: true,
            },
            stripe: {
              test: /[\\/]node_modules[\\/]@stripe[\\/]/,
              name: 'stripe',
              chunks: 'all',
              priority: 15,
              enforce: true,
            },
            recharts: {
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              name: 'recharts',
              chunks: 'all',
              priority: 15,
              enforce: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            next: {
              test: /[\\/]node_modules[\\/]next[\\/]/,
              name: 'next',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            utils: {
              test: /[\\/]node_modules[\\/](clsx|tailwind-merge|class-variance-authority)[\\/]/,
              name: 'utils',
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
            forms: {
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              name: 'forms',
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
          },
        },
      };

      // NOTE: Removed compression-webpack-plugin (gzip + brotli) to avoid AJV chain.
      // Your host (Vercel/NGINX/Cloudflare) should handle compression at the edge.
      // If you insist on keeping it, see the alternative below.
    }

    if (!isServer && config.optimization?.splitChunks?.cacheGroups) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
        priority: 30,
      };
    }

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Encoding', value: 'gzip, deflate, br' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Encoding', value: 'gzip, deflate, br' },
        ],
      },
      {
        source: '/_next/image/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Encoding', value: 'gzip, deflate, br' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
  },

  async rewrites() {
    return [{ source: '/api/health', destination: '/api/healthz' }];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
