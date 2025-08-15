/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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


