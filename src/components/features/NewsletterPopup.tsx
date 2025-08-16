"use client"

import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Gift, Sparkles, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export type NewsletterPopupProps = {
	initialDelayMs?: number
	exitIntentEnabled?: boolean
	abVariant?: 'A' | 'B'
}

export default function NewsletterPopup({ initialDelayMs = 1000, exitIntentEnabled = true, abVariant = 'A' }: NewsletterPopupProps) {
	const [open, setOpen] = useState(false)
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const hasShownRef = useRef(false)

	useEffect(() => {
		// Check if we should show the popup (every hour)
		const checkAndShowPopup = () => {
			try {
				// Temporarily show immediately for testing
				if (!hasShownRef.current) {
					setOpen(true)
					hasShownRef.current = true
					localStorage.setItem('newsletter_popup_last_shown', Date.now().toString())
				}
				
				// Original hourly logic (commented out for testing)
				/*
				const lastShown = localStorage.getItem('newsletter_popup_last_shown')
				const now = Date.now()
				
				// Show if never shown before or if it's been more than 1 hour (3600000ms)
				if (!lastShown || (now - parseInt(lastShown)) > 3600000) {
					if (!hasShownRef.current) {
						setOpen(true)
						hasShownRef.current = true
						localStorage.setItem('newsletter_popup_last_shown', now.toString())
					}
				}
				*/
			} catch {}
		}

		// Initial delay
		const timer = setTimeout(() => {
			checkAndShowPopup()
		}, initialDelayMs)

		// Exit intent handler
		function onExit(e: MouseEvent) {
			if (!exitIntentEnabled) return
			if (e.clientY <= 0 && !hasShownRef.current) {
				checkAndShowPopup()
			}
		}
		
		document.addEventListener('mouseout', onExit)
		
		return () => {
			clearTimeout(timer)
			document.removeEventListener('mouseout', onExit)
		}
	}, [initialDelayMs, exitIntentEnabled])

	function handleClose() {
		setOpen(false)
		setIsSuccess(false)
		setEmail('')
		setIsSubmitting(false)
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error('Please enter a valid email address')
			return
		}

		setIsSubmitting(true)
		
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		setIsSuccess(true)
		toast.success('Welcome! Check your inbox for your 10% discount code')
		
		// Close after showing success state
		setTimeout(() => {
			handleClose()
		}, 2000)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-md p-0 overflow-hidden border-0 shadow-2xl !bg-transparent">
				<AnimatePresence mode="wait">
					{!isSuccess ? (
						<motion.div
							key="form"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className="relative"
						>
							{/* Background with gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 rounded-lg border-2 border-amber-400/30 shadow-2xl" />
							
							{/* Decorative elements */}
							<div className="absolute top-4 right-4">
								<Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
							</div>
							
							<div className="absolute -top-2 -left-2 w-20 h-20 bg-white/10 rounded-full blur-xl" />
							<div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full blur-xl" />

							{/* Content */}
							<div className="relative p-8 text-center">
								{/* Close button */}
								<button 
									onClick={handleClose}
									className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
								>
									<X className="w-5 h-5" />
								</button>

								{/* Icon */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
									className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6"
								>
									<Mail className="w-8 h-8 text-white" />
								</motion.div>

								{/* Title */}
								<motion.h2
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="font-[var(--font-serif)] text-3xl font-bold text-white mb-2"
								>
									Join Our Circle
								</motion.h2>

								{/* Subtitle */}
								<motion.p
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.4 }}
									className="text-white/90 mb-6 text-lg"
								>
									Get exclusive access to new collections and special offers
								</motion.p>

								{/* Offer badge */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
									className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
								>
									<Gift className="w-4 h-4 text-white" />
									<span className="text-white font-semibold">10% OFF Your First Order</span>
								</motion.div>

								{/* Form */}
								<motion.form
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.6 }}
									onSubmit={handleSubmit}
									className="space-y-4"
								>
									<div className="relative">
										<Input
											id="newsletter_email"
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email address"
											className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border border-amber-200/50 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-amber-300/50 focus:border-amber-300 transition-all shadow-sm"
											required
										/>
									</div>

									<Button
										type="submit"
										disabled={isSubmitting}
										className="w-full bg-white/95 text-amber-800 hover:bg-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 border border-amber-200 shadow-lg"
									>
										{isSubmitting ? (
											<div className="flex items-center gap-2">
												<div className="w-4 h-4 border-2 border-amber-800 border-t-transparent rounded-full animate-spin" />
												Subscribing...
											</div>
										) : (
											'Get My Discount'
										)}
									</Button>

									<p className="text-white/70 text-sm">
										Join 2,500+ artisans and jewelry lovers. Unsubscribe anytime.
									</p>
								</motion.form>
							</div>
						</motion.div>
					) : (
						<motion.div
							key="success"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className="relative p-8 text-center"
						>
							{/* Success background */}
							<div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-600 border-2 border-emerald-400/30 shadow-2xl" />
							
							{/* Success content */}
							<div className="relative">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
									className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6"
								>
									<CheckCircle className="w-8 h-8 text-white" />
								</motion.div>

								<motion.h2
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="font-[var(--font-serif)] text-3xl font-bold text-white mb-4"
								>
									Welcome!
								</motion.h2>

								<motion.p
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.4 }}
									className="text-white/90 text-lg"
								>
									Check your inbox for your exclusive 10% discount code
								</motion.p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	)
}