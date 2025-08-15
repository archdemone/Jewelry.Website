import { z } from 'zod'

export const emailSchema = z.string().email()

export const phoneSchema = z
	.string()
	.min(7)
	.max(20)
	.regex(/^[+()\-\s\d]*$/, 'Invalid phone number')
	.optional()

export const postalCodeSchema = z
	.string()
	.min(3)
	.max(12)

export const countrySchema = z.string().min(2)

export const addressSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	company: z.string().optional(),
	address1: z.string().min(1, 'Address is required'),
	address2: z.string().optional(),
	city: z.string().min(1, 'City is required'),
	state: z.string().min(1, 'State/Province is required'),
	postalCode: postalCodeSchema,
	country: countrySchema,
	phone: phoneSchema,
	saveToAddressBook: z.boolean().optional(),
})

export const shippingInformationSchema = addressSchema.extend({
	email: emailSchema,
	isGuest: z.boolean().optional(),
	saveAddressForFuture: z.boolean().optional(),
})

export const billingInformationSchema = addressSchema.extend({
	sameAsShipping: z.boolean().optional(),
})

export const shippingMethodSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.number().nonnegative(),
	estimatedDays: z.number().int().positive(),
	insurance: z.boolean().optional(),
	giftWrap: z.boolean().optional(),
	notes: z.string().max(500).optional(),
})

export const cartItemSchema = z.object({
	productId: z.string(),
	name: z.string(),
	price: z.number(),
	image: z.string().url().optional(),
	quantity: z.number().int().positive(),
})

export const checkoutDataSchema = z.object({
	shipping: shippingInformationSchema,
	billing: billingInformationSchema.optional(),
	shippingMethod: shippingMethodSchema,
	items: z.array(cartItemSchema).min(1),
	subtotal: z.number().nonnegative(),
	shippingCost: z.number().nonnegative(),
	tax: z.number().nonnegative(),
	total: z.number().positive(),
	currency: z.string().default('usd'),
	paymentIntentId: z.string().optional(),
})

export type ShippingInformation = z.infer<typeof shippingInformationSchema>
export type BillingInformation = z.infer<typeof billingInformationSchema>
export type ShippingMethod = z.infer<typeof shippingMethodSchema>
export type CheckoutData = z.infer<typeof checkoutDataSchema>