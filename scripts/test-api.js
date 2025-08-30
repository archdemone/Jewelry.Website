#!/usr/bin/env node

const fetch = require('node-fetch');

async function testAPI() {
  const baseUrl = process.env.TEST_URL || 'http://localhost:3000';

  console.log('🔍 Testing API endpoints...\n');

  // Test 1: Check if the API route exists
  try {
    console.log('1. Testing GET /api/products...');
    const response = await fetch(`${baseUrl}/api/products`);
    console.log(`   Status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`   Products found: ${data.products?.length || 0}`);
    } else {
      console.log(`   Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  // Test 2: Check categories
  try {
    console.log('\n2. Testing GET /api/categories...');
    const response = await fetch(`${baseUrl}/api/categories`);
    console.log(`   Status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`   Categories found: ${data.categories?.length || 0}`);
      if (data.categories?.length > 0) {
        console.log(`   First category: ${data.categories[0].slug}`);
      }
    } else {
      console.log(`   Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  // Test 3: Try to create a product
  try {
    console.log('\n3. Testing POST /api/products...');
    const testProduct = {
      name: 'Test Product',
      category: 'womens-rings',
      price: 299,
      material: 'Silver',
      gemColor: 'Red',
      status: 'draft'
    };

    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testProduct)
    });

    console.log(`   Status: ${response.status}`);
    const responseText = await response.text();
    console.log(`   Response: ${responseText}`);

    if (response.ok) {
      console.log('   ✅ Product creation successful!');
    } else {
      console.log('   ❌ Product creation failed');
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  // Test 4: Check health endpoint
  try {
    console.log('\n4. Testing GET /api/healthz...');
    const response = await fetch(`${baseUrl}/api/healthz`);
    console.log(`   Status: ${response.status}`);
    if (response.ok) {
      const data = await response.text();
      console.log(`   Response: ${data}`);
    } else {
      console.log(`   Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
}

// Run the test
testAPI().catch(console.error);
