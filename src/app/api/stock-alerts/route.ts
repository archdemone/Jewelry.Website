export async function POST(req: Request) {
  try {
    const { productId, email } = await req.json();
    if (!productId || !email)
      return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), { status: 400 });
    // TODO: Persist subscription and notify admin
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
