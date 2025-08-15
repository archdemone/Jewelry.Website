export async function POST(req: Request) {
	try {
		const form = await req.formData()
		const name = form.get('name') as string | null
		const email = form.get('email') as string | null
		const subject = (form.get('subject') as string | null) ?? 'General'
		const message = form.get('message') as string | null
		// TODO: Send email to admin and autoresponder via provider
		if (!name || !email || !message) {
			return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), { status: 400 })
		}
		return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
	} catch (e) {
		return new Response(JSON.stringify({ ok: false }), { status: 500 })
	}
}