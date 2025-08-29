# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for image uploads, eliminating the need to redeploy your application when adding new product images.

## Prerequisites

1. **Supabase Project**: You already have Supabase configured for your database
2. **Environment Variables**: Make sure you have these in your `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Setup Steps

### 1. Run the Setup Script

```bash
npm run supabase:setup-storage
```

This script will:
- Create a `product-images` storage bucket
- Set up storage policies for upload, read, and delete operations
- Configure the bucket to be public (so images can be accessed via URLs)

### 2. Deploy Your Application

After running the setup script, deploy your application:

```bash
git add .
git commit -m "Add Supabase Storage for image uploads"
git push
```

Your hosting platform (Vercel) will automatically deploy the changes.

### 3. Test the Setup

1. Go to your admin panel
2. Navigate to "Add New Product" or edit an existing product
3. You should see the new image upload interface with:
   - Drag & drop upload area
   - "Browse Uploaded Images" button
   - Gallery of previously uploaded images

## How It Works

### Before (Static Files)
- Images stored in `public/images/products/`
- Required redeployment to add new images
- Limited to local file system

### After (Supabase Storage)
- Images stored in Supabase Storage
- **No redeployment needed** for new images
- Cloud-based with automatic CDN
- Accessible from anywhere

## Features

### Upload Images
- Drag & drop or click to browse
- Supports PNG, JPG, WebP, GIF
- Up to 50MB per file
- Automatic unique filename generation

### Browse Gallery
- View all previously uploaded images
- Search by filename
- Grid and list view modes
- Copy image URLs
- Delete unused images

### Product Integration
- Select images from gallery for products
- Multiple images per product
- Automatic URL generation
- No file system dependencies

## File Structure

```
src/
├── lib/
│   └── supabase-storage.ts          # Storage utility functions
├── app/
│   └── api/admin/storage/
│       ├── upload/route.ts          # Upload API endpoint
│       └── files/route.ts           # List/delete files API
└── components/admin/
    └── SupabaseImageUpload.tsx      # Enhanced upload component
```

## API Endpoints

### Upload Images
```
POST /api/admin/storage/upload
```
- Requires admin authentication
- Accepts multiple files
- Returns uploaded file information

### List Files
```
GET /api/admin/storage/files
```
- Requires admin authentication
- Returns list of uploaded files with URLs

### Delete File
```
DELETE /api/admin/storage/files
```
- Requires admin authentication
- Deletes file from storage

## Storage Bucket Configuration

- **Bucket Name**: `product-images`
- **Public Access**: Enabled (for image URLs)
- **File Size Limit**: 50MB
- **Allowed Types**: image/jpeg, image/png, image/webp, image/gif
- **Folder Structure**: `products/filename.ext`

## Security

- Admin-only access to upload/delete operations
- Public read access for image URLs
- File type validation
- Size limits enforced
- Unique filename generation prevents conflicts

## Migration from Static Files

If you want to migrate existing product images:

1. Upload existing images through the new interface
2. Update product records in the database with new Supabase URLs
3. Remove old static files (optional)

## Troubleshooting

### Setup Issues
- **Missing environment variables**: Check your `.env.local` file
- **Bucket creation fails**: Verify your service role key has admin permissions
- **Storage not enabled**: Enable Storage in your Supabase project dashboard

### Upload Issues
- **File too large**: Check file size (max 50MB)
- **Invalid file type**: Only image files are allowed
- **Authentication error**: Make sure you're logged in as admin

### Performance
- **Slow uploads**: Check your internet connection
- **Large files**: Consider image optimization before upload
- **Many files**: The gallery loads 100 files at a time

## Benefits

✅ **No Redeployment Required**: Add images without code changes
✅ **Cloud Storage**: Images stored in Supabase with CDN
✅ **Admin Interface**: Easy-to-use upload and management
✅ **Scalable**: Handles large files and many images
✅ **Secure**: Admin-only upload/delete operations
✅ **Cost Effective**: Supabase Storage is very affordable

## Next Steps

1. Test the upload functionality
2. Upload some sample images
3. Create/edit products using the new system
4. Monitor storage usage in Supabase dashboard

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Supabase project is active
3. Check environment variables
4. Review Supabase Storage documentation