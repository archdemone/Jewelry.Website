"use client"

import { motion } from 'framer-motion'
import { Sparkles, Shield, Heart, Clock, MapPin, Users } from 'lucide-react'

const WhyChooseUs = () => {
	const reasons = [
		{
			icon: Sparkles,
			title: "Single Artisan Craftsmanship",
			description: "Every ring is personally crafted from start to finish by one master artisan, ensuring consistent quality and attention to detail."
		},
		{
			icon: MapPin,
			title: "Locally Sourced Materials",
			description: "We source all metals and gemstones from local, ethical suppliers, supporting our community and ensuring traceability."
		},
		{
			icon: Heart,
			title: "Personal Connection",
			description: "Work directly with the maker - no middlemen, no markup. Your vision becomes reality through direct collaboration."
		},
		{
			icon: Clock,
			title: "Timeless Crafting Process",
			description: "Each ring takes 2-6 weeks to craft, using traditional techniques passed down through generations of artisans."
		},
		{
			icon: Shield,
			title: "Lifetime Warranty",
			description: "Every ring comes with a lifetime warranty, reflecting our confidence in the quality of our handcrafted pieces."
		},
		{
			icon: Users,
			title: "Family Tradition",
			description: "Three generations of ring making expertise, with each piece carrying the legacy of our family's commitment to excellence."
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
					<h2 className="text-4xl font-serif mb-4">Why Choose Handcrafted Rings?</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						When you choose our handcrafted rings, you're not just buying jewelry - 
						you're investing in a piece of art created with passion, tradition, and personal care.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
						>
							<motion.div
								whileHover={{ scale: 1.1, rotate: 5 }}
								className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4"
							>
								<reason.icon className="w-8 h-8 text-white" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
							<p className="text-gray-600">{reason.description}</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mt-16"
				>
					<div className="bg-gold-50 rounded-2xl p-8 max-w-4xl mx-auto">
						<h3 className="text-2xl font-serif mb-4">The Artisan's Promise</h3>
						<p className="text-lg text-gray-700 mb-6">
							"I personally guarantee that every ring I create will be crafted with the same care and attention 
							I would give to a piece for my own family. When you wear one of my rings, you're carrying a piece 
							of my heart and my commitment to excellence."
						</p>
						<p className="text-gold-600 font-medium">- Master Artisan, Third Generation Ring Maker</p>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default WhyChooseUs


