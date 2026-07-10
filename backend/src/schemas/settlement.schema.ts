import { z } from "zod";

export const SettlementSchema = z.object({

  merchantId:

    z.string(),

  walletId:

    z.string(),

  bankAccountId:

    z.string().optional(),

  batchId:

    z.string().optional(),

  amount:

    z.coerce.number().positive(),

  currency:

    z.string(),

  fee:

    z.coerce.number().optional(),

  metadata:

    z.record(z.any()).optional()

});

export const SettlementBatchSchema = z.object({

  merchantId:

    z.string(),

  totalAmount:

    z.coerce.number().positive(),

  currency:

    z.string(),

  totalFees:

    z.coerce.number(),

  totalNet:

    z.coerce.number(),

  transactionCount:

    z.number().int().nonnegative(),

  metadata:

    z.record(z.any()).optional()

});

export type SettlementInput =
  z.infer<typeof SettlementSchema>;

export type SettlementBatchInput =
  z.infer<typeof SettlementBatchSchema>;
