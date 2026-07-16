
import { Prisma } from "@prisma/client";

export interface CreateWalletBody {
  merchantId: string;
  name: string;
  currency: any;
  balance?: Prisma.Decimal;
  availableBalance?: Prisma.Decimal;
  reservedBalance?: Prisma.Decimal;
}