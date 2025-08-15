import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SmartImage from '@/components/common/SmartImage'

export default function HeroSection() {
	return (
		<section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[70vh]">
			<div className="absolute inset-0">
				<SmartImage
					srcs={[
						'Luxury Jewelry Collection',
						'Exquisite Jewelry',
						'Premium Jewelry',
				]}
				alt="Luxury Jewelry Collection"
				className="h-full w-full"
			/>
			</div>
			<div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary/70 to-black/30" />
			<div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.15) 0, transparent 35%)' }} />
			<div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
				<div className="max-w-xl text-white">
					<h1 className="font-[var(--font-serif)] text-4xl font-bold sm:text-5xl">Exquisite Jewelry for Every Moment</h1>
					<p className="mt-3 text-sm text-white/90 sm:text-base">Handcrafted with love, designed for life. Discover timeless elegance in our curated collections.</p>
					<div className="mt-6 flex gap-3">
						<Button variant="primary" asChild>
							<Link href="/products">Shop Collection</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/about">View Catalog</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}


