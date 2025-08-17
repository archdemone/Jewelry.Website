import { db } from '@/lib/db'
import { headers } from 'next/headers'

export async function audit(action: string, entity: string, entityId?: string, before?: any, after?: any) {
	try {
		const hdrs = headers()
		const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || undefined
		const ua = hdrs.get('user-agent') || undefined
		await db.auditLog.create({ data: { action, entity, entityId, before, after, ip, ua } as any })
	} catch (e) {
		// best-effort; swallow errors to not break primary flow
	}
}