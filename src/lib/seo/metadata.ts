export function generateMetadata({
	title,
	description,
	image,
	url,
	type = 'website',
}: {
	title: string
	description: string
	image?: string
	url: string
	type?: 'website' | 'article' | 'product'
}) {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			siteName: 'Your Jewelry Store',
			images: image ? [image] : undefined,
			locale: 'en_US',
			type,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: image ? [image] : undefined,
		},
		alternates: {
			canonical: url,
		},
	}
}