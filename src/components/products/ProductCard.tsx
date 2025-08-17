'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import SmartImage from '@/components/common/SmartImage';

export type ProductCardProps = {
	link: string;
	name: string;
	material: string;
	gemstones?: string | null;
	price: number;
	image: string;
};

export function ProductCard({ link, name, material, gemstones, price, image }: ProductCardProps) {
	const [liked, setLiked] = useState(false);

	return (
		<div className="group rounded-xl border p-4 transition-all hover:shadow-lg">
			<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-accent">
				<SmartImage
					srcs={[image]}
					alt={name}
					className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
					fill
					sizes="(min-width: 1280px) 400px, 50vw"
					quality={90}
				/>
				<button
					aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
					onClick={(e) => {
						e.preventDefault();
						setLiked((v) => !v);
					}}
					className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-secondary shadow-sm transition hover:opacity-90"
				>
					<Heart className={`h-4 w-4 transition ${liked ? 'fill-red-500 text-red-500' : ''}`} />
				</button>
				<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
					<div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-secondary shadow-sm">
						View details
					</div>
				</div>
			</div>

			<Link href={link} className="mt-3 block" data-testid="product-card">
				<div className="text-sm font-medium">{name}</div>
				<div className="text-sm text-gray-600">{material} • {gemstones || 'No stones'}</div>
				<div className="mt-1 text-sm font-semibold text-secondary">${price.toFixed(2)}</div>
			</Link>
		</div>
	);
}
