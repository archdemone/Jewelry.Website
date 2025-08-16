import Link from 'next/link'
import { getAllCategories } from '@/lib/queries'
import SmartImage from '@/components/common/SmartImage'
import { getCategoryImage } from '@/lib/assets/images'

export default async function CategoryShowcase() {
	const categories = await getAllCategories()
	return (
		<section className="container py-12">
			<h2 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">Shop by Category</h2>
			<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((c: { id: string; slug: string; name: string }) => {
					const slug = String((c as any).slug || '').toLowerCase()
					const srcs = getCategoryImage(slug)
					return (
						<Link key={c.id} href={`/products?category=${encodeURIComponent(slug)}`} className="group relative overflow-hidden rounded-lg border">
							<div className="relative aspect-[16/10] w-full overflow-hidden">
								<SmartImage srcs={srcs} alt={(c as any).name} className="h-full w-full" />
							</div>
							<div className="absolute inset-0 bg-black/20" />
							<div className="absolute inset-x-0 bottom-0 p-4">
								<div className="rounded-md bg-white/90 px-3 py-2 text-center text-sm font-medium text-secondary">{(c as any).name}</div>
							</div>
						</Link>
					)
				})}
			</div>
		</section>
	)
}


