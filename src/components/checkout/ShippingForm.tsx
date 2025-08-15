"use client"

import { useFormContext } from 'react-hook-form'

export default function ShippingForm() {
	const { register, formState: { errors } } = useFormContext<any>()
	const e = errors as any
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-1">Email *</label>
				<input {...register('shipping.email')} type="email" className="w-full rounded-md border p-2" placeholder="you@example.com" />
				{e?.shipping?.email && <p className="mt-1 text-sm text-red-600">{String(e.shipping.email.message)}</p>}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">First name *</label>
					<input {...register('shipping.firstName')} className="w-full rounded-md border p-2" />
					{e?.shipping?.firstName && <p className="mt-1 text-sm text-red-600">{String(e.shipping.firstName.message)}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Last name *</label>
					<input {...register('shipping.lastName')} className="w-full rounded-md border p-2" />
					{e?.shipping?.lastName && <p className="mt-1 text-sm text-red-600">{String(e.shipping.lastName.message)}</p>}
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Company</label>
				<input {...register('shipping.company')} className="w-full rounded-md border p-2" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Address line 1 *</label>
				<input {...register('shipping.address1')} className="w-full rounded-md border p-2" />
				{e?.shipping?.address1 && <p className="mt-1 text-sm text-red-600">{String(e.shipping.address1.message)}</p>}
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Address line 2</label>
				<input {...register('shipping.address2')} className="w-full rounded-md border p-2" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">City *</label>
					<input {...register('shipping.city')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">State/Province *</label>
					<input {...register('shipping.state')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">ZIP/Postal code *</label>
					<input {...register('shipping.postalCode')} className="w-full rounded-md border p-2" />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">Country *</label>
					<input {...register('shipping.country')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Phone</label>
					<input {...register('shipping.phone')} className="w-full rounded-md border p-2" />
				</div>
			</div>
			<div className="flex items-center gap-2">
				<input type="checkbox" {...register('shipping.saveAddressForFuture')} />
				<label className="text-sm">Save this address for future purchases</label>
			</div>
		</div>
	)
}