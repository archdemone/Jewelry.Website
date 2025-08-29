const { createClient } = require('@supabase/supabase-js')

async function setupSupabaseStorage() {
  console.log('🚀 Setting up Supabase Storage...')

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables:')
    console.error('   - NEXT_PUBLIC_SUPABASE_URL')
    console.error('   - SUPABASE_SERVICE_ROLE_KEY')
    console.error('\nPlease add these to your .env.local file')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Create product-images bucket
    console.log('📦 Creating product-images bucket...')
    const { error: bucketError } = await supabase.storage.createBucket('product-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 52428800 // 50MB
    })

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ product-images bucket already exists')
      } else {
        throw bucketError
      }
    } else {
      console.log('✅ product-images bucket created successfully')
    }

    // Set up storage policies
    console.log('🔐 Setting up storage policies...')
    
    // Policy to allow authenticated users to upload images
    const { error: uploadPolicyError } = await supabase.storage
      .from('product-images')
      .createPolicy('Allow authenticated uploads', {
        name: 'Allow authenticated uploads',
        definition: {
          role: 'authenticated',
          operation: 'INSERT',
          resource: 'product-images'
        }
      })

    if (uploadPolicyError) {
      if (uploadPolicyError.message.includes('already exists')) {
        console.log('✅ Upload policy already exists')
      } else {
        console.log('⚠️  Upload policy error (may already exist):', uploadPolicyError.message)
      }
    } else {
      console.log('✅ Upload policy created')
    }

    // Policy to allow public read access
    const { error: readPolicyError } = await supabase.storage
      .from('product-images')
      .createPolicy('Allow public read access', {
        name: 'Allow public read access',
        definition: {
          role: 'anon',
          operation: 'SELECT',
          resource: 'product-images'
        }
      })

    if (readPolicyError) {
      if (readPolicyError.message.includes('already exists')) {
        console.log('✅ Read policy already exists')
      } else {
        console.log('⚠️  Read policy error (may already exist):', readPolicyError.message)
      }
    } else {
      console.log('✅ Read policy created')
    }

    // Policy to allow authenticated users to delete their uploads
    const { error: deletePolicyError } = await supabase.storage
      .from('product-images')
      .createPolicy('Allow authenticated deletes', {
        name: 'Allow authenticated deletes',
        definition: {
          role: 'authenticated',
          operation: 'DELETE',
          resource: 'product-images'
        }
      })

    if (deletePolicyError) {
      if (deletePolicyError.message.includes('already exists')) {
        console.log('✅ Delete policy already exists')
      } else {
        console.log('⚠️  Delete policy error (may already exist):', deletePolicyError.message)
      }
    } else {
      console.log('✅ Delete policy created')
    }

    console.log('\n🎉 Supabase Storage setup completed!')
    console.log('\nNext steps:')
    console.log('1. Deploy your application')
    console.log('2. Test the image upload functionality in your admin panel')
    console.log('3. Images will be stored in Supabase and accessible via URLs')

  } catch (error) {
    console.error('❌ Error setting up Supabase Storage:', error.message)
    console.error('\nTroubleshooting:')
    console.error('1. Make sure your Supabase project is active')
    console.error('2. Verify your service role key has admin permissions')
    console.error('3. Check that Storage is enabled in your Supabase project')
  }
}

// Run the setup
setupSupabaseStorage()