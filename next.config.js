/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'localhost',
			'images.unsplash.com',
			'res.cloudinary.com',
			'cdn.shopify.com'
		],
	},
};

module.exports = nextConfig;


