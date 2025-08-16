"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import SmartImage from '@/components/common/SmartImage'

const CategoryShowcase = () => {
	// Use representative product images for each category to avoid yellow placeholders
	const ringCategories = [
		{
			id: 'engagement-rings',
			name: 'Engagement Rings',
			description: 'Handcrafted engagement rings with ethically sourced diamonds',
			image: '/images/products/classic-solitaire-engagement-ring-1.jpg',
			count: '12 designs'
		},
		{
			id: 'wedding-bands',
			name: 'Wedding Bands',
			description: 'Matching wedding bands for your special day',
			image: '/images/products/hammered-wedding-band-1.jpg',
			count: '8 designs'
		},
		{
			id: 'eternity-rings',
			name: 'Eternity Rings',
			description: 'Celebrate eternal love with continuous stones',
			image: '/images/products/sapphire-eternity-ring-1.jpg',
			count: '6 designs'
		},
		{
			id: 'signet-rings',
			name: 'Signet Rings',
			description: 'Classic signet rings with custom engraving options',
			image: '/images/products/classic-signet-ring-1.jpg',
			count: '4 designs'
		},
		{
			id: 'statement-rings',
			name: 'Statement Rings',
			description: 'Bold designs that express your personality',
			image: '/images/products/emerald-statement-ring-1.jpg',
			count: '10 designs'
		},
		{
			id: 'stackable-rings',
			name: 'Stackable Rings',
			description: 'Delicate rings designed to be worn together',
			image: '/images/products/minimalist-gold-band-1.jpg',
			count: '15 designs'
		}
	]

	return (
		<section className="py-20 bg-gray-50">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-serif mb-4">Ring Collections</h2>
					<p className="text-xl text-gray-600">
						Explore our handcrafted ring categories, each designed with passion and precision
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{ringCategories.map((category, index) => (
						<motion.div
							key={category.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -8, scale: 1.02 }}
							className="group relative"
						>
							<Link href={`/products?category=${category.id}`} className="block">
								<div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
									{/* Image */}
									<div className="relative h-64 overflow-hidden">
										<motion.div
											whileHover={{ scale: 1.1 }}
											transition={{ duration: 0.6 }}
											className="relative h-full w-full"
										>
<<<<<<< HEAD
											<SmartImage 
												key={`cat-img-${category.id}`}
												srcs={[
													`/images/products/category-${category.id}.jpg`,
													`/images/categories/category-${category.id}.jpg`,
													category.image
												]} 
												alt={category.name} 
												className="h-full w-full" 
												fill
												sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
												quality={90}
												unoptimized={process.env.NODE_ENV !== 'production'}
												priority={index === 0}
											/>
=======
																								<SmartImage 
														srcs={[category.image]} 
														alt={category.name} 
														className="h-full w-full" 
														width={800}
														height={512}
														sizes="(min-width: 1280px) 400px, 50vw"
														quality={90}
														loading="lazy"
													/>
>>>>>>> 89157ae2e7e741bb4ef533c424b09ac4fc0abaa2
										</motion.div>
										
										{/* Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
										
										{/* Content */}
										<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
											<h3 className="text-xl font-semibold mb-2">{category.name}</h3>
											<p className="text-sm text-gray-200 mb-2">{category.description}</p>
											<span className="text-xs text-gold-300">{category.count}</span>
										</div>
									</div>
								</div>
							</Link>
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
						className="inline-block px-8 py-4 border-2 border-gold-500 text-gold-500 rounded-full font-medium 
								   hover:bg-gold-500 hover:text-white transition-all duration-300 hover:scale-105"
					>
						Browse All Ring Collections
					</Link>
				</motion.div>
			</div>
		</section>
	)
}

export default CategoryShowcase


