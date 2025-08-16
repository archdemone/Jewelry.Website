"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import SmartImage from '@/components/common/SmartImage'
import { getRingImages } from '@/lib/assets/images'

const FeaturedProducts = () => {
	const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

	// Featured rings mapped to real product slugs
	const featuredRings = [
		{
			id: '1',
			slug: 'classic-solitaire-engagement-ring',
			name: 'Classic Solitaire Engagement Ring',
			price: 3500,
			material: '18k Yellow Gold',
			gemstone: '1ct Diamond',
			craftTime: '3-4 weeks',
			image: null
		},
		{
			id: '2',
			slug: 'hammered-wedding-band',
			name: 'Hammered Wedding Band',
			price: 850,
			material: '14k White Gold',
			gemstone: 'None',
			craftTime: '2 weeks',
			image: null
		},
		{
			id: '3',
			slug: 'sapphire-eternity-ring',
			name: 'Sapphire Eternity Ring',
			price: 2200,
			material: '18k Rose Gold',
			gemstone: 'Sapphires',
			craftTime: '4 weeks',
			image: null
		},
		{
			id: '4',
			slug: 'classic-signet-ring',
			name: 'Vintage Signet Ring',
			price: 650,
			material: 'Sterling Silver',
			gemstone: 'None',
			craftTime: '1 week',
			image: null
		}
	]

	return (
		<section className="py-20 bg-white">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-serif mb-4">Featured Handcrafted Rings</h2>
					<p className="text-xl text-gray-600">
						Each ring is personally crafted from start to finish using locally-sourced materials
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{featuredRings.map((ring, index) => (
						<motion.div
							key={ring.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -8 }}
							onHoverStart={() => setHoveredProduct(ring.id)}
							onHoverEnd={() => setHoveredProduct(null)}
							className="group relative"
						>
							<div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
								{/* Image Container */}
								<div className="relative h-80 overflow-hidden">
									<motion.div
										animate={{ scale: hoveredProduct === ring.id ? 1.1 : 1 }}
										transition={{ duration: 0.6 }}
									>
<<<<<<< HEAD
										<SmartImage
											srcs={getRingImages(ring.slug)}
											alt={ring.name}
											className="h-full w-full"
											width={600}
											height={480}
											sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
											quality={90}
											priority={index < 2}
										/>
=======
																						<SmartImage
													srcs={getRingImages(ring.slug)}
													alt={ring.name}
													className="h-full w-full"
													width={800}
													height={640}
													sizes="(min-width: 1280px) 400px, 50vw"
													quality={90}
													loading="lazy"
												/>
>>>>>>> 89157ae2e7e741bb4ef533c424b09ac4fc0abaa2
									</motion.div>

									{/* Quick Actions */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: hoveredProduct === ring.id ? 1 : 0, y: hoveredProduct === ring.id ? 0 : 20 }}
										transition={{ duration: 0.3 }}
										className="absolute bottom-4 left-4 right-4 flex gap-2"
									>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="flex-1 bg-white/90 backdrop-blur py-2 rounded-full font-medium"
										>
											<Link href={`/products/${ring.slug}`}>Quick View</Link>
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
										>
											<Heart className="w-5 h-5" />
										</motion.button>
									</motion.div>
								</div>

								{/* Product Info */}
								<div className="p-4">
									<h3 className="font-medium text-lg">{ring.name}</h3>
									<p className="text-sm text-gray-600 mt-1">{ring.material} • {ring.gemstone}</p>
									<p className="text-xs text-gold-500 mt-1">Craft time: {ring.craftTime}</p>
									<div className="mt-3 flex items-center justify-between">
										<span className="text-xl font-semibold">${ring.price.toLocaleString()}</span>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="text-gold-500 hover:text-gold-600"
										>
											<ShoppingBag className="w-5 h-5" />
										</motion.button>
									</div>
								</div>
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
					<Link 
						href="/products"
						className="inline-block px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
								   shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						View All Handcrafted Rings
					</Link>
				</motion.div>
			</div>
		</section>
	)
}

export default FeaturedProducts


