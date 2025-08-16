"use client"

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
	const testimonials = [
		{
			name: "Sarah & Michael",
			location: "New York, NY",
			rating: 5,
			text: "Our engagement ring is absolutely perfect! Working directly with the artisan made the whole experience so personal. He took our vision and created something beyond our dreams. The quality is incredible and knowing it was made by one person makes it even more special.",
			ring: "Custom Diamond Engagement Ring"
		},
		{
			name: "Jennifer",
			location: "Los Angeles, CA",
			rating: 5,
			text: "I wanted something unique for my wedding band, and the artisan delivered exactly what I envisioned. The hammered texture is beautiful and the fact that it was crafted by hand makes it feel so meaningful. I love telling people about the story behind my ring.",
			ring: "Hammered Wedding Band"
		},
		{
			name: "David & Emma",
			location: "Chicago, IL",
			rating: 5,
			text: "We ordered matching eternity rings for our anniversary. The artisan was so patient with our questions and the rings are stunning. The craftsmanship is evident in every detail. We couldn't be happier with our choice to go with handcrafted rings.",
			ring: "Matching Eternity Rings"
		}
	]

	return (
		<section className="py-20 bg-white">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-serif mb-4">What Our Customers Say</h2>
					<p className="text-xl text-gray-600">
						Real stories from couples who chose handcrafted rings for their special moments
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2 }}
							whileHover={{ y: -5 }}
							className="bg-gray-50 rounded-xl p-8 relative"
						>
							{/* Quote Icon */}
							<motion.div
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.6 }}
								className="absolute -top-4 left-8 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center"
							>
								<Quote className="w-4 h-4 text-white" />
							</motion.div>

							{/* Rating */}
							<div className="flex gap-1 mb-4">
								{Array.from({ length: testimonial.rating }).map((_, i) => (
									<Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
								))}
							</div>

							{/* Testimonial Text */}
							<p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

							{/* Ring Type */}
							<p className="text-sm text-gold-600 font-medium mb-4">{testimonial.ring}</p>

							{/* Customer Info */}
							<div>
								<p className="font-semibold text-gray-900">{testimonial.name}</p>
								<p className="text-sm text-gray-500">{testimonial.location}</p>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mt-12"
				>
					<div className="bg-gold-50 rounded-2xl p-8 max-w-2xl mx-auto">
						<h3 className="text-2xl font-serif mb-4">Join Our Happy Customers</h3>
						<p className="text-gray-700 mb-6">
							Every ring tells a story. Let us help you create yours with a handcrafted piece 
							that will become part of your family's legacy.
						</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
									   shadow-lg hover:shadow-xl transition-all duration-300"
						>
							Start Your Ring Journey
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default TestimonialsSection


