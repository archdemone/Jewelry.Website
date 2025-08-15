import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterSection from '@/components/home/NewsletterSection'

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


