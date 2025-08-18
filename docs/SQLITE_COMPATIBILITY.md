# SQLite Compatibility Changes

## Overview

This document explains the changes made to ensure Prisma schema compatibility with SQLite, which was causing CI failures.

## Problem

The original Prisma schema used:

- `Json` data types (not supported in SQLite)
- `enum` types (not supported in SQLite)

This caused the following error in CI:

```
Error: Prisma schema validation - (get-dmmf wasm)
Error code: P1012
error: Error validating field `images` in model `Product`: Field `images` in model `Product` can't be of type Json. The current connector does not support the Json type.
```

## Solution

### 1. Replaced Json Types with String

**Before:**

```prisma
model Product {
  images   Json
  metadata Json?
}

model Order {
  shippingAddress Json
  billingAddress  Json
  metadata        Json?
}
```

**After:**

```prisma
model Product {
  images   String       // JSON stored as text
  metadata String?      // JSON stored as text
}

model Order {
  shippingAddress String        // JSON stored as text
  billingAddress  String        // JSON stored as text
  metadata        String?       // JSON stored as text
}
```

### 2. Replaced Enums with String Fields

**Before:**

```prisma
enum Role {
  CUSTOMER
  ADMIN
  STAFF
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

model User {
  role Role @default(CUSTOMER)
}

model Order {
  status OrderStatus @default(PENDING)
}
```

**After:**

```prisma
model User {
  role String @default("CUSTOMER")
}

model Order {
  status String @default("PENDING")
}
```

## Type Safety

To maintain type safety, we created string-based enum constants:

### `src/types/enums.ts`

```typescript
export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
} as const;

export const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;

// Type-safe validation functions
export function isValidUserRole(role: string): role is UserRoleType {
  return Object.values(UserRole).includes(role as UserRoleType);
}
```

## JSON Handling

For fields that store JSON data as strings, we created helper functions:

### `src/lib/utils/json-helpers.ts`

```typescript
// Parse JSON string safely
export function parseJsonString<T = any>(jsonString: string | null | undefined): T | null {
  if (!jsonString) return null;

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Failed to parse JSON string:', error);
    return null;
  }
}

// Stringify object to JSON string
export function stringifyJson<T = any>(obj: T | null | undefined): string | null {
  if (obj === null || obj === undefined) return null;

  try {
    return JSON.stringify(obj);
  } catch (error) {
    console.warn('Failed to stringify object:', error);
    return null;
  }
}

// Specific helpers for common use cases
export function parseImages(jsonString: string | null | undefined): string[] {
  return parseJsonWithDefault<string[]>(jsonString, []);
}

export function stringifyImages(images: string[] | null | undefined): string | null {
  return stringifyJson(images);
}
```

## Migration

The database was migrated using:

```bash
npx prisma migrate dev --name fix-sqlite-compatibility
```

This created a new migration that:

1. Changed all `Json` fields to `String`
2. Changed all enum fields to `String`
3. Removed enum definitions
4. Updated default values to use string literals

## Usage Examples

### Working with Images

```typescript
import { parseImages, stringifyImages } from '@/lib/utils/json-helpers';

// When reading from database
const product = await prisma.product.findUnique({ where: { id } });
const images = parseImages(product.images); // string[] or []

// When saving to database
const imagesArray = ['/image1.jpg', '/image2.jpg'];
await prisma.product.update({
  where: { id },
  data: { images: stringifyImages(imagesArray) },
});
```

### Working with Enums

```typescript
import { UserRole, isValidUserRole } from '@/types/enums';

// Type-safe role assignment
const user = await prisma.user.create({
  data: {
    email: 'admin@example.com',
    role: UserRole.ADMIN, // Type-safe
  },
});

// Validation
if (isValidUserRole(someRole)) {
  // someRole is now typed as UserRoleType
}
```

## CI Configuration

Updated CI workflow to properly handle SQLite:

```yaml
- name: Generate Prisma Client
  run: npx prisma generate

- name: Run database migrations
  run: npx prisma migrate deploy
```

## Benefits

1. **CI Compatibility**: Works with SQLite in all environments
2. **Type Safety**: Maintained through string constants and validation functions
3. **Flexibility**: Can easily switch to PostgreSQL/MySQL later if needed
4. **Performance**: SQLite is fast for development and testing

## Future Considerations

If you need to switch to PostgreSQL or MySQL in production:

1. Update the datasource in `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql" // or "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Convert String fields back to Json/Enum types
3. Create a new migration
4. Update the enum constants to use actual Prisma enums

## Testing

To verify the changes work:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Run tests
npm test

# Check types
npm run type-check
```

All tests should pass with the new SQLite-compatible schema.
