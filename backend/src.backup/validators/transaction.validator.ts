import { z } from "zod";

export const createTransactionSchema = z.object({

  merchantId: z.string(),

  terminalId: z.string(),

  fiatAmount: z
    .number()
    .positive(),

  fiatCurrency: z.string(),

  cryptoCurrency: z.string(),

  blockchainNetwork: z.string(),

  paymentMethod: z.string(),

  customerEmail: z
    .string()
    .email()
    .optional(),

  customerPhone: z
    .string()
    .optional(),

  customerName: z
    .string()
    .optional()

});

export type CreateTransactionDto =
  z.infer<typeof createTransactionSchema>;
