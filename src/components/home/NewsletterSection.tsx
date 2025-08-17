"use client"

import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'

const NewsletterSection = () => {
	return (
		<section className="py-20 bg-gold-50">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center max-w-3xl mx-auto"
				>
					<motion.div
						whileHover={{ rotate: 360 }}
						transition={{ duration: 0.6 }}
						className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<Mail className="w-8 h-8 text-white" />
					</motion.div>
					
					<h2 className="text-4xl font-serif mb-4">Stay Connected with the Artisan</h2>
					<p className="text-xl text-gray-600 mb-8">
						Be the first to see new ring designs, artisan stories, and exclusive offers. 
						Join our community of ring lovers and get 10% off your first purchase.
					</p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
					>
						<label htmlFor="homepage-newsletter" className="sr-only">Email address</label>
						<input
							type="email"
							id="homepage-newsletter"
							name="email"
							placeholder="Enter your email address"
							className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
							autoComplete="email"
						/>
						<motion.button
							whileHover={{ scale: 1.05, backgroundColor: '#B8961F' }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
									   shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
						>
							<Sparkles className="w-5 h-5" />
							Subscribe
						</motion.button>
					</motion.div>

					<p className="text-sm text-gray-500 mt-4">
						No spam, ever. Unsubscribe anytime. Your privacy is important to us.
					</p>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm"
					>
						<div className="flex items-center justify-center gap-2">
							<Sparkles className="w-4 h-4 text-gold-500" />
							<span>Early access to new designs</span>
						</div>
						<div className="flex items-center justify-center gap-2">
							<Sparkles className="w-4 h-4 text-gold-500" />
							<span>Artisan workshop stories</span>
						</div>
						<div className="flex items-center justify-center gap-2">
							<Sparkles className="w-4 h-4 text-gold-500" />
							<span>Exclusive member discounts</span>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

export default NewsletterSection


