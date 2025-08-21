import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Completely disable React dev overlay to fix context errors
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Disable React dev overlay
  reactStrictMode: false,
  // Disable error overlay
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Disable React dev overlay completely
  env: {
    NEXT_DISABLE_REACT_DEV_OVERLAY: 'true',
    NEXT_DISABLE_ERROR_OVERLAY: 'true',
  },
  // Completely disable React dev overlay to fix context errors
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Aggressively disable React dev overlay
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dev-overlay': false,
        '@next/react-dev-overlay': false,
        'next/dist/client/components/react-dev-overlay': false,
        'next/dist/server/dev/next-dev-server': false,
        'next/dist/client/components/react-dev-overlay/pages/ReactDevOverlay': false,
        'next/dist/client/components/react-dev-overlay/shared': false,
      };
      
      // Disable error overlay completely
      config.plugins = config.plugins.filter(plugin => {
        const pluginName = plugin.constructor.name;
        return !pluginName.includes('ReactDevOverlay') && 
               !pluginName.includes('ErrorOverlay') &&
               !pluginName.includes('HotModuleReplacement');
      });
      
      // Disable React dev overlay at runtime
      config.define = {
        ...config.define,
        'process.env.NEXT_DISABLE_REACT_DEV_OVERLAY': 'true',
        'process.env.NEXT_DISABLE_ERROR_OVERLAY': 'true',
        'process.env.NODE_ENV': '"development"',
      };
      
      // Completely disable React dev overlay
      config.externals = config.externals || [];
      config.externals.push('react-dev-overlay');
      config.externals.push('@next/react-dev-overlay');
    }
    
    // Optimize bundle size in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
          },
        },
      };
    }

    // Reduce bundle size by excluding unnecessary modules
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        '@sentry/node': '@sentry/browser',
      });
    }

    return config;
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 2000, 2400, 3000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
          },
        },
      };
    }

    // Reduce bundle size by excluding unnecessary modules
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        '@sentry/node': '@sentry/browser',
      });
    }

    return config;
  },
  // Reduce bundle size by optimizing imports
  transpilePackages: ['@radix-ui/react-icons', 'lucide-react'],
};

export default nextConfig;
