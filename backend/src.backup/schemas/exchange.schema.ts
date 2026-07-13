import { z } from "zod";

export const ExchangeRateSchema = z.object({

  fromCurrency:

    z.string(),

  toCurrency:

    z.string(),

  rate:

    z.coerce.number().positive(),

  source:

    z.string(),

  expiresAt:

    z.coerce.date().optional(),

  metadata:

    z.record(z.any()).optional()

});

export const QuoteSchema = z.object({

  fromCurrency:

    z.string(),

  toCurrency:

    z.string(),

  amount:

    z.coerce.number().positive()

});

export type ExchangeRateInput =
  z.infer<typeof ExchangeRateSchema>;

export type QuoteInput =
  z.infer<typeof QuoteSchema>;
