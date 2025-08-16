/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

const securityHeaders = []; // handled in middleware

const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_ASSET_VERSION: '2',
	},
	transpilePackages: [
		'@radix-ui/react-icons',
		'@radix-ui/react-dialog',
		'@radix-ui/react-dropdown-menu',
		'@radix-ui/react-navigation-menu',
		'@radix-ui/react-separator',
		'@radix-ui/react-sheet',
	],
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1600, 2000, 2400, 3000],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 365,
	},
	swcMinify: true,
	compress: true,
	poweredByHeader: false,
	experimental: {
		instrumentationHook: true,
		webVitalsAttribution: ['CLS', 'LCP'],
		// optimizeCss: true, // disabled to avoid critters dependency issues
		optimizePackageImports: ['lucide-react', '@headlessui/react'],
	},
	async headers() {
		const headers = []
		if (securityHeaders.length > 0) {
			headers.push({ source: '/:path*', headers: securityHeaders })
		}
		headers.push({ source: '/_next/static/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] })
		headers.push({ source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] })
		return headers
	},
	webpack: (config, { dev, isServer }) => {
		config.performance = {
			hints: 'warning',
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		};
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					default: false,
					vendors: false,
					vendor: { name: 'vendor', chunks: 'all', test: /node_modules/, priority: 20 },
					common: { name: 'common', minChunks: 2, chunks: 'all', priority: 10, reuseExistingChunk: true, enforce: true },
				},
			};
		}
		return config;
	},
};

module.exports = withBundleAnalyzer(nextConfig);

