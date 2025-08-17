export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllCategories, getPaginatedProducts } from '@/lib/queries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getProductImageFallback } from '@/lib/assets/images';
import { ProductCard } from '@/components/products/ProductCard';

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: {
		page?: string;
		q?: string;
		category?: string;
		min?: string;
		max?: string;
		sort?: string;
	};
}) {
	const page = Number(searchParams?.page ?? '1') || 1;
	const q = searchParams?.q || '';
	const category = searchParams?.category || '';
	const min = searchParams?.min ? Number(searchParams.min) : undefined;
	const max = searchParams?.max ? Number(searchParams.max) : undefined;
	const sort = (searchParams?.sort as any) || 'new';
	const { items, totalPages } = await getPaginatedProducts({
		page,
		pageSize: 12,
		q,
		categorySlug: category || undefined,
		minPrice: min,
		maxPrice: max,
		sort,
	});
	const categories = await getAllCategories();

	function buildUrl(overrides: Partial<{ page: string; q: string; category: string; min: string; max: string; sort: string }>) {
		const params = new URLSearchParams();
		params.set('page', overrides.page ?? '1');
		if ((overrides.q ?? q).trim()) params.set('q', (overrides.q ?? q).trim());
		const cat = overrides.category ?? category;
		if (cat) params.set('category', cat);
		const minStr = overrides.min ?? (min !== undefined ? String(min) : '');
		if (minStr) params.set('min', minStr);
		const maxStr = overrides.max ?? (max !== undefined ? String(max) : '');
		if (maxStr) params.set('max', maxStr);
		params.set('sort', overrides.sort ?? sort);
		const qs = params.toString();
		return `/products${qs ? `?${qs}` : ''}`;
	}

	return (
		<>
			<main className="container py-10">
				{/* Intro banner */}
				<section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-gold-50 to-white p-8 md:p-12">
					<div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-200 opacity-40 blur-2xl" />
					<div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gold-100 opacity-50 blur-2xl" />
					<div className="relative z-10 text-center">
						<h1 className="mb-3 font-[var(--font-serif)] text-4xl font-semibold text-secondary md:text-5xl">
							Handcrafted Rings
						</h1>
						<p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
							Each ring is crafted start-to-finish by a single artisan. Thoughtfully designed, ethically sourced, made to last.
						</p>
					</div>
				</section>

				{/* Category pills */}
				{categories?.length > 0 && (
					<div className="mt-6 overflow-x-auto">
						<div className="flex w-max gap-2">
							<Link
								href={buildUrl({ page: '1', category: '' })}
								scroll={false}
								className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${!category ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-accent'}`}
							>
								All
							</Link>
							{categories.map((c: { id: string; slug: string; name: string }) => (
								<Link
									key={c.id}
									href={buildUrl({ page: '1', category: c.slug })}
									scroll={false}
									className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${category === c.slug ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-accent'}`}
								>
									{c.name}
								</Link>
							))}
						</div>
					</div>
				)}

				{/* Filters */}
				<form method="GET" action="/products" className="mt-6 grid grid-cols-1 items-end gap-3 rounded-xl border bg-white/70 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50 md:grid-cols-5 md:p-5">
					<div className="md:col-span-2">
						<Label htmlFor="q">Search Rings</Label>
						<Input id="q" name="q" defaultValue={q} placeholder="Search rings..." />
					</div>
					<div>
						<Label htmlFor="category">Ring Type</Label>
						<select
							id="category"
							name="category"
							defaultValue={category}
							className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
						>
							<option value="">All Rings</option>
							{categories.map((c: { id: string; slug: string; name: string }) => (
								<option key={c.id} value={c.slug}>
									{c.name}
								</option>
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
						<select
							id="sort"
							name="sort"
							defaultValue={sort}
							className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
						>
							<option value="new">Newest</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
						</select>
					</div>
					<div className="md:col-span-5 flex items-center gap-2">
						<button className="rounded-full bg-gold-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow">
							Apply Filters
						</button>
						{(q || category || min !== undefined || max !== undefined || sort !== 'new') && (
							<Link href="/products" className="text-sm text-gray-600 underline">
								Reset
							</Link>
						)}
					</div>
				</form>

				<div className="mt-6 text-sm text-gray-600">Showing {items.length} items</div>

				{items.length === 0 ? (
					<div className="mt-8 rounded-xl border p-8 text-center text-gray-600">
						No rings found. Try adjusting your filters or search.
					</div>
				) : (
					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{items.map((p: any) => {
							const dbImages = Array.isArray(p.images) ? (p.images as string[]) : [];
							const fallback = getProductImageFallback({
								productSlug: p.slug,
								categorySlug: p.category?.slug,
								name: p.name,
							});
							const productImages = [...dbImages, ...fallback];

							return (
								<ProductCard
									key={p.id}
									link={`/products/${p.slug}`}
									name={p.name}
									material={p.material}
									gemstones={p.gemstones}
									price={p.price}
									image={productImages[0]}
								/>
							);
						})}
					</div>
				)}
				{totalPages > 1 && (
					<nav className="mt-8 flex justify-center gap-2">
						{Array.from({ length: totalPages }).map((_, i) => {
							const pageNum = i + 1;
							const isActive = pageNum === page;
							return (
								<Link
									key={pageNum}
									href={buildUrl({ page: String(pageNum) })}
									scroll={false}
									className={`rounded-md border px-3 py-1 text-sm ${isActive ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-accent'}`}
								>
									{pageNum}
								</Link>
							);
						})}
					</nav>
				)}
			</main>
		</>
	);
}
