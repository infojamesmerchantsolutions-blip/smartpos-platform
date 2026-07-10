import { z } from "zod";

export const StartTransactionSchema = z.object({

  merchantId:

    z.string(),

  terminalId:

    z.string().optional(),

  customerId:

    z.string().optional(),

  walletId:

    z.string().optional(),

  paymentMethodId:

    z.string().optional(),

  amount:

    z.coerce.number().positive(),

  currency:

    z.string(),

  paymentMethod:

    z.string(),

  type:

    z.string(),

  description:

    z.string().optional(),

  metadata:

    z.record(z.any()).optional()

});

export const ExecuteTransactionSchema = z.object({

  transactionId:

    z.string(),

  providerId:

    z.string(),

  endpoint:

    z.string().url(),

  method:

    z.enum([

      "GET",

      "POST",

      "PUT",

      "PATCH",

      "DELETE"

    ]),

  requestBody:

    z.record(z.any()),

  requestHeaders:

    z.record(z.any()),

  fromCurrency:

    z.string(),

  toCurrency:

    z.string()

});

export const SettlementTransactionSchema = z.object({

  transactionId:

    z.string(),

  blockchain:

    z.string(),

  merchantWalletId:

    z.string(),

  destinationWalletId:

    z.string(),

  fromAddress:

    z.string(),

  toAddress:

    z.string(),

  currency:

    z.string()

});

export type StartTransactionInput =
  z.infer<typeof StartTransactionSchema>;

export type ExecuteTransactionInput =
  z.infer<typeof ExecuteTransactionSchema>;

export type SettlementTransactionInput =
  z.infer<typeof SettlementTransactionSchema>;
