"use client"

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export type FAQItem = { id: string; question: string; answer: string; category: string; popularity?: number }
export type FAQAccordionProps = { items: FAQItem[]; categories?: string[] }

export default function FAQAccordion({ items, categories }: FAQAccordionProps) {
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState<string>('All')
	const [openId, setOpenId] = useState<string | null>(null)

	const cats = useMemo(() => ['All', ...(categories ?? Array.from(new Set(items.map(i => i.category))))], [items, categories])
	const filtered = useMemo(() => {
		const q = query.toLowerCase().trim()
		return items
			.filter(i => (category === 'All' || i.category === category))
			.filter(i => !q || i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q))
			.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
	}, [items, query, category])

	return (
		<div className="grid gap-4">
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search FAQs" className="md:max-w-sm" />
				<div className="flex flex-wrap gap-2">
					{cats.map(c => (
						<button
							key={c}
							onClick={() => setCategory(c)}
							className={`rounded-full border px-3 py-1 text-sm ${category === c ? 'bg-black text-white' : 'bg-white text-gray-700'}`}
						>
							{c}
						</button>
					))}
				</div>
			</div>

			<div className="divide-y rounded-md border">
				{filtered.map(i => (
					<div key={i.id} className="p-3">
						<button
							className="flex w-full items-center justify-between text-left"
							onClick={() => setOpenId(prev => prev === i.id ? null : i.id)}
							aria-expanded={openId === i.id}
						>
							<span className="font-medium">{i.question}</span>
							<span className="text-sm text-gray-500">{i.category}</span>
						</button>
						<AnimatePresence initial={false}>
							{openId === i.id && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.25 }}
									className="overflow-hidden"
								>
									<div className="prose prose-sm mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: i.answer }} />
									<div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
										<span>Was this helpful?</span>
										<Button size="sm" variant="outline">Yes</Button>
										<Button size="sm" variant="outline">No</Button>
										<a href="/contact" className="ml-auto underline">Contact support</a>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</div>
	)
}