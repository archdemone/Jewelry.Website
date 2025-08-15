#!/usr/bin/env node
const https = require('https')
const http = require('http')

const run = () => {
	const url = process.env.HEALTHCHECK_URL || 'http://localhost:3000/api/health'
	const client = url.startsWith('https') ? https : http
	const req = client.get(url, (res) => {
		let body = ''
		res.on('data', (chunk) => (body += chunk))
		res.on('end', () => {
			try {
				const data = JSON.parse(body)
				if (res.statusCode === 200 && data.status === 'healthy') {
					console.log('OK')
					process.exit(0)
				} else {
					console.error('UNHEALTHY', data)
					process.exit(1)
				}
			} catch (e) {
				console.error('INVALID_RESPONSE', e.message)
				process.exit(1)
			}
		})
	})
	req.on('error', (err) => {
		console.error('REQUEST_ERROR', err.message)
		process.exit(1)
	})
}

if (require.main === module) run()

module.exports = { run }