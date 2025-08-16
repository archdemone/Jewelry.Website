'use client'

import { motion } from 'framer-motion'
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { 
	Mail, 
	Phone, 
	MapPin, 
	Clock, 
	Send, 
	MessageSquare,
	Instagram,
	Facebook,
	Twitter,
	ArrowRight,
	CheckCircle,
	Loader2,
	Calendar,
	Info,
	Image as ImageIcon,
	Heart
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'


type ContactFormData = {
	name: string
	email: string
	phone: string
	subject: 'general' | 'custom' | 'order' | 'repair' | 'other'
	message: string
	file: File | null
}

export default function ContactPage() {
	const [formData, setFormData] = useState<ContactFormData>({
		name: '',
		email: '',
		phone: '',
		subject: 'general',
		message: '',
		file: null
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)
		setTimeout(() => {
			setIsSubmitting(false)
			setSubmitStatus('success')
		}, 2000)
	}

	const contactMethods = [
		{
			icon: Mail,
			title: 'Email',
			value: 'artisan@rings.com',
			description: 'Best for detailed inquiries',
			color: 'blue',
			bgGradient: 'from-blue-50 to-indigo-50',
			iconBg: 'bg-blue-100',
			iconColor: 'text-blue-600',
			hoverBg: 'hover:from-blue-100 hover:to-indigo-100',
		},
		{
			icon: MessageSquare,
			title: 'Live Chat',
			value: 'Available 9am-6pm',
			description: 'Quick questions & support',
			color: 'green',
			bgGradient: 'from-green-50 to-emerald-50',
			iconBg: 'bg-green-100',
			iconColor: 'text-green-600',
			hoverBg: 'hover:from-green-100 hover:to-emerald-100',
		},
		{
			icon: Phone,
			title: 'Phone',
			value: '+44 123 456 7890',
			description: 'Mon-Fri, 10am-5pm',
			color: 'purple',
			bgGradient: 'from-purple-50 to-pink-50',
			iconBg: 'bg-purple-100',
			iconColor: 'text-purple-600',
			hoverBg: 'hover:from-purple-100 hover:to-pink-100',
		},
	]

	return (
		<>
			<Header />
			<main>
				<div className="min-h-screen bg-white">
					{/* Hero Section with Gradient Background */}
					<section className="relative overflow-hidden">
						{/* Animated Background Gradient */}
						<div className="absolute inset-0">
							<div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" />
							<motion.div
								animate={{
									backgroundPosition: ['0% 0%', '100% 100%'],
								}}
								transition={{
									duration: 20,
									repeat: Infinity,
									repeatType: 'reverse',
								}}
								className="absolute inset-0 opacity-50"
								style={{
									backgroundImage:
										'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)',
									backgroundSize: '100% 100%',
								}}
							/>
						</div>

						{/* Floating Elements */}
						<motion.div
							animate={{ y: [-10, 10, -10] }}
							transition={{ duration: 6, repeat: Infinity }}
							className="absolute top-20 left-10 text-4xl opacity-20"
						>
							💍
						</motion.div>
						<motion.div
							animate={{ y: [10, -10, 10] }}
							transition={{ duration: 8, repeat: Infinity }}
							className="absolute bottom-20 right-10 text-4xl opacity-20"
						>
							✨
						</motion.div>

						<div className="relative z-10 container py-20">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="text-center max-w-3xl mx-auto"
							>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ duration: 0.5 }}
									className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6"
								>
									<MessageSquare className="w-10 h-10 text-gold-500" />
								</motion.div>

								<h1 className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
									Let's Create Something Special
								</h1>

								<p className="text-xl text-gray-600 leading-relaxed">
									Whether you have a question, want to discuss a custom design, or just want to say hello, 
									I'd love to hear from you. Every conversation starts a new creative journey.
								</p>

								{/* Quick Stats */}
								<div className="flex justify-center gap-8 mt-10">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
										className="text-center"
									>
										<div className="text-3xl font-bold text-gold-600">24hr</div>
										<div className="text-sm text-gray-600">Response Time</div>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3 }}
										className="text-center"
									>
										<div className="text-3xl font-bold text-gold-600">100%</div>
										<div className="text-sm text-gray-600">Satisfaction</div>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4 }}
										className="text-center"
									>
										<div className="text-3xl font-bold text-gold-600">1-on-1</div>
										<div className="text-sm text-gray-600">Personal Service</div>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</section>

					{/* Contact Methods Cards */}
					<section className="py-16 bg-gradient-to-b from-gray-50 to-white">
						<div className="container max-w-5xl">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-3xl font-serif text-center mb-12"
							>
								Choose Your Preferred Way to Connect
							</motion.h2>

							<div className="grid md:grid-cols-3 gap-6">
								{contactMethods.map((method, index) => (
									<motion.div
										key={method.title}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										whileHover={{ y: -5, transition: { duration: 0.2 } }}
										className={`relative group bg-gradient-to-br ${method.bgGradient} ${method.hoverBg} p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
									>
										{/* Decorative Corner Element */}
										<div className="absolute -top-2 -right-2 w-20 h-20 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

										<div className={`${method.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
											<method.icon className={`w-7 h-7 ${method.iconColor}`} />
										</div>

										<h3 className="font-semibold text-lg mb-1">{method.title}</h3>
										<p className="font-medium text-gray-800 mb-2">{method.value}</p>
										<p className="text-sm text-gray-600">{method.description}</p>

										<motion.div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
											<ArrowRight className="w-5 h-5 text-gray-400" />
										</motion.div>
									</motion.div>
								))}
							</div>
						</div>
					</section>

					{/* Main Contact Form Section */}
					<section className="py-16 bg-white">
						<div className="container max-w-6xl">
							<div className="grid lg:grid-cols-2 gap-12">
								{/* Left Column - Form */}
								<motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
									<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
										<div className="flex items-center gap-3 mb-6">
											<div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-amber-500 rounded-lg flex items-center justify-center">
												<Send className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-2xl font-semibold">Send a Message</h3>
										</div>

										{submitStatus === 'success' ? (
											<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													transition={{ type: 'spring', duration: 0.5 }}
													className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
												>
													<CheckCircle className="w-10 h-10 text-green-600" />
												</motion.div>
												<h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
												<p className="text-gray-600">I'll get back to you within 24 hours.</p>
												<button onClick={() => setSubmitStatus(null)} className="mt-6 text-gold-600 hover:text-gold-700 font-medium">
													Send Another Message
												</button>
											</motion.div>
										) : (
											<form onSubmit={handleSubmit} className="space-y-6">
												<div className="grid md:grid-cols-2 gap-6">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
														<input
															type="text"
															required
															value={formData.name}
															onChange={(e) => setFormData({ ...formData, name: e.target.value })}
															className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
															placeholder="John Smith"
														/>
													</div>

													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
														<input
															type="email"
															required
															value={formData.email}
															onChange={(e) => setFormData({ ...formData, email: e.target.value })}
															className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
															placeholder="john@example.com"
														/>
													</div>
												</div>

												<div className="grid md:grid-cols-2 gap-6">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
														<input
															type="tel"
															value={formData.phone}
															onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
															className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
															placeholder="+44 123 456 7890"
														/>
													</div>

													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
														<select
															required
															value={formData.subject}
															onChange={(e) => setFormData({ ...formData, subject: e.target.value as ContactFormData['subject'] })}
															className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
														>
															<option value="general">General Inquiry</option>
															<option value="custom">Custom Design</option>
															<option value="order">Order Question</option>
															<option value="repair">Repair/Resize</option>
															<option value="other">Other</option>
														</select>
													</div>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
													<textarea
														required
														rows={5}
														value={formData.message}
														onChange={(e) => setFormData({ ...formData, message: e.target.value })}
														className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
														placeholder="Tell me about your dream ring..."
													/>
												</div>

												<div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
													<label className="flex items-center gap-3 cursor-pointer">
														<input
															type="file"
															className="hidden"
															accept="image/*"
															onChange={(e: ChangeEvent<HTMLInputElement>) =>
																setFormData({ ...formData, file: e.target.files?.[0] ?? null })
															}
														/>
														<div className="flex items-center gap-3">
															<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
																<ImageIcon className="w-5 h-5 text-blue-600" />
															</div>
															<div>
																<p className="font-medium text-gray-800">Attach Inspiration</p>
																<p className="text-sm text-gray-600">{formData.file ? formData.file.name : 'Add images for custom designs'}</p>
															</div>
														</div>
													</label>
												</div>

												<motion.button
													type="submit"
													disabled={isSubmitting}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													className="w-full py-4 bg-gradient-to-r from-gold-500 to-amber-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
												>
													{isSubmitting ? (
														<>
															<Loader2 className="w-5 h-5 animate-spin" />
															Sending...
														</>
													) : (
														<>
															<Send className="w-5 h-5" />
															Send Message
														</>
													)}
												</motion.button>
											</form>
										)}
									</div>
								</motion.div>

								{/* Right Column - Additional Info */}
								<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
									{/* Workshop Location Card */}
									<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 relative overflow-hidden">
										<div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl" />
										<div className="relative">
											<div className="flex items-center gap-3 mb-4">
												<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
													<MapPin className="w-5 h-5 text-purple-600" />
												</div>
												<h3 className="font-semibold text-lg">Workshop Location</h3>
											</div>
											<p className="text-gray-700 mb-2">Based in Manchester, UK</p>
											<p className="text-sm text-gray-600">
												Home workshop crafting rings with love and precision. 
												Visits by appointment only.
											</p>
										</div>
									</div>

									{/* Business Hours Card */}
									<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 relative overflow-hidden">
										<div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl" />
										<div className="relative">
											<div className="flex items-center gap-3 mb-4">
												<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
													<Clock className="w-5 h-5 text-green-600" />
												</div>
												<h3 className="font-semibold text-lg">Business Hours</h3>
											</div>
											<div className="space-y-2 text-sm">
												<div className="flex justify-between">
													<span className="text-gray-600">Monday - Friday</span>
													<span className="font-medium">10:00 AM - 6:00 PM</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Saturday</span>
													<span className="font-medium">11:00 AM - 4:00 PM</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Sunday</span>
													<span className="font-medium">Closed</span>
												</div>
											</div>
											<p className="text-xs text-gray-500 mt-3 italic">* Response times may vary during busy periods</p>
										</div>
									</div>

									{/* Social Media Card */}
									<div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 relative overflow-hidden">
										<div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl" />
										<div className="relative">
											<div className="flex items-center gap-3 mb-4">
												<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
													<Heart className="w-5 h-5 text-orange-600" />
												</div>
												<h3 className="font-semibold text-lg">Follow the Journey</h3>
											</div>
											<p className="text-sm text-gray-600 mb-4">See work in progress, new designs, and behind-the-scenes content</p>
											<div className="flex gap-3">
												<motion.a href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
													<Instagram className="w-5 h-5 text-gray-700" />
												</motion.a>
												<motion.a href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
													<Facebook className="w-5 h-5 text-gray-700" />
												</motion.a>
												<motion.a href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
													<Twitter className="w-5 h-5 text-gray-700" />
												</motion.a>
											</div>
										</div>
									</div>

									{/* Quick Tip */}
									<div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white relative overflow-hidden">
										<div className="absolute -top-5 -right-5 text-6xl opacity-10">💍</div>
										<div className="relative">
											<div className="flex items-center gap-2 mb-3">
												<Info className="w-5 h-5" />
												<h4 className="font-semibold">Pro Tip</h4>
											</div>
											<p className="text-sm text-white/90">
												For custom designs, include as many details as possible - ring size, 
												preferred metals, stone preferences, and any inspiration images you have!
											</p>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</section>

					{/* FAQ Quick Links */}
					<section className="py-16 bg-gradient-to-b from-gray-50 to-white">
						<div className="container max-w-4xl">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<h2 className="text-3xl font-serif mb-6">Common Questions</h2>
								<p className="text-gray-600 mb-8">Can't find what you're looking for? Just send me a message!</p>

								<div className="grid md:grid-cols-2 gap-4">
									{[
										'How long does a custom ring take?',
										'Do you offer payment plans?',
										'Can I see samples before ordering?',
										'Do you ship internationally?',
									].map((question, index) => (
										<motion.a
											key={index}
											href="/faq"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: index * 0.1 }}
											whileHover={{ x: 5 }}
											className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gold-300 hover:shadow-md transition-all group"
										>
											<span className="text-gray-700">{question}</span>
											<ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gold-500 transition-colors" />
										</motion.a>
									))}
								</div>
							</motion.div>
						</div>
					</section>

					{/* Final CTA */}
					<section className="py-20 bg-gradient-to-r from-gold-500 via-amber-500 to-orange-500 relative overflow-hidden">
						<div className="absolute inset-0 bg-black/10" />
						<motion.div
							animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
							transition={{ duration: 8, repeat: Infinity }}
							className="absolute top-10 right-10 text-white/20 text-8xl"
						>
							✨
						</motion.div>

						<div className="container relative z-10">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-center text-white"
							>
								<h2 className="text-4xl font-serif mb-4">Let's Start Creating Your Perfect Ring</h2>
								<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
									Every great ring begins with a conversation. I'm here to listen, 
									advise, and bring your vision to life.
								</p>
								<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-gold-600 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
									<Calendar className="w-5 h-5" />
									Book a Consultation
								</motion.button>
							</motion.div>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</>
	)
}


