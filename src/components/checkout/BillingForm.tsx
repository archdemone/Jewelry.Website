"use client"

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

export default function BillingForm() {
	const { register, setValue } = useFormContext<any>()
	const sameAsShipping = useWatch({ name: 'billing.sameAsShipping' })
	const shipping = useWatch({ name: 'shipping' })

	useEffect(() => {
		if (sameAsShipping && shipping) {
			for (const key of ['firstName','lastName','company','address1','address2','city','state','postalCode','country','phone'] as const) {
				setValue(`billing.${key}`, shipping[key])
			}
		}
	}, [sameAsShipping, shipping, setValue])

	return (
		<div className="space-y-4">
			<label className="flex items-center gap-2">
				<input type="checkbox" {...register('billing.sameAsShipping')} />
				<span className="text-sm">Billing address is same as shipping</span>
			</label>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">First name *</label>
					<input {...register('billing.firstName')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Last name *</label>
					<input {...register('billing.lastName')} className="w-full rounded-md border p-2" />
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Company</label>
				<input {...register('billing.company')} className="w-full rounded-md border p-2" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Address line 1 *</label>
				<input {...register('billing.address1')} className="w-full rounded-md border p-2" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Address line 2</label>
				<input {...register('billing.address2')} className="w-full rounded-md border p-2" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">City *</label>
					<input {...register('billing.city')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">State/Province *</label>
					<input {...register('billing.state')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">ZIP/Postal code *</label>
					<input {...register('billing.postalCode')} className="w-full rounded-md border p-2" />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">Country *</label>
					<input {...register('billing.country')} className="w-full rounded-md border p-2" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Phone</label>
					<input {...register('billing.phone')} className="w-full rounded-md border p-2" />
				</div>
			</div>
		</div>
	)
}