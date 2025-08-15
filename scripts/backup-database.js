#!/usr/bin/env node
// Usage: node scripts/backup-database.js
// Requires pg_dump in PATH and DATABASE_URL set to a PostgreSQL connection string.
// Consider running from cron or a scheduler. Keeps 7 days of local backups.
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const backupsDir = path.join(__dirname, '../backups')

const backupDatabase = () => {
	const date = new Date().toISOString().split('T')[0]
	const backupFile = `backup-${date}.sql`
	const backupPath = path.join(backupsDir, backupFile)

	// Ensure backup directory exists
	if (!fs.existsSync(backupsDir)) {
		fs.mkdirSync(backupsDir)
	}

	if (!process.env.DATABASE_URL) {
		console.error('DATABASE_URL is not set. Aborting backup.')
		process.exit(1)
	}
	const command = `pg_dump ${process.env.DATABASE_URL} > ${backupPath}`

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Backup failed: ${error}`)
			return
		}
		console.log(`Database backed up to ${backupFile}`)

		// Upload to S3 or cloud storage
		uploadToCloud(backupPath)

		// Keep only last 7 days of local backups
		cleanOldBackups()
	})
}

const uploadToCloud = (filePath) => {
	// Implement S3 upload
	console.log('Uploading to cloud storage...')
}

const cleanOldBackups = () => {
	// Remove backups older than 7 days
	const now = Date.now()
	const sevenDays = 7 * 24 * 60 * 60 * 1000
	if (!fs.existsSync(backupsDir)) return
	for (const file of fs.readdirSync(backupsDir)) {
		const filePath = path.join(backupsDir, file)
		try {
			const stat = fs.statSync(filePath)
			if (now - stat.mtimeMs > sevenDays) {
				fs.unlinkSync(filePath)
				console.log('Deleted old backup:', file)
			}
		} catch {}
	}
}

// Run backup once if executed directly
if (require.main === module) {
	backupDatabase()
	// Schedule for 24h interval
	setInterval(backupDatabase, 24 * 60 * 60 * 1000)
}

module.exports = { backupDatabase }