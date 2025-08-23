#!/usr/bin/env node
let sharp;
try { sharp = require('sharp'); }
catch { console.error('❌ The "sharp" package is not installed. Install with: npm i -D sharp'); process.exit(1); }
const fs = require('fs').promises;
const path = require('path');

async function convertToWebP(inputPath, outputPath, quality = 80) {
  try { await sharp(inputPath).webp({ quality }).toFile(outputPath);
    console.log(`✅ Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) { console.error(`❌ Error converting ${inputPath}:`, error.message); }
}
async function processDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) await processDirectory(filePath);
      else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await convertToWebP(filePath, outputPath);
      }
    }
  } catch (error) { console.error(`❌ Error processing directory ${dirPath}:`, error.message); }
}
async function main() {
  console.log('🖼️  Converting images to WebP format...');
  const dirs = process.argv.slice(2);
  const directories = dirs.length ? dirs : ['public/images/home','public/images/products'];
  for (const dir of directories) {
    try { await fs.access(dir); console.log(`\n📁 Processing: ${dir}`); await processDirectory(dir); }
    catch { console.log(`⚠️  Directory not found: ${dir}`); }
  }
  console.log('\n🎉 Image conversion complete!');
}
main().catch(console.error);
