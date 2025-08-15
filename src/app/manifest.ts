import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Your Jewelry Store',
		short_name: 'Jewelry Store',
		description: 'Exquisite handcrafted jewelry for every occasion',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#D4AF37',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '64x64 32x32 24x24 16x16',
				type: 'image/x-icon',
			},
			{
				src: '/icon-192.png',
				type: 'image/png',
				sizes: '192x192',
			},
			{
				src: '/icon-512.png',
				type: 'image/png',
				sizes: '512x512',
			},
		],
	}
}