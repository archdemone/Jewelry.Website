// String-based enum constants for SQLite compatibility
// These replace the Prisma enums that aren't supported in SQLite

export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

export const PaymentStatus = {
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
} as const;

export type PaymentStatusType = typeof PaymentStatus[keyof typeof PaymentStatus];

export const AddressType = {
  SHIPPING: 'SHIPPING',
  BILLING: 'BILLING',
} as const;

export type AddressTypeType = typeof AddressType[keyof typeof AddressType];

// Helper functions to validate enum values
export function isValidUserRole(role: string): role is UserRoleType {
  return Object.values(UserRole).includes(role as UserRoleType);
}

export function isValidOrderStatus(status: string): status is OrderStatusType {
  return Object.values(OrderStatus).includes(status as OrderStatusType);
}

export function isValidPaymentStatus(status: string): status is PaymentStatusType {
  return Object.values(PaymentStatus).includes(status as PaymentStatusType);
}

export function isValidAddressType(type: string): type is AddressTypeType {
  return Object.values(AddressType).includes(type as AddressTypeType);
}
