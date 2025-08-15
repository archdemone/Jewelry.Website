"use client"

import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export type NewsletterPopupProps = {
	initialDelayMs?: number
	exitIntentEnabled?: boolean
	abVariant?: 'A' | 'B'
}

export default function NewsletterPopup({ initialDelayMs = 6000, exitIntentEnabled = true, abVariant = 'A' }: NewsletterPopupProps) {
	const [open, setOpen] = useState(false)
	const [email, setEmail] = useState('')
	const hasShownRef = useRef(false)

	useEffect(() => {
		// First-time visitor only
		try {
			const seen = localStorage.getItem('newsletter_popup_seen')
			if (seen === 'true') return
		} catch {}

		const timer = setTimeout(() => {
			if (!hasShownRef.current) {
				setOpen(true)
				hasShownRef.current = true
			}
		}, initialDelayMs)

		function onExit(e: MouseEvent) {
			if (!exitIntentEnabled) return
			if (e.clientY <= 0 && !hasShownRef.current) {
				setOpen(true)
				hasShownRef.current = true
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
		try { localStorage.setItem('newsletter_popup_seen', 'true') } catch {}
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error('Please enter a valid email')
			return
		}
		toast.success('Thanks! Check your inbox for 10% off')
		handleClose()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-md">
				<DialogTitle className="font-[var(--font-serif)] text-2xl">Join our newsletter</DialogTitle>
				<DialogDescription>Get 10% off your first order and early access to new collections.</DialogDescription>
				<form onSubmit={handleSubmit} className="mt-4 grid gap-3">
					<div className="grid gap-2">
						<label htmlFor="newsletter_email" className="text-sm font-medium">Email</label>
						<Input id="newsletter_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
					</div>
					<div className="flex items-center justify-between">
						{abVariant === 'A' ? <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe anytime.</p> : <p className="text-xs text-gray-500">Join 25,000+ happy subscribers.</p>}
						<Button type="submit">Get 10% off</Button>
					</div>
				</form>
				<button onClick={handleClose} className="absolute right-3 top-3 text-sm text-gray-500">Close</button>
			</DialogContent>
		</Dialog>
	)
}