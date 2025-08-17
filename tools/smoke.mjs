#!/usr/bin/env node
import http from 'node:http'

function request(url) {
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			let data = ''
			res.on('data', (c) => (data += c))
			res.on('end', () => resolve({ status: res.statusCode || 0, body: data }))
		}).on('error', reject)
	})
}

function env(key, fallback) {
	return process.env[key] || fallback
}

const base = `http://${env('HOST','127.0.0.1')}:${env('PORT','3000')}`

async function main() {
	const health = await request(`${base}/api/healthz`)
	if (health.status !== 200) { console.error('Healthz failed', health.status); process.exit(1) }
	const home = await request(`${base}/`)
	if (home.status !== 200 || !/Handcrafted|Rings|Jewelry/i.test(home.body)) {
		console.error('Homepage smoke failed', home.status)
		process.exit(1)
	}
	// anonymous /admin should 302 to login
	const admin = await request(`${base}/admin`)
	if (admin.status !== 302) {
		console.error('Admin anonymous redirect failed', admin.status)
		process.exit(1)
	}
	console.log('Smoke OK')
}

main().catch((e) => { console.error('Smoke error', e); process.exit(1) })