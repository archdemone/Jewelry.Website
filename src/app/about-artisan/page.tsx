"use client"

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import PlaceholderImage from '@/components/ui/PlaceholderImage'

export default function AboutArtisanPage() {
	return (
		<>
			<Header />
			<main className="space-y-0">
				{/* Hero Section */}
				<section className="relative h-[60vh] min-h-[400px] overflow-hidden">
					<div className="absolute inset-0">
						<PlaceholderImage
							text="Artisan Workshop"
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/50" />
					</div>
					<div className="relative z-10 container h-full flex items-center">
						<div className="max-w-2xl text-white">
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="text-5xl md:text-6xl font-serif mb-4"
							>
								Meet the Artisan
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-xl text-gray-200"
							>
								Third generation ring maker, crafting timeless pieces with passion and precision
							</motion.p>
						</div>
					</div>
				</section>

				{/* Personal Story */}
				<section className="py-20 bg-white">
					<div className="container">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
							>
								<h2 className="text-4xl font-serif mb-6">My Journey</h2>
								<p className="text-lg text-gray-600 mb-6">
									I grew up in my grandfather's workshop, watching him transform raw materials into 
									beautiful rings that would become family heirlooms. The sound of his tools, the 
									smell of the workshop, and the pride in his eyes when he completed a piece - 
									these are the memories that shaped my life.
								</p>
								<p className="text-lg text-gray-600 mb-6">
									After apprenticing under my father for 15 years, I took over the family business 
									in 2010. Today, I continue the tradition of creating rings that tell stories, 
									celebrate love, and become part of family legacies.
								</p>
								<p className="text-lg text-gray-600">
									Every ring I create carries with it the knowledge and techniques passed down 
									through three generations, combined with my own passion for innovation and 
									attention to detail.
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="relative"
							>
								<PlaceholderImage text="Artisan Portrait" className="aspect-square rounded-xl" />
							</motion.div>
						</div>
					</div>
				</section>

				{/* Philosophy */}
				<section className="py-20 bg-gray-50">
					<div className="container">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-serif mb-6">My Philosophy</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								I believe that every ring should be as unique as the love it represents. 
								That's why I personally craft each piece from start to finish, ensuring 
								that every detail reflects the care and attention it deserves.
							</p>
						</motion.div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									title: "Quality Over Quantity",
									description: "I'd rather create one perfect ring than a hundred mediocre ones. Each piece deserves my full attention and care."
								},
								{
									title: "Local Sourcing",
									description: "I work with local suppliers who share my values of ethical practices and sustainable materials."
								},
								{
									title: "Personal Connection",
									description: "When you work with me, you're not just buying a ring - you're becoming part of my family's story."
								}
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className="bg-white p-8 rounded-xl shadow-lg"
								>
									<h3 className="text-xl font-semibold mb-4">{item.title}</h3>
									<p className="text-gray-600">{item.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Workshop Tour */}
				<section className="py-20 bg-white">
					<div className="container">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-serif mb-6">My Workshop</h2>
							<p className="text-xl text-gray-600">
								Step inside my workshop where every ring begins its journey
							</p>
						</motion.div>

						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{[
								{ name: "Design Station" },
								{ name: "Casting Area" },
								{ name: "Stone Setting" },
								{ name: "Finishing Bench" }
							].map((area, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="group"
								>
									<div className="relative overflow-hidden rounded-lg">
										<PlaceholderImage text={area.name} className="aspect-square" />
										<div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
										<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
											<h3 className="font-semibold">{area.name}</h3>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Timeline */}
				<section className="py-20 bg-gray-50">
					<div className="container">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-serif mb-6">Three Generations of Excellence</h2>
							<p className="text-xl text-gray-600">
								A timeline of our family's commitment to handcrafted rings
							</p>
						</motion.div>

						<div className="max-w-4xl mx-auto">
							{[
								{
									year: "1950",
									title: "Grandfather's Vision",
									description: "My grandfather opened his first workshop, establishing our family's commitment to quality craftsmanship."
								},
								{
									year: "1980",
									title: "Father's Innovation",
									description: "My father modernized our techniques while preserving traditional methods, expanding our capabilities."
								},
								{
									year: "2010",
									title: "My Legacy",
									description: "I took over the family business, combining three generations of knowledge with contemporary design."
								},
								{
									year: "Today",
									title: "Continuing Tradition",
									description: "Every ring I create carries forward our family's legacy of excellence and personal care."
								}
							].map((milestone, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
								>
									<div className="flex-1">
										<div className="bg-white p-6 rounded-xl shadow-lg">
											<div className="text-2xl font-bold text-gold-500 mb-2">{milestone.year}</div>
											<h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
											<p className="text-gray-600">{milestone.description}</p>
										</div>
									</div>
									<div className="w-4 h-4 bg-gold-500 rounded-full"></div>
									<div className="flex-1"></div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="py-20 bg-gold-50">
					<div className="container text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-4xl font-serif mb-6">Ready to Start Your Ring Journey?</h2>
							<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
								Let's work together to create a ring that tells your unique story. 
								Every consultation is personal, every design is bespoke, and every piece is handcrafted with love.
							</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
										   shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Book Your Consultation
							</motion.button>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
