export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MERCHANT_ADMIN = 'MERCHANT_ADMIN',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER',
  AUDITOR = 'AUDITOR',
  SUPPORT = 'SUPPORT'
}

export const Roles = Object.values(UserRole);
