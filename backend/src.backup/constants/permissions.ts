export enum Permission {
  MERCHANT_READ = 'merchant:read',
  MERCHANT_WRITE = 'merchant:write',

  USER_READ = 'user:read',
  USER_WRITE = 'user:write',

  TERMINAL_READ = 'terminal:read',
  TERMINAL_WRITE = 'terminal:write',

  TRANSACTION_READ = 'transaction:read',
  TRANSACTION_WRITE = 'transaction:write',

  WALLET_READ = 'wallet:read',
  WALLET_WRITE = 'wallet:write',

  SETTLEMENT_READ = 'settlement:read',
  SETTLEMENT_WRITE = 'settlement:write',

  KYC_READ = 'kyc:read',
  KYC_WRITE = 'kyc:write',

  APIKEY_READ = 'apikey:read',
  APIKEY_WRITE = 'apikey:write',

  WEBHOOK_READ = 'webhook:read',
  WEBHOOK_WRITE = 'webhook:write',

  AUDIT_READ = 'audit:read'
}

export const RolePermissions: Record<string, Permission[]> = {
  SUPER_ADMIN: Object.values(Permission),

  MERCHANT_ADMIN: [
    Permission.MERCHANT_READ,
    Permission.MERCHANT_WRITE,
    Permission.USER_READ,
    Permission.USER_WRITE,
    Permission.TERMINAL_READ,
    Permission.TERMINAL_WRITE,
    Permission.TRANSACTION_READ,
    Permission.TRANSACTION_WRITE,
    Permission.WALLET_READ,
    Permission.WALLET_WRITE,
    Permission.SETTLEMENT_READ,
    Permission.SETTLEMENT_WRITE,
    Permission.KYC_READ,
    Permission.KYC_WRITE,
    Permission.WEBHOOK_READ,
    Permission.WEBHOOK_WRITE
  ],

  MANAGER: [
    Permission.USER_READ,
    Permission.TERMINAL_READ,
    Permission.TRANSACTION_READ,
    Permission.WALLET_READ,
    Permission.SETTLEMENT_READ,
    Permission.KYC_READ
  ],

  CASHIER: [
    Permission.TRANSACTION_READ,
    Permission.TRANSACTION_WRITE
  ],

  AUDITOR: [
    Permission.AUDIT_READ,
    Permission.TRANSACTION_READ,
    Permission.SETTLEMENT_READ
  ],

  SUPPORT: [
    Permission.MERCHANT_READ,
    Permission.USER_READ,
    Permission.TRANSACTION_READ
  ]
}
