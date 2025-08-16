"use client"

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import PlaceholderImage from '@/components/ui/PlaceholderImage'

export default function CraftingProcessPage() {
	const processSteps = [
		{
			step: 1,
			title: "Initial Consultation",
			description: "We begin with a personal consultation to understand your vision, preferences, and the story behind your ring.",
			duration: "1-2 hours"
		},
		{
			step: 2,
			title: "Design Sketching",
			description: "I create detailed sketches based on our consultation, refining the design until it perfectly captures your vision.",
			duration: "2-3 days"
		},
		{
			step: 3,
			title: "Material Selection",
			description: "Together, we select the finest locally-sourced metals and ethically sourced gemstones for your ring.",
			duration: "1 day"
		},
		{
			step: 4,
			title: "Wax Carving",
			description: "I hand-carve a wax model of your ring, ensuring every detail is perfect before casting.",
			duration: "3-5 days"
		},
		{
			step: 5,
			title: "Casting Process",
			description: "The wax model is cast in precious metal using traditional lost-wax casting techniques.",
			duration: "1-2 days"
		},
		{
			step: 6,
			title: "Stone Setting",
			description: "Each gemstone is carefully set by hand, ensuring perfect alignment and security.",
			duration: "2-4 days"
		},
		{
			step: 7,
			title: "Polishing & Finishing",
			description: "The ring receives its final polish and finishing touches to achieve the perfect luster.",
			duration: "1-2 days"
		},
		{
			step: 8,
			title: "Final Inspection",
			description: "Every detail is inspected under magnification to ensure perfection before delivery.",
			duration: "1 day"
		},
		{
			step: 9,
			title: "Personal Delivery",
			description: "Your ring is personally delivered with care instructions and a lifetime warranty.",
			duration: "1 day"
		}
	]

	return (
		<>
			<Header />
			<main className="space-y-0">
				{/* Hero Section */}
				<section className="relative h-[60vh] min-h-[400px] overflow-hidden">
					<div className="absolute inset-0">
						<PlaceholderImage
							text="Crafting Process"
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
								The Crafting Process
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-xl text-gray-200"
							>
								From raw materials to finished masterpiece - every step of your ring's journey
							</motion.p>
						</div>
					</div>
				</section>

				{/* Process Overview */}
				<section className="py-20 bg-white">
					<div className="container">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-serif mb-6">Your Ring's Journey</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Every ring I create follows this meticulous process, ensuring that each piece 
								receives the attention and care it deserves. From initial concept to final delivery, 
								I personally oversee every step of the journey.
							</p>
						</motion.div>

						{/* Process Timeline */}
						<div className="max-w-6xl mx-auto">
							{processSteps.map((step, index) => (
								<motion.div
									key={step.step}
									initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
								>
									{/* Content */}
									<div className="flex-1">
										<div className="bg-gray-50 p-8 rounded-xl">
											<div className="flex items-center gap-4 mb-4">
												<div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
													{step.step}
												</div>
												<div>
													<h3 className="text-2xl font-semibold">{step.title}</h3>
													<p className="text-gold-600 font-medium">Duration: {step.duration}</p>
												</div>
											</div>
											<p className="text-gray-700 text-lg">{step.description}</p>
										</div>
									</div>

									{/* Image */}
									<div className="flex-1">
										<div className="relative overflow-hidden rounded-xl">
											<PlaceholderImage text={step.title} className="aspect-video" />
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Quality Assurance */}
				<section className="py-20 bg-gray-50">
					<div className="container">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-serif mb-6">Quality Assurance</h2>
							<p className="text-xl text-gray-600">
								Every ring undergoes rigorous quality checks to ensure perfection
							</p>
						</motion.div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									title: "Material Testing",
									description: "All metals and gemstones are tested for authenticity and quality before use."
								},
								{
									title: "Craftsmanship Review",
									description: "Every detail is inspected under magnification to ensure flawless execution."
								},
								{
									title: "Final Polish",
									description: "The ring receives multiple polishing stages to achieve the perfect finish."
								}
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className="bg-white p-8 rounded-xl shadow-lg text-center"
								>
									<h3 className="text-xl font-semibold mb-4">{item.title}</h3>
									<p className="text-gray-600">{item.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Timeline Summary */}
				<section className="py-20 bg-white">
					<div className="container">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl font-serif mb-6">Typical Timeline</h2>
							<p className="text-xl text-gray-600">
								From consultation to delivery, your ring typically takes 2-6 weeks to complete
							</p>
						</motion.div>

						<div className="max-w-4xl mx-auto">
							<div className="bg-gold-50 rounded-2xl p-8">
								<div className="grid md:grid-cols-3 gap-8 text-center">
									<div>
										<div className="text-3xl font-bold text-gold-600 mb-2">1-2 Weeks</div>
										<p className="text-gray-700">Design & Planning</p>
									</div>
									<div>
										<div className="text-3xl font-bold text-gold-600 mb-2">2-4 Weeks</div>
										<p className="text-gray-700">Crafting Process</p>
									</div>
									<div>
										<div className="text-3xl font-bold text-gold-600 mb-2">1 Day</div>
										<p className="text-gray-700">Delivery</p>
									</div>
								</div>
							</div>
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
							<h2 className="text-4xl font-serif mb-6">Ready to Begin Your Ring's Journey?</h2>
							<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
								Let's start with a personal consultation to discuss your vision and begin the 
								beautiful process of creating your handcrafted ring.
							</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
										   shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Schedule Your Consultation
							</motion.button>
						</motion.div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
