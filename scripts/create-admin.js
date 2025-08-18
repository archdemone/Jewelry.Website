#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Creating/updating admin user...');

  // You can change these credentials
  const adminEmail = 'admin@jewelry.com';
  const adminPassword = 'boberpoper34'; // Change this to your desired password
  const adminName = 'Admin User';

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  try {
    // Create or update admin user
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        name: adminName,
        emailVerified: new Date(),
      },
      create: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Admin user created/updated successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('👤 Name:', adminName);
    console.log('🆔 User ID:', adminUser.id);
    console.log('\n🔗 You can now login at: http://localhost:3000/auth/login');
    console.log('🔗 Admin panel: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
