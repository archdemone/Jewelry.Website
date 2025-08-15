import React from 'react'
import { BreadcrumbsJsonLd } from './JsonLd'

export default function BreadcrumbsSchema({
	items,
}: {
	items: { name: string; item: string }[]
}) {
	if (!items || items.length === 0) return null
	return <BreadcrumbsJsonLd items={items} />
}