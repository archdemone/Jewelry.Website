#!/usr/bin/env node

const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  console.log('🔧 Creating admin user in Supabase using SQL...');

  const adminEmail = 'admin@jewelry.com';
  const adminPassword = 'boberpoper34';
  const adminName = 'Admin User';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create PostgreSQL client
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT id, email FROM "User" WHERE email = $1',
      [adminEmail]
    );

    if (existingUser.rows.length > 0) {
      // Update existing user
      await client.query(
        `UPDATE "User"
         SET password = $1, role = $2, name = $3, "emailVerified" = $4, "updatedAt" = $5
         WHERE email = $6`,
        [hashedPassword, 'ADMIN', adminName, new Date(), new Date(), adminEmail]
      );
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create new user
      const result = await client.query(
        `INSERT INTO "User" (id, email, name, password, role, "emailVerified", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [
          `admin_${Date.now()}`, // Generate a unique ID
          adminEmail,
          adminName,
          hashedPassword,
          'ADMIN',
          new Date(),
          new Date(),
          new Date()
        ]
      );
      console.log('✅ Admin user created successfully!');
      console.log('🆔 User ID:', result.rows[0].id);
    }

    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('👤 Name:', adminName);
    console.log('🔐 Role: ADMIN');

    await client.end();

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
