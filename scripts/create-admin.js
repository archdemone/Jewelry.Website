#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

function randomPassword(len=16){ const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*'; let s=''; for(let i=0;i<len;i++) s+=chars[Math.floor(Math.random()*chars.length)]; return s; }

async function main() {
  console.log('Creating/updating admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@jewelry.com';
  const adminPassword = process.env.ADMIN_PASSWORD || randomPassword(18);
  const adminName = process.env.ADMIN_NAME || 'Admin User';
  if (process.env.NODE_ENV === 'production' && !process.argv.includes('--force')) {
    console.error('❌ Refusing to run in production without --force'); process.exit(1);
  }
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  try {
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { password: hashedPassword, role: 'ADMIN', name: adminName, emailVerified: new Date() },
      create: { email: adminEmail, name: adminName, password: hashedPassword, role: 'ADMIN', emailVerified: new Date() },
    });
    console.log('✅ Admin user created/updated successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('👤 Name:', adminName);
    console.log('🆔 User ID:', adminUser.id);
    console.log('\nℹ️ Set ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME env vars to control these values.');
  } catch (error) { console.error('❌ Error creating admin user:', error && error.message ? error.message : error); process.exit(1); }
  finally { await prisma.$disconnect(); }
}
main().catch(async (e) => { console.error(e); process.exit(1); });
