/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
const Webpack = require('webpack');

const securityHeaders = []; // handled in middleware

const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_ASSET_VERSION: process.env.NODE_ENV === 'production' ? '1' : `${Date.now()}`,
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
	},
	async headers() {
		const headers = [];
		if (securityHeaders.length > 0) {
			headers.push({ source: '/:path*', headers: securityHeaders });
		}
		headers.push({
			source: '/_next/static/:path*',
			headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
		});
		headers.push({
			source: '/images/:path*',
			headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
		});
		return headers;
	},
	webpack: (config, { dev, isServer }) => {
		// Silence large bundle warnings in dev hot-reload; keep defaults in prod
		if (dev) {
			config.performance = false;
		} else {
			config.performance = {
				hints: 'warning',
				maxEntrypointSize: 1024000, // Increased to 1MB for production
				maxAssetSize: 1024000,
			};
		}
		
		// Fix server-side rendering issues
		if (isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				net: false,
				tls: false,
			};
			// Provide global fallbacks for server-side rendering
			config.plugins.push(
				new Webpack.DefinePlugin({
					self: 'globalThis',
				})
			);
		}
		
		return config;
	},
};

module.exports = withBundleAnalyzer(nextConfig);

