import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/admin-auth'
import { cookies } from 'next/headers'
import { authenticator } from 'otplib'

export default async function VerifyMfaPage() {
	await requireAdmin()
	return (
		<div className="max-w-md">
			<h1 className="text-2xl font-semibold mb-4">Verify MFA</h1>
			<form action={verify} className="space-y-4">
				<input name="code" placeholder="Enter 6-digit code" className="w-full rounded-md border border-gray-300 px-3 py-2" required />
				<button className="rounded-md bg-black px-4 py-2 font-medium text-white">Verify</button>
			</form>
		</div>
	)
}

async function verify(formData: FormData): Promise<void> {
	'use server'
	const code = String(formData.get('code') || '')
	const session = await requireAdmin()
	const userId = (session.user as any).id as string
	const user = await db.user.findUnique({ where: { id: userId } })
	if (!user?.mfaSecret) throw new Error('MFA not enrolled')
	const ok = authenticator.verify({ token: code, secret: user.mfaSecret })
	if (!ok) throw new Error('Invalid code')
	cookies().set('mfa_verified', 'true', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/' })
	await db.user.update({ where: { id: userId }, data: { tokenVersion: (user.tokenVersion || 0) + 1 } })
}