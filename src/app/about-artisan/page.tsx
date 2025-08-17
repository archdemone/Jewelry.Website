'use client'

/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion'
import SmartImage from '@/components/common/SmartImage'
import Link from 'next/link'
import { Heart, Home, Users, Award } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function ArtisanPage() {
	return (
		<>
			<Header />
			<div className="min-h-screen bg-white">
				{/* Hero Section - Personal Introduction */}
				<section className="relative h-[55vh] min-h-[480px] bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
					<div className="absolute inset-0">
						<SmartImage
							srcs={['/images/artisan/bedroom-workshop-hero.jpg']}
							alt="Home workshop where each ring is crafted"
							fill
							className="object-cover opacity-70"
							priority
							sizes="100vw"
							quality={90}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
					</div>
					
					<div className="relative z-10 container h-full flex items-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="max-w-3xl"
						>
							<h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
								Meet the Artisan
							</h1>
							<p className="text-xl text-white/90 leading-relaxed">
								A journey from bedroom workshop to bringing affordable, handcrafted rings to everyone
							</p>
						</motion.div>
					</div>
				</section>

				{/* Honest Introduction */}
				<section className="py-10 bg-white">
					<div className="container max-w-4xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="prose prose-lg mx-auto"
						>
							<div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-6">
								<p className="text-amber-900 font-medium mb-0">
									🌟 <strong>New Business Alert:</strong> We've just opened our doors! 
									As a brand new venture, we're committed to learning, growing, and providing 
									the best possible experience for our customers. Your patience and feedback 
									help us improve every day.
								</p>
							</div>

							<h2 className="text-3xl font-serif text-gray-900 mb-4">
								An Honest Beginning
							</h2>
							
							<p className="text-gray-700 leading-relaxed">
								I'm not a professional jeweler with decades of experience or a fancy studio. 
								I'm someone who discovered a passion for creating beautiful rings and decided 
								to turn that passion into something meaningful. While I may not have formal 
								training, I pour my heart into every piece I make, constantly learning and 
								striving to deliver the best quality I can.
							</p>

							<p className="text-gray-700 leading-relaxed">
								My goal is simple: <strong>make beautiful, quality rings affordable for everyone</strong>. 
								I believe that marking life's special moments shouldn't require spending a fortune, 
								and by working from my home workshop and selling directly to you, I can offer 
								prices significantly lower than traditional jewelers.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Journey Timeline */}
				<section className="py-10 bg-stone-50">
					<div className="container max-w-5xl">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl font-serif text-center mb-10"
						>
							My Journey to Ring Making
						</motion.h2>

						<div className="space-y-10">
							{/* 2015 - The Beginning */}
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="flex gap-6 items-start"
							>
								<div className="flex-shrink-0 w-24 text-right">
									<span className="text-2xl font-bold text-primary">2015</span>
								</div>
								<div className="flex-grow bg-white p-6 rounded-lg shadow-md">
									<h3 className="font-semibold text-xl mb-2">The Spark Begins</h3>
									<p className="text-gray-600">
										Started experimenting with jewelry-making as a hobby. What began as curiosity 
										about how things are made slowly grew into a genuine passion for crafting.
									</p>
									<div className="mt-4">
										<SmartImage
											srcs={['/images/artisan/early-work-2015.jpg']}
											alt="Early jewelry experiments from 2015"
											width={300}
											height={200}
											className="rounded-lg"
											sizes="(max-width: 768px) 100vw, 300px"
											quality={90}
										/>
									</div>
								</div>
							</motion.div>

							{/* 2020 - First Success */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="flex gap-6 items-start"
							>
								<div className="flex-shrink-0 w-24 text-right">
									<span className="text-2xl font-bold text-primary">2020</span>
								</div>
								<div className="flex-grow bg-white p-6 rounded-lg shadow-md">
									<h3 className="font-semibold text-xl mb-2">First Real Achievement</h3>
									<p className="text-gray-600">
										Created my first set of gem-filled inlay rings combining metal and carbon fiber. 
										This was the moment I realized I could create something truly special.
									</p>
									<div className="mt-4">
										<SmartImage
											srcs={['/images/artisan/first-inlay-rings-2020.jpg']}
											alt="First gem inlay rings with carbon fiber"
											width={300}
											height={200}
											className="rounded-lg"
											sizes="(max-width: 768px) 100vw, 300px"
											quality={90}
										/>
									</div>
								</div>
							</motion.div>

							{/* 2023-2025 - The Challenge */}
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="flex gap-6 items-start"
							>
								<div className="flex-shrink-0 w-24 text-right">
									<span className="text-2xl font-bold text-primary">2023-25</span>
								</div>
								<div className="flex-grow bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-md border-2 border-blue-200">
									<h3 className="font-semibold text-xl mb-2">Finding Purpose Through Adversity</h3>
									<p className="text-gray-700">
										Life threw its biggest challenges yet. Health issues left me unable to work 
										traditionally, but in this difficulty, I found renewed purpose. Creating rings 
										became more than a craft—it became my way forward, my reason to keep pushing, 
										and my connection to the world. Every ring I make is proof that beauty can 
										emerge from struggle.
									</p>
									<div className="mt-4 flex items-center gap-2">
										<Heart className="w-5 h-5 text-red-500" />
										<span className="text-sm italic text-gray-600">
											"Ring making gave me purpose when I needed it most"
										</span>
									</div>
								</div>
							</motion.div>

							{/* 2025 - New Beginning */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="flex gap-6 items-start"
							>
								<div className="flex-shrink-0 w-24 text-right">
									<span className="text-2xl font-bold text-primary">NOW</span>
								</div>
								<div className="flex-grow bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-md border-2 border-green-300">
									<h3 className="font-semibold text-xl mb-2">A New Chapter Begins</h3>
									<p className="text-gray-700">
										With support from the local council district, this business is now official! 
										It's a dream becoming reality—turning my bedroom workshop into a real business 
										that can support me while bringing joy to others through affordable, handcrafted rings.
									</p>
									<div className="mt-4 flex items-center gap-3">
										<Award className="w-6 h-6 text-green-600" />
										<span className="text-sm font-medium text-green-700">
											Council Approved & Supported Business
										</span>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* The Workshop */}
				<section className="py-10 bg-white">
					<div className="container max-w-5xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-10"
						>
							<Home className="w-12 h-12 text-primary mx-auto mb-4" />
							<h2 className="text-3xl font-serif mb-4">The Bedroom Workshop</h2>
							<p className="text-lg text-gray-600 max-w-2xl mx-auto">
								No fancy studio, no industrial equipment—just dedication, basic tools, 
								and a corner of my bedroom transformed into a creative space
							</p>
						</motion.div>

						<div className="grid md:grid-cols-2 gap-6">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
							>
								<SmartImage
									srcs={['/images/artisan/bedroom-workshop-1.jpg']}
									alt="My bedroom workshop setup"
									width={500}
									height={350}
									className="rounded-lg shadow-lg w-full"
									sizes="(max-width: 768px) 100vw, 500px"
									quality={90}
								/>
								<p className="text-sm text-gray-500 mt-2 text-center">
									Where the magic happens - my bedroom workshop
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
							>
								<SmartImage
									srcs={['/images/artisan/workshop-tools.jpg']}
									alt="Ring making tools and materials"
									width={500}
									height={350}
									className="rounded-lg shadow-lg w-full"
									sizes="(max-width: 768px) 100vw, 500px"
									quality={90}
								/>
								<p className="text-sm text-gray-500 mt-2 text-center">
									Simple tools, endless possibilities
								</p>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mt-10 bg-blue-50 p-6 rounded-xl"
						>
							<p className="text-center text-gray-700 italic text-lg">
								"Working from home means lower costs for me and lower prices for you. 
								Every purchase directly supports an independent artisan's journey."
							</p>
						</motion.div>
					</div>
				</section>

				{/* Values & Commitments */}
				<section className="py-10 bg-stone-50">
					<div className="container max-w-5xl">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl font-serif text-center mb-10"
						>
							My Commitments to You
						</motion.h2>

						<div className="grid md:grid-cols-3 gap-6">
							{/* Affordable Pricing */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className="bg-white p-6 rounded-xl shadow-md"
							>
								<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
									<span className="text-2xl">💰</span>
								</div>
								<h3 className="font-semibold text-xl mb-3">Affordable for Everyone</h3>
								<p className="text-gray-600">
									By working from home and selling directly, I keep costs low. 
									My rings are priced 30-50% below traditional jewelers for comparable quality. 
									Everyone deserves to celebrate their special moments.
								</p>
							</motion.div>

							{/* Local & Transparent */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="bg-white p-6 rounded-xl shadow-md"
							>
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
									<span className="text-2xl">🌍</span>
								</div>
								<h3 className="font-semibold text-xl mb-3">Local & Transparent</h3>
								<p className="text-gray-600">
									I source materials as locally as possible and I'm always transparent 
									about what goes into your ring. Ask me anything about the materials, 
									process, or origins—I believe in complete honesty.
								</p>
							</motion.div>

							{/* Growing & Learning */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 }}
								className="bg-white p-6 rounded-xl shadow-md"
							>
								<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
									<span className="text-2xl">📚</span>
								</div>
								<h3 className="font-semibold text-xl mb-3">Always Improving</h3>
								<p className="text-gray-600">
									I'm not perfect, but I'm dedicated to getting better with every ring. 
									Your feedback is invaluable—it helps me grow as an artisan and ensures 
									each piece is better than the last.
								</p>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Support Recognition */}
				<section className="py-10 bg-gradient-to-br from-blue-50 to-purple-50">
					<div className="container max-w-4xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
							<h2 className="text-3xl font-serif mb-6">With Grateful Support</h2>
							
							<div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
								<div className="flex items-center justify-center gap-4 mb-4">
									<Award className="w-8 h-8 text-primary" />
									<span className="text-xl font-semibold text-gray-800">
										Local Council District Approved
									</span>
									<Award className="w-8 h-8 text-primary" />
								</div>
								
								<p className="text-gray-600 leading-relaxed">
									This business venture has been officially approved and is actively supported 
									by our local council district. Their belief in this project and ongoing assistance 
									has been instrumental in turning a bedroom workshop dream into a legitimate business. 
									This support ensures we operate with full compliance and community backing.
								</p>
								
								<div className="mt-6 pt-6 border-t border-gray-200">
									<p className="text-sm text-gray-500">
										Registration Number: [Council Registration Number]<br />
										District: [Local District Name]
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Personal Message */}
				<section className="py-10 bg-white">
					<div className="container max-w-3xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg"
						>
							<h2 className="text-2xl font-serif mb-4">A Personal Note</h2>
							<p className="text-gray-700 leading-relaxed mb-4">
								Thank you for taking the time to read my story. Every ring I create carries 
								a piece of my journey—from the early days of experimentation to finding purpose 
								through adversity. When you wear one of my rings, you're not just wearing jewelry; 
								you're carrying a symbol of resilience, hope, and the belief that beautiful 
								things can emerge from humble beginnings.
							</p>
							<p className="text-gray-700 leading-relaxed mb-4">
								This business is brand new, and I'm learning every day. There might be bumps 
								along the way, but I promise to always be honest, responsive, and committed 
								to making things right. Your support means more than you know—it's not just 
								buying a ring, it's believing in someone's fresh start.
							</p>
							<p className="text-gray-700 font-semibold">
								Thank you for being part of this journey.
							</p>
							<div className="mt-6">
								<p className="text-gray-600 italic">— The Artisan</p>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="py-10 bg-stone-50">
					<div className="container max-w-4xl text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl font-serif mb-6">Ready to Start Your Ring Journey?</h2>
							<p className="text-lg text-gray-600 mb-8">
								Whether you're looking for something from my collection or dreaming of a custom design, 
								I'd be honored to create something special for you.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/products">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-8 py-4 bg-primary text-white rounded-full font-medium 
														shadow-lg hover:bg-primary/90 transition-all"
									>
									View Ring Collection
									</motion.button>
								</Link>
								<Link href="/contact">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-8 py-4 border-2 border-primary text-primary rounded-full 
														font-medium hover:bg-accent transition-all"
									>
									Get in Touch
									</motion.button>
								</Link>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	)
}