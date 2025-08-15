"use client"

import { useState } from 'react'

type Address = {
	id: string
	label: string
}

type Props = {
	addresses?: Address[]
	onSelect?: (id: string) => void
}

export default function AddressSelector({ addresses = [], onSelect }: Props) {
	const [selected, setSelected] = useState<string | null>(null)
	if (!addresses.length) return null
	return (
		<div className="rounded-md border p-4">
			<label className="block text-sm font-medium mb-2">Saved addresses</label>
			<select value={selected ?? ''} onChange={(e) => { setSelected(e.target.value); onSelect?.(e.target.value) }} className="w-full rounded-md border p-2 text-sm">
				<option value="">Select an address…</option>
				{addresses.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
			</select>
		</div>
	)
}