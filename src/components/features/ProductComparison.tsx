"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export type ComparedProduct = { id: string; name: string; price: number; material?: string; gemstone?: string; weight?: string; image?: string }

export default function ProductComparison() {
	const [items, setItems] = useState<ComparedProduct[]>([])

	function add(product: ComparedProduct) {
		setItems(prev => prev.find(p => p.id === product.id) ? prev : prev.length < 3 ? [...prev, product] : prev)
	}
	function remove(id: string) { setItems(prev => prev.filter(i => i.id !== id)) }

	return (
		<div className="grid gap-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-semibold">Compare Products</h3>
				<div className="text-sm text-gray-600">Add up to 3 items</div>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="sticky top-0 bg-white">
						<tr>
							<th className="w-48">Feature</th>
							{items.map(i => (
								<th key={i.id} className="min-w-48">
									<div className="flex items-center justify-between">
										<span className="font-medium">{i.name}</span>
										<Button size="sm" variant="ghost" onClick={() => remove(i.id)}>Remove</Button>
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{[
							{ label: 'Price', render: (i: ComparedProduct) => `$${i.price.toFixed(2)}` },
							{ label: 'Material', render: (i: ComparedProduct) => i.material ?? '—' },
							{ label: 'Gemstone', render: (i: ComparedProduct) => i.gemstone ?? '—' },
							{ label: 'Weight', render: (i: ComparedProduct) => i.weight ?? '—' },
						].map(row => (
							<tr key={row.label} className="border-t">
								<td className="py-3 font-medium">{row.label}</td>
								{items.map(i => <td key={i.id} className="py-3">{row.render(i)}</td>)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="text-xs text-gray-500">Share your comparison by copying the URL once implemented.</div>
		</div>
	)
}