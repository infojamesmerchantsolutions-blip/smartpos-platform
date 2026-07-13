import dotenv from "dotenv";
dotenv.config();
function required(
  key: string
): string {
  const value =
    process.env[key];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${key}`
    );
  }
  return value;
}
export const env = {
  NODE_ENV:
    process.env.NODE_ENV ||
    "development",
  PORT:
    Number(
      process.env.PORT ||
      3000
    ),
  HOST:
    process.env.HOST ||
    "0.0.0.0",
  DATABASE_URL:
    required(
      "DATABASE_URL"
    ),
  JWT_SECRET:
    required(
      "JWT_SECRET"
    ),
  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN ||
    "7d",
  REDIS_URL:
    process.env.REDIS_URL ||
    "",
  STRIPE_SECRET_KEY:
    process.env.STRIPE_SECRET_KEY ||
    "",
  PAYSTACK_SECRET_KEY:
    process.env.PAYSTACK_SECRET_KEY ||
    "",
  FLUTTERWAVE_SECRET_KEY:
    process.env.FLUTTERWAVE_SECRET_KEY ||
    "",
  COINBASE_API_KEY:
    process.env.COINBASE_API_KEY ||
    "",
  BINANCE_API_KEY:
    process.env.BINANCE_API_KEY ||
    "",
  SMTP_HOST:
    process.env.SMTP_HOST || "",
  SMTP_PORT:
    Number(
      process.env.SMTP_PORT || 587
    ),
  SMTP_SECURE:
    process.env.SMTP_SECURE || "false",
  SMTP_USER:
    process.env.SMTP_USER || "",
  SMTP_PASSWORD:
    process.env.SMTP_PASSWORD || "",
  SMTP_FROM:
    process.env.SMTP_FROM || "",
  AWS_REGION:
    process.env.AWS_REGION || "",
  AWS_ACCESS_KEY:
    process.env.AWS_ACCESS_KEY || "",
  AWS_SECRET_KEY:
    process.env.AWS_SECRET_KEY || "",
  S3_BUCKET:
    process.env.S3_BUCKET || ""
};
export default env;