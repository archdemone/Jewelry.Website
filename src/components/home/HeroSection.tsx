"use client"

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import SmartImage from '@/components/common/SmartImage'
import React from 'react'

const HeroSection = () => {
	const images = React.useMemo(() => [
		'/images/header/hero-1.jpg',
		'/images/header/hero-2.jpg',
		'/images/header/hero-3.jpg',
	], [])
	const [index, setIndex] = React.useState(0)
	React.useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % images.length)
		}, 5000)
		return () => clearInterval(id)
	}, [images.length])

	return (
		<section className="relative w-full overflow-hidden aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] min-h-[400px] max-h-[600px] md:max-h-[700px]">
			{/* Background Image */}
			<div className="absolute inset-0 bg-black">
				<AnimatePresence>
					<motion.div
						key={index}
						className="absolute inset-0"
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '-100%' }}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
					>
						<SmartImage
							srcs={[images[index]]}
							alt="Artisan Crafting Ring"
							className="h-full w-full"
							fill
							priority
							sizes="100vw"
							quality={90}
						/>
					</motion.div>
				</AnimatePresence>
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


