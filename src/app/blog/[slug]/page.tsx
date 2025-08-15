import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { notFound } from 'next/navigation'

const posts = {
	'care-tips': {
		title: 'Essential Jewelry Care Tips',
		date: '2025-01-05',
		author: 'Aurora Team',
		image: '/images/blog/care.jpg',
		content: '<p>Learn how to keep your jewelry looking brand new with simple at-home care.</p>'
	},
	'ring-sizing': {
		title: 'How to Find Your Ring Size',
		date: '2025-01-02',
		author: 'Aurora Team',
		image: '/images/blog/size.jpg',
		content: '<p>Measure accurately at home or with our printable sizer.</p>'
	}
} as const

type Params = { params: { slug: keyof typeof posts } }

export default function BlogPostPage({ params }: Params) {
	const post = posts[params.slug]
	if (!post) return notFound()
	return (
		<>
			<Header />
			<main className="container py-10">
				<article className="mx-auto max-w-3xl">
					{post.image && <img src={post.image} alt={post.title} className="h-64 w-full rounded-md object-cover" />}
					<h1 className="mt-4 font-[var(--font-serif)] text-3xl font-semibold text-secondary">{post.title}</h1>
					<div className="mt-1 text-sm text-gray-500">By {post.author} • {new Date(post.date).toLocaleDateString()}</div>
					<div className="prose prose-sm mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
					<div className="mt-8 rounded-md border p-4">
						<p className="text-sm">Enjoyed this article? Subscribe to our newsletter for more.</p>
						<a href="#" className="text-sm font-medium text-secondary underline">Subscribe</a>
					</div>
				</article>
			</main>
			<Footer />
		</>
	)
}