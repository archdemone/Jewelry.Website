const fs = require('fs');
const path = require('path');

const productionEnvContent = `# Database
DATABASE_URL="postgresql://user:password@host:5432/jewelry_prod?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/jewelry_prod?schema=public"

# Authentication
NEXTAUTH_URL="https://j&m-jewelry.co.uk"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-production-google-client-id"
GOOGLE_CLIENT_SECRET="your-production-google-client-secret"

# Stripe Production Keys
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email Service (SendGrid/Resend)
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@j&m-jewelry.co.uk"

# Cloud Storage (AWS S3/Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_FACEBOOK_PIXEL_ID="your-pixel-id"

# Monitoring
SENTRY_DSN="https://...@sentry.io/..."
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# Redis (for sessions/caching)
REDIS_URL="redis://localhost:6379"

# CDN
NEXT_PUBLIC_CDN_URL="https://cdn.j&m-jewelry.co.uk"

# Feature Flags
NEXT_PUBLIC_ENABLE_REVIEWS="true"
NEXT_PUBLIC_ENABLE_WISHLIST="true"
NEXT_PUBLIC_MAINTENANCE_MODE="false"

# Admin Setup
ADMIN_PASSWORD="ChangeMe123!"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://j&m-jewelry.co.uk"
NEXT_PUBLIC_SITE_NAME="Your Jewelry Store"
`;

const projectRoot = path.resolve(__dirname, '..');
const envProductionPath = path.join(projectRoot, '.env.production');

try {
  fs.writeFileSync(envProductionPath, productionEnvContent);
  console.log('✅ Created .env.production template file');
  console.log(
    '📝 Please update the values in .env.production with your actual production credentials',
  );
  console.log('🔒 Remember: .env.production is git-ignored for security');
} catch (error) {
  console.error('❌ Failed to create .env.production:', error.message);
  process.exit(1);
}
