import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import NewsletterSection from '@/components/home/NewsletterSection'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
	loading: () => <Skeleton className="container h-40 my-8" />,
	ssr: false,
})

export default function ShopHomePage() {
	return (
		<>
			<Header />
			<HeroSection />
			<FeaturedProducts />
			<CategoryShowcase />
			<WhyChooseUs />
			<TestimonialsSection />
			<NewsletterSection />
			<Footer />
		</>
	);
}


