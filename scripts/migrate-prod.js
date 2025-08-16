#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
	console.log('Starting production database migration...')
	try {
		const provider = process.env.DATABASE_URL?.startsWith('postgres') ? 'postgresql' : 'unknown'
		if (provider !== 'postgresql') {
			console.warn('Warning: DATABASE_URL does not appear to be PostgreSQL. This script requires Postgres features.')
		}
		// Enable extensions
		await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

		// Create indexes for performance
		await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_products_slug ON "Product"(slug)`
		await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_products_category ON "Product"("categoryId")`
		await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_orders_user ON "Order"("userId")`
		await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_orders_status ON "Order"(status)`
		await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_products_featured ON "Product"(featured)`

		// Full-text search vector and index
		await prisma.$executeRaw`
			ALTER TABLE "Product"
			ADD COLUMN IF NOT EXISTS search_vector tsvector
			GENERATED ALWAYS AS (
				to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
			) STORED
		`
		await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS idx_products_search ON "Product" USING GIN(search_vector)`

		console.log('Migration completed successfully')
		process.exit(0)
	} catch (error) {
		console.error('Migration failed:', error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

// NOTE: Ensure DATABASE_URL points to PostgreSQL in production; schema.prisma dev uses SQLite.
// Run with: NODE_ENV=production node scripts/migrate-prod.js
main()