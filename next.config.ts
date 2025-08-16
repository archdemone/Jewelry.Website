import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', 'framer-motion'],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
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
			}
		}

		// Reduce bundle size by excluding unnecessary modules
		config.externals = config.externals || []
		if (!isServer) {
			config.externals.push({
				'@sentry/node': '@sentry/browser',
			})
		}

		return config
	},
	// Reduce bundle size by optimizing imports
	transpilePackages: ['@radix-ui/react-icons', 'lucide-react'],
}

export default nextConfig


