import { requireAdminApi } from '@/lib/admin/admin-auth'
import { randomBytes } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const MAX_SIZE = 5 * 1024 * 1024
const MAX_DIM = 2000

function isImageMime(m: string | null) {
	return !!m && /^image\/(jpeg|png|webp|avif)$/.test(m)
}

async function sniffMagicBytes(buf: Buffer): Promise<boolean> {
	if (buf.length < 12) return false
	// JPEG
	if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true
	// PNG
	if (buf.slice(0,8).equals(Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]))) return true
	// WebP
	if (buf.slice(0,4).toString('ascii') === 'RIFF' && buf.slice(8,12).toString('ascii') === 'WEBP') return true
	// AVIF (HEIF brand)
	if (buf.slice(4,8).toString('ascii') === 'ftyp') return true
	return false
}

function hasDangerousExtension(filename: string): boolean {
	const lowered = filename.toLowerCase()
	if (/[.]{2,}/.test(lowered)) return true
	if (/[.](php|phtml|js|mjs|ts|tsx|html|svg|exe|sh|bat)(?:[.].*)?$/.test(lowered)) return true
	return false
}

export async function POST(req: Request) {
	const gate = await requireAdminApi()
	if ((gate as any)?.ok !== true) return gate as Response
	const ct = req.headers.get('content-type')
	if (!ct || !ct.includes('multipart/form-data')) return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
	const form = await req.formData()
	const file = form.get('file') as File | null
	if (!file) return new Response(JSON.stringify({ error: 'File missing' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
	if (!isImageMime(file.type)) return new Response(JSON.stringify({ error: 'Unsupported file type' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
	if (file.size > MAX_SIZE) return new Response(JSON.stringify({ error: 'File too large' }), { status: 413, headers: { 'Content-Type': 'application/json' } })
	const arrayBuf = await file.arrayBuffer()
	const buf = Buffer.from(arrayBuf)
	if (!await sniffMagicBytes(buf.slice(0, 16))) return new Response(JSON.stringify({ error: 'Invalid file' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
	const origName = (file as any).name || 'upload'
	if (hasDangerousExtension(origName)) return new Response(JSON.stringify({ error: 'Invalid filename' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
	const id = randomBytes(16).toString('hex')
	const uploadRoot = process.env.UPLOADS_DEST === 's3' ? null : path.join(process.cwd(), 'uploads')
	if (uploadRoot) await fs.mkdir(uploadRoot, { recursive: true })
	// Process with sharp: strip metadata, limit size, output webp/avif
	const image = sharp(buf, { failOn: 'none' }).rotate()
	const meta = await image.metadata()
	const width = Math.min(meta.width || MAX_DIM, MAX_DIM)
	const height = Math.min(meta.height || MAX_DIM, MAX_DIM)
	const baseName = `${id}`
	const variants = [] as { format: string; path: string; width: number; height: number }[]
	const webpPath = uploadRoot ? path.join(uploadRoot, `${baseName}.webp`) : ''
	await image.clone().resize(width, height, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(webpPath)
	variants.push({ format: 'webp', path: `/uploads/${baseName}.webp`, width, height })
	const avifPath = uploadRoot ? path.join(uploadRoot, `${baseName}.avif`) : ''
	await image.clone().resize(width, height, { fit: 'inside', withoutEnlargement: true }).avif({ quality: 50 }).toFile(avifPath)
	variants.push({ format: 'avif', path: `/uploads/${baseName}.avif`, width, height })
	return new Response(JSON.stringify({ ok: true, variants }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}