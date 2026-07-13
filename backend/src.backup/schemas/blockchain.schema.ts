import { z } from "zod";

export const BlockchainTransactionSchema = z.object({

  blockchain:

    z.string(),

  walletId:

    z.string().optional(),

  fromAddress:

    z.string(),

  toAddress:

    z.string(),

  amount:

    z.coerce.number().positive(),

  currency:

    z.string(),

  fee:

    z.coerce.number().optional(),

  gasPrice:

    z.coerce.number().optional(),

  nonce:

    z.number().optional(),

  payload:

    z.record(z.any()).optional(),

  metadata:

    z.record(z.any()).optional()

});

export const WalletTransferSchema = z.object({

  merchantId:

    z.string(),

  fromWalletId:

    z.string(),

  toWalletId:

    z.string(),

  amount:

    z.coerce.number().positive(),

  currency:

    z.string(),

  fee:

    z.coerce.number().optional(),

  type:

    z.string(),

  blockchainTxId:

    z.string().optional(),

  cryptoConversionId:

    z.string().optional(),

  metadata:

    z.record(z.any()).optional()

});

export const BlockchainConfirmationSchema = z.object({

  txId:

    z.string(),

  confirmations:

    z.number().int().nonnegative(),

  blockHash:

    z.string().optional(),

  blockTime:

    z.coerce.date().optional(),

  metadata:

    z.record(z.any()).optional()

});

export type BlockchainTransactionInput =
  z.infer<typeof BlockchainTransactionSchema>;

export type WalletTransferInput =
  z.infer<typeof WalletTransferSchema>;

export type BlockchainConfirmationInput =
  z.infer<typeof BlockchainConfirmationSchema>;
