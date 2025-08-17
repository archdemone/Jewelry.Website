"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SmartImage from '@/components/common/SmartImage'
import Link from 'next/link'
import {
	ShoppingCart,
	Package,
	Hammer,
	Clock,
	CheckCircle,
	Truck,
	MessageSquare,
	AlertCircle,
	Sparkles,
	Gift,
	Mail,
	Search,
	CreditCard,
	Timer,
	Users,
	Heart
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function CraftingProcessPage() {
	const [activeStep, setActiveStep] = useState(1)

	const processSteps = [
		{
			number: 1,
			title: "Order Received",
			icon: ShoppingCart,
			color: "blue",
			description: "Your custom specifications are carefully reviewed",
			details: "Once you place your order, I personally review every detail of your request. Whether it's a specific size, material preference, or custom engraving, I make sure I understand exactly what you're looking for. Within 24 hours, you'll receive a confirmation email with all your order details."
		},
		{
			number: 2,
			title: "Material Check",
			icon: Package,
			color: "amber",
			description: "Checking material availability",
			details: "I check my current inventory for all required materials. If everything is in stock, we move straight to creation. If not, I'll contact you immediately with options.",
			hasWarning: true
		},
		{
			number: 3,
			title: "Payment & Start",
			icon: CreditCard,
			color: "green",
			description: "Creation begins once payment is confirmed",
			details: "As soon as your payment is confirmed, your ring officially enters my workshop queue. You'll receive an email notification that creation has begun, along with your estimated completion date."
		},
		{
			number: 4,
			title: "Creation Timeline",
			icon: Timer,
			color: "purple",
			description: "Choose your preferred timeline",
			details: "Standard creation takes 2-3 weeks. Need it sooner? Priority service options are available for an additional fee.",
			hasOptions: true
		},
		{
			number: 5,
			title: "Quality Inspection",
			icon: Search,
			color: "indigo",
			description: "Multiple quality checks ensure perfection",
			details: "Every ring undergoes thorough inspection from multiple angles. We check for finish quality, stone security, sizing accuracy, and overall craftsmanship. Only perfect rings leave the workshop."
		},
		{
			number: 6,
			title: "Packaging & Delivery",
			icon: Truck,
			color: "emerald",
			description: "Carefully packed and shipped to you",
			details: "Your ring is carefully packaged in a beautiful presentation box, wrapped securely, and shipped with full tracking. You'll receive tracking information as soon as it's dispatched."
		}
	]

	return (
		<>
			<Header />
			<main className="space-y-0">
				<div className="min-h-screen bg-white">
					{/* Hero Section */}
					<section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
						<div className="absolute inset-0">
							<SmartImage
								srcs={['/images/process/workshop-hero.jpg']}
								alt="Ring crafting process"
								fill
								className="object-cover opacity-60"
								priority
								sizes="100vw"
								quality={90}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
						</div>
						
						<div className="relative z-10 container h-full flex items-center">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="max-w-3xl"
							>
								<h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
									From Order to Your Finger
								</h1>
								<p className="text-xl text-white/90 leading-relaxed">
									A transparent look at how your ring is created, from the moment you order 
									to the day it arrives at your door
								</p>
							</motion.div>
						</div>
					</section>

					{/* Process Timeline */}
					<section className="py-16 bg-white">
						<div className="container max-w-6xl">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-center mb-12"
							>
								<h2 className="text-3xl font-serif mb-4">The Creation Journey</h2>
								<p className="text-lg text-gray-600">
									Click on each step to learn more about the process
								</p>
							</motion.div>

							{/* Desktop Timeline */}
							<div className="hidden md:block relative">
								{/* Connecting Line */}
								<div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200" />
								
								{/* Steps */}
								<div className="relative grid grid-cols-6 gap-4">
									{processSteps.map((step, index) => (
										<motion.div
											key={step.number}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: index * 0.1 }}
											className="relative"
										>
											<button
												onClick={() => setActiveStep(step.number)}
												className={`w-full transition-all ${
													activeStep === step.number ? 'scale-110' : ''
												}`}
											>
												<div className={`
													w-32 h-32 mx-auto rounded-full flex items-center justify-center
													${activeStep === step.number 
														? `bg-${step.color}-100 border-4 border-${step.color}-400` 
														: 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'}
													transition-all cursor-pointer
												`}>
																												<step.icon className={`w-12 h-12 ${
																activeStep === step.number ? `text-${step.color}-600` : 'text-gray-400'
															}`} />
												</div>
												<div className="mt-4">
													<div className={`text-sm font-bold ${
														activeStep === step.number ? 'text-gray-900' : 'text-gray-500'
													}`}>Step {step.number}</div>
													<div className={`text-sm font-medium mt-1 ${
														activeStep === step.number ? 'text-gray-800' : 'text-gray-600'
													}`}>{step.title}</div>
												</div>
											</button>
										</motion.div>
									))}
								</div>
							</div>

							{/* Mobile Timeline */}
							<div className="md:hidden space-y-6">
								{processSteps.map((step, index) => (
									<motion.button
										key={step.number}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										onClick={() => setActiveStep(step.number)}
										className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
											activeStep === step.number 
												? 'bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg' 
												: 'bg-gray-50 hover:bg-gray-100'
										}`}
									>
										<div className={`
											w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0
											${activeStep === step.number 
												? `bg-${step.color}-100 border-2 border-${step.color}-400` 
												: 'bg-white border-2 border-gray-200'}
										`}>
																										<step.icon className={`w-8 h-8 ${
																activeStep === step.number ? `text-${step.color}-600` : 'text-gray-400'
															}`} />
										</div>
										<div className="text-left">
											<div className="font-semibold">Step {step.number}: {step.title}</div>
											<div className="text-sm text-gray-600">{step.description}</div>
										</div>
									</motion.button>
								))}
							</div>

							{/* Active Step Details */}
							<motion.div
								key={activeStep}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="mt-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg"
							>
								<div className="flex items-start gap-6">
									<div className={`
										w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0
										bg-${processSteps[activeStep - 1].color}-100
									`}>
										{React.createElement(processSteps[activeStep - 1].icon, {
											className: `w-10 h-10 text-${processSteps[activeStep - 1].color}-600`
										})}
									</div>
									
									<div className="flex-grow">
										<h3 className="text-2xl font-semibold mb-3">
											Step {activeStep}: {processSteps[activeStep - 1].title}
										</h3>
										<p className="text-gray-700 leading-relaxed mb-4">
											{processSteps[activeStep - 1].details}
										</p>

										{/* Step 2 Special Content - Material Availability */}
										{activeStep === 2 && (
											<div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mt-6">
												<div className="flex items-start gap-3">
													<AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
													<div>
														<h4 className="font-semibold text-amber-900 mb-2">
															Material Not in Stock?
														</h4>
														<p className="text-amber-800 mb-3">
															Don't worry! You have options:
														</p>
														<ul className="space-y-2 text-amber-700">
															<li className="flex items-start gap-2">
																<span className="text-amber-600">•</span>
																<span><strong>Pre-order Option:</strong> Reserve your ring now and we'll begin 
																crafting as soon as materials arrive (typically 1-2 weeks additional wait)</span>
															</li>
															<li className="flex items-start gap-2">
																<span className="text-amber-600">•</span>
																<span><strong>Email Notification:</strong> You'll receive an instant email when 
																materials are in stock and your ring enters production</span>
															</li>
															<li className="flex items-start gap-2">
																<span className="text-amber-600">•</span>
																<span><strong>Alternative Materials:</strong> I can suggest similar materials 
																that are currently available</span>
															</li>
														</ul>
													</div>
												</div>
											</div>
										)}

										{/* Step 4 Special Content - Timeline Options */}
										{activeStep === 4 && (
											<div className="grid md:grid-cols-3 gap-4 mt-6">
												<div className="bg-white p-6 rounded-xl border-2 border-gray-200">
													<div className="text-center mb-3">
														<Clock className="w-8 h-8 text-gray-500 mx-auto" />
													</div>
													<h4 className="font-semibold text-center mb-2">Standard</h4>
													<p className="text-2xl font-bold text-center text-gray-900 mb-2">FREE</p>
													<p className="text-sm text-gray-600 text-center">2-3 weeks</p>
													<p className="text-xs text-gray-500 text-center mt-2">
														Perfect for planned occasions
													</p>
												</div>

												<div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-300">
													<div className="text-center mb-3">
														<Timer className="w-8 h-8 text-purple-600 mx-auto" />
													</div>
													<h4 className="font-semibold text-center mb-2">Priority</h4>
													<p className="text-2xl font-bold text-center text-purple-900 mb-2">+£25</p>
													<p className="text-sm text-purple-700 text-center">7-10 days</p>
													<p className="text-xs text-purple-600 text-center mt-2">
														Great for upcoming events
													</p>
												</div>

												<div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-300">
													<div className="text-center mb-3">
														<Sparkles className="w-8 h-8 text-red-600 mx-auto" />
													</div>
													<h4 className="font-semibold text-center mb-2">Express</h4>
													<p className="text-2xl font-bold text-center text-red-900 mb-2">+£50</p>
													<p className="text-sm text-red-700 text-center">3-5 days</p>
													<p className="text-xs text-red-600 text-center mt-2">
														For urgent requests
													</p>
												</div>
											</div>
										)}

										{/* Step 5 Special Content - Quality Inspection */}
										{activeStep === 5 && (
											<div className="bg-blue-50 p-6 rounded-xl mt-6">
												<h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
													<Users className="w-5 h-5" />
													Multi-Point Inspection Process
												</h4>
												<div className="grid md:grid-cols-2 gap-4">
													<div className="space-y-2">
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-green-600" />
															<span className="text-sm">Sizing accuracy check</span>
														</div>
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-green-600" />
															<span className="text-sm">Stone security verification</span>
														</div>
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-green-600" />
															<span className="text-sm">Surface finish inspection</span>
														</div>
													</div>
													<div className="space-y-2">
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-green-600" />
															<span className="text-sm">Symmetry assessment</span>
														</div>
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-green-600" />
															<span className="text-sm">Comfort fit testing</span>
														</div>
														<div className="flex items-center gap-2">
															<CheckCircle className="w-5 h-5 text-green-600" />
															<span className="text-sm">Final polish perfection</span>
														</div>
													</div>
												</div>
																											<p className="text-sm text-blue-700 mt-4 italic">
																"Multiple inspectors review each ring to ensure it meets our quality standards"
															</p>
														</div>
													)}
												</div>
											</div>
										</motion.div>
									</div>
								</section>

					{/* Visual Process Gallery */}
					<section className="py-16 bg-gray-50">
						<div className="container max-w-6xl">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-3xl font-serif text-center mb-12"
							>
								The Craft in Action
							</motion.h2>

							<div className="grid md:grid-cols-3 gap-6">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.1 }}
									className="relative group overflow-hidden rounded-xl"
								>
																	<SmartImage
									srcs={['/images/process/material-selection.jpg']}
									alt="Selecting materials"
									width={400}
									height={300}
									className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
									sizes="(max-width: 768px) 100vw, 400px"
									quality={90}
								/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
										<div className="text-white">
											<h3 className="font-semibold text-lg">Material Selection</h3>
											<p className="text-sm opacity-90">Choosing the perfect materials for your ring</p>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
									className="relative group overflow-hidden rounded-xl"
								>
									<SmartImage
										srcs={['/images/process/crafting-action.jpg']}
										alt="Crafting process"
										width={400}
										height={300}
										className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
										sizes="(max-width: 768px) 100vw, 400px"
										quality={90}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
										<div className="text-white">
											<h3 className="font-semibold text-lg">Precision Crafting</h3>
											<p className="text-sm opacity-90">Every detail carefully shaped by hand</p>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									className="relative group overflow-hidden rounded-xl"
								>
									<SmartImage
										srcs={['/images/process/final-polish.jpg']}
										alt="Final polishing"
										width={400}
										height={300}
										className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
										sizes="(max-width: 768px) 100vw, 400px"
										quality={90}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
										<div className="text-white">
											<h3 className="font-semibold text-lg">Perfect Finish</h3>
											<p className="text-sm opacity-90">The final polish that makes it shine</p>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</section>

					{/* FAQ Section */}
					<section className="py-16 bg-white">
						<div className="container max-w-4xl">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-3xl font-serif text-center mb-12"
							>
								Common Questions About the Process
							</motion.h2>

							<div className="space-y-6">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									className="bg-gray-50 p-6 rounded-xl"
								>
									<h3 className="font-semibold text-lg mb-2">
										What happens if I need my ring urgently?
									</h3>
									<p className="text-gray-700">
										We offer Priority (7-10 days for +£25) and Express (3-5 days for +£50) services. 
										Select your preferred timeline during checkout or contact me directly for urgent requests.
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									className="bg-gray-50 p-6 rounded-xl"
								>
									<h3 className="font-semibold text-lg mb-2">
										Can I make changes after ordering?
									</h3>
									<p className="text-gray-700">
										You can make changes within 24 hours of ordering, before production begins. 
										Once crafting starts, changes may not be possible or may incur additional costs.
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									className="bg-gray-50 p-6 rounded-xl"
								>
									<h3 className="font-semibold text-lg mb-2">
										How will I know when my ring is ready?
									</h3>
									<p className="text-gray-700">
										You'll receive email updates at each major milestone: order confirmation, 
										production start, quality check complete, and shipping notification with tracking details.
									</p>
								</motion.div>
							</div>
						</div>
					</section>

					{/* Special Offer Banner - First 100 Customers */}
					<section className="py-8 bg-gradient-to-r from-gold-500 to-amber-500">
						<div className="container max-w-4xl">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-2xl"
							>
								<div className="flex items-center justify-center mb-4">
									<Gift className="w-8 h-8 text-gold-600 mr-2" />
									<h3 className="text-2xl font-bold text-gray-900">
										🎉 First 100 Customers Special!
									</h3>
									<Gift className="w-8 h-8 text-gold-600 ml-2" />
								</div>
								
								<div className="text-center">
									<p className="text-lg text-gray-700 mb-4">
										<strong>FREE Worldwide Delivery</strong> on your first purchase!
									</p>
									<div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full">
										<Truck className="w-5 h-5 text-green-600" />
										<span className="text-green-800 font-semibold">
											Limited Offer • Only {100 - 23} spots remaining!
										</span>
									</div>
									<p className="text-sm text-gray-600 mt-4">
										As a thank you for being one of our founding customers, enjoy completely 
										free shipping anywhere in the world. No minimum order, no strings attached!
									</p>
								</div>
							</motion.div>
						</div>
					</section>

					{/* Call to Action */}
					<section className="py-16 bg-gray-50">
						<div className="container max-w-4xl text-center">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
							>
								<h2 className="text-3xl font-serif mb-6">Ready to Begin Your Ring Journey?</h2>
								<p className="text-lg text-gray-600 mb-8">
									Every ring starts with a conversation. Let's create something special together.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link href="/products">
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="px-8 py-4 bg-gold-500 text-white rounded-full font-medium 
													   shadow-lg hover:bg-gold-600 transition-all inline-flex items-center gap-2"
										>
											<ShoppingCart className="w-5 h-5" />
											Browse Collection
										</motion.button>
									</Link>
									<Link href="/custom-design">
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="px-8 py-4 border-2 border-gold-500 text-gold-600 rounded-full 
													   font-medium hover:bg-gold-50 transition-all inline-flex items-center gap-2"
										>
											<Hammer className="w-5 h-5" />
											Custom Design
										</motion.button>
									</Link>
								</div>
							</motion.div>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</>
	)
}
