import { z } from "zod";

export const createWalletSchema = z.object({

  walletName: z
    .string()
    .min(2)
    .max(100),

  walletAddress: z
    .string()
    .min(20),

  blockchain: z.string(),

  currency: z.string(),

  walletType: z.string()

});

export const transferSchema = z.object({

  walletId: z.string(),

  destinationAddress: z
    .string()
    .min(20),

  amount: z
    .number()
    .positive()

});

export type CreateWalletDto =
  z.infer<typeof createWalletSchema>;

export type WalletTransferDto =
  z.infer<typeof transferSchema>;
