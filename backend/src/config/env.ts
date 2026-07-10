import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {

  nodeEnv: process.env.NODE_ENV || "development",

  host: process.env.HOST || "0.0.0.0",

  port: Number(process.env.PORT || 4000),

  appName: process.env.APP_NAME || "SmartPOS",

  appUrl: process.env.APP_URL || "http://localhost:4000",

  databaseUrl: required("DATABASE_URL"),

  jwtSecret: required("JWT_SECRET"),

  jwtRefreshSecret: required("JWT_REFRESH_SECRET"),

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

  jwtRefreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN || "30d",

  encryptionKey: required("ENCRYPTION_KEY"),

  redisHost: process.env.REDIS_HOST || "localhost",

  redisPort: Number(process.env.REDIS_PORT || 6379),

  redisPassword: process.env.REDIS_PASSWORD,

  logLevel: process.env.LOG_LEVEL || "info"

};
