"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import PlaceholderImage from '@/components/ui/PlaceholderImage'

const HeroSection = () => {
	return (
		<section className="relative h-screen min-h-[600px] overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0">
				<motion.div
					initial={{ scale: 1.1 }}
					animate={{ scale: 1 }}
					transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
				>
					<PlaceholderImage 
						text="Artisan Crafting Ring" 
						className="h-full w-full object-cover" 
					/>
				</motion.div>
				
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-10 container h-full flex items-center">
				<div className="max-w-2xl">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<span className="text-gold-400 font-medium tracking-wider uppercase text-sm">
							Locally Crafted • Single Artisan • Lifetime Warranty
						</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-5xl md:text-7xl font-serif text-white mt-4 mb-6"
					>
						Rings Crafted<br />
						<span className="text-gold-400">With Passion</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl text-gray-200 mb-8"
					>
						Each ring is personally handcrafted from start to finish using 
						locally-sourced materials. No mass production, no teams – 
						just one artisan's dedication to your perfect ring.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="flex gap-4 flex-wrap"
					>
						<motion.button
							whileHover={{ scale: 1.05, backgroundColor: '#B8961F' }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
									   shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<Link href="/products">Explore Rings</Link>
						</motion.button>
						
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 border-2 border-white text-white rounded-full 
									   font-medium hover:bg-white hover:text-black transition-all duration-300"
						>
							<Link href="/contact">Book Consultation</Link>
						</motion.button>
					</motion.div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
			>
				<div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
				</div>
			</motion.div>
		</section>
	)
}

export default HeroSection


