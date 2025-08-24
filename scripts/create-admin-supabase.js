#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  console.log('🔧 Creating admin user in Supabase...');

  const adminEmail = 'admin@jewelry.com';
  const adminPassword = 'boberpoper34';
  const adminName = 'Admin User';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create or update admin user
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        name: adminName,
        emailVerified: new Date()
      },
      create: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      },
    });

    console.log('✅ Admin user created/updated successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('👤 Name:', adminName);
    console.log('🆔 User ID:', adminUser.id);
    console.log('🔐 Role:', adminUser.role);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
