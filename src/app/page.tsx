import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import WorkshopSection from '@/components/home/WorkshopSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
	return (
		<>
			<Header />
			<main className="space-y-0">
				<HeroSection />
				<WorkshopSection />
				<FeaturedProducts />
				<CategoryShowcase />
				<WhyChooseUs />
				<TestimonialsSection />
				<NewsletterSection />
			</main>
			<Footer />
		</>
	)
}