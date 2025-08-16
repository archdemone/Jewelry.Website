import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
	return (
		<>
			<Header />
			<main className="container space-y-12 py-10">
				<HeroSection />
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