import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load components to reduce initial bundle size
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
	loading: () => <div className="h-screen min-h-[600px] bg-gray-100 animate-pulse" />
})

const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
	loading: () => <div className="py-20 bg-white"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>
})

const CategoryShowcase = dynamic(() => import('@/components/home/CategoryShowcase'), {
	loading: () => <div className="py-20 bg-gray-50"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>
})

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
	loading: () => <div className="py-20 bg-white"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>
})

const NewsletterSection = dynamic(() => import('@/components/home/NewsletterSection'), {
	loading: () => <div className="py-20 bg-gray-50"><div className="container"><div className="h-32 bg-gray-100 animate-pulse rounded-lg" /></div></div>
})

const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'), {
	loading: () => <div className="py-20 bg-white"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>
})

const WorkshopSection = dynamic(() => import('@/components/home/WorkshopSection'), {
	loading: () => <div className="py-20 bg-stone-50"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>
})

// Keep Header and Footer as regular imports since they're needed immediately
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
	return (
		<>
			<Header />
			<main className="space-y-0">
				<HeroSection />
				<Suspense fallback={<div className="py-20 bg-stone-50"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>}>
					<WorkshopSection />
				</Suspense>
				<Suspense fallback={<div className="py-20 bg-white"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>}>
					<FeaturedProducts />
				</Suspense>
				<Suspense fallback={<div className="py-20 bg-gray-50"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>}>
					<CategoryShowcase />
				</Suspense>
				<Suspense fallback={<div className="py-20 bg-white"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>}>
					<WhyChooseUs />
				</Suspense>
				<Suspense fallback={<div className="py-20 bg-white"><div className="container"><div className="h-64 bg-gray-100 animate-pulse rounded-lg" /></div></div>}>
					<TestimonialsSection />
				</Suspense>
				<Suspense fallback={<div className="py-20 bg-gray-50"><div className="container"><div className="h-32 bg-gray-100 animate-pulse rounded-lg" /></div></div>}>
					<NewsletterSection />
				</Suspense>
			</main>
			<Footer />
		</>
	)
}