"use client"

import { motion } from 'framer-motion'

const WorkshopSection = () => {
	return (
		<section className="py-20 bg-stone-50">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-serif mb-4">From My Workshop to Your Finger</h2>
					<p className="text-xl text-gray-600">
						Every ring passes through these hands only - from raw material to finished piece
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							title: "Material Selection",
							description: "I personally source every piece of metal and stone from local, ethical suppliers",
							icon: "🏔️"
						},
						{
							title: "Solo Craftsmanship",
							description: "No assistants, no factory - just one artisan ensuring perfection at every step",
							icon: "🔨"
						},
						{
							title: "Direct Relationship",
							description: "You work directly with me, the maker - no middlemen, no markup",
							icon: "🤝"
						}
					].map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2 }}
							whileHover={{ y: -10 }}
							className="bg-white p-8 rounded-xl shadow-lg"
						>
							<div className="text-4xl mb-4">{item.icon}</div>
							<h3 className="text-xl font-semibold mb-3">{item.title}</h3>
							<p className="text-gray-600">{item.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default WorkshopSection
