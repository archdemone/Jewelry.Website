/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	transpilePackages: [
		'@radix-ui/react-icons',
		'@radix-ui/react-dialog',
		'@radix-ui/react-dropdown-menu',
		'@radix-ui/react-navigation-menu',
		'@radix-ui/react-separator',
		'@radix-ui/react-sheet',
	],
};

module.exports = nextConfig;


