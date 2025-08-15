"use client"

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export type LiveChatProps = {
	provider?: 'custom' | 'intercom' | 'crisp' | 'tawk'
}

export default function LiveChat({ provider = 'custom' }: LiveChatProps) {
	const [open, setOpen] = useState(false)
	const [online] = useState(true)

	useEffect(() => {
		if (provider === 'intercom') {
			// load intercom script
		} else if (provider === 'crisp') {
			// load crisp script
		} else if (provider === 'tawk') {
			// load tawk script
		}
	}, [provider])

	return (
		<>
			<button
				aria-label="Open chat"
				onClick={() => setOpen(v => !v)}
				className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg"
			>
				<MessageCircle />
				<span className="sr-only">Chat</span>
				<span className={`absolute -right-1 -top-1 h-3 w-3 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
			</button>
			{open && (
				<div className="fixed bottom-20 right-4 z-50 w-80 overflow-hidden rounded-lg border bg-white shadow-xl">
					<div className="flex items-center justify-between border-b p-3">
						<div className="text-sm font-medium">Live Support</div>
						<button onClick={() => setOpen(false)} className="text-xs text-gray-500">Close</button>
					</div>
					<div className="h-64 p-3 text-sm text-gray-600">How can we help you today?</div>
					<div className="border-t p-3 text-xs text-gray-500">Powered by {provider}</div>
				</div>
			)}
		</>
	)
}