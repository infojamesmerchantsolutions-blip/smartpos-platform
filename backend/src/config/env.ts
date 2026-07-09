import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),

  LOG_LEVEL: z.enum([
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
    'silent'
  ]).default('info'),

  BLOCKCHAIN_NETWORK: z.string(),
  RPC_URL: z.string().optional(),
  PRIVATE_KEY: z.string().optional(),
  TREASURY_WALLET: z.string().optional(),

  EXCHANGE_RATE_PROVIDER: z.string().optional(),

  KYC_PROVIDER: z.string().optional(),

  WEBHOOK_SECRET: z.string().optional()
});

export const env = envSchema.parse(process.env);
