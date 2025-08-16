export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getAllCategories, getPaginatedProducts } from '@/lib/queries'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductCard } from '@/components/products/ProductCard'

export default async function ProductsPage({ searchParams }: { searchParams: { page?: string; q?: string; category?: string; min?: string; max?: string; sort?: string } }) {
	const page = Number(searchParams?.page ?? '1') || 1
	const q = searchParams?.q || ''
	const category = searchParams?.category || ''
	const min = searchParams?.min ? Number(searchParams.min) : undefined
	const max = searchParams?.max ? Number(searchParams.max) : undefined
	const sort = (searchParams?.sort as any) || 'new'
	const { items, totalPages } = await getPaginatedProducts({ page, pageSize: 12, q, categorySlug: category || undefined, minPrice: min, maxPrice: max, sort })
	const categories = await getAllCategories()

	return (
		<>
			<Header />
			<main className="container py-10">
				<h1 className="font-[var(--font-serif)] text-3xl font-semibold text-secondary">Shop All</h1>
				<form className="mt-6 grid grid-cols-1 items-end gap-3 rounded-lg border p-4 md:grid-cols-5">
					<div className="md:col-span-2">
						<Label htmlFor="q">Search</Label>
						<Input id="q" name="q" defaultValue={q} placeholder="Search products..." />
					</div>
					<div>
						<Label htmlFor="category">Category</Label>
						<select id="category" name="category" defaultValue={category} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
							<option value="">All</option>
							{categories.map((c: { id: string; slug: string; name: string }) => (
								<option key={c.id} value={c.slug}>{c.name}</option>
							))}
						</select>
					</div>
					<div>
						<Label htmlFor="min">Min Price</Label>
						<Input id="min" name="min" type="number" step="0.01" defaultValue={min ?? ''} />
					</div>
					<div>
						<Label htmlFor="max">Max Price</Label>
						<Input id="max" name="max" type="number" step="0.01" defaultValue={max ?? ''} />
					</div>
					<div>
						<Label htmlFor="sort">Sort</Label>
						<select id="sort" name="sort" defaultValue={sort} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
							<option value="new">Newest</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
						</select>
					</div>
					<div className="md:col-span-5">
						<button className="rounded-md bg-secondary px-4 py-2 text-sm text-white">Apply</button>
					</div>
				</form>
				<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{(items && items.length > 0 ? items : [
						{ id: 'seed-1', slug: 'diamond-solitaire-ring', name: 'Diamond Solitaire Ring', price: 2999.99, images: [], category: { slug: 'rings' } },
						{ id: 'seed-2', slug: 'gold-chain-necklace', name: 'Gold Chain Necklace', price: 899.99, images: [], category: { slug: 'necklaces' } },
						{ id: 'seed-3', slug: 'tennis-bracelet', name: 'Tennis Bracelet', price: 2499.99, images: [], category: { slug: 'bracelets' } },
					]).map((p: any) => (
						<ProductCard key={p.id} id={p.id} slug={p.slug} name={p.name} price={p.price} images={p.images as any} categorySlug={p.category?.slug} />
					))}
				</div>
				{totalPages > 1 && (
					<nav className="mt-8 flex justify-center gap-2">
						{Array.from({ length: totalPages }).map((_, i) => {
							const pageNum = i + 1
							const isActive = pageNum === page
							return (
								<Link
									key={pageNum}
									href={`/products?page=${pageNum}&q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}&min=${min ?? ''}&max=${max ?? ''}&sort=${sort}`}
									className={`rounded-md border px-3 py-1 text-sm ${isActive ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-accent'}`}
								>
									{pageNum}
								</Link>
							)
						})}
					</nav>
				)}
			</main>
			<Footer />
		</>
	)
}


