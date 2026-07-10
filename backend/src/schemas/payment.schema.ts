import { z } from "zod";

export const CreatePaymentIntentSchema = z.object({

  merchantId:

    z.string().min(1),

  customerId:

    z.string().optional(),

  paymentMethodId:

    z.string().optional(),

  amount:

    z.coerce.number().positive(),

  currency:

    z.string().min(3).max(10),

  description:

    z.string().optional(),

  metadata:

    z.record(z.any()).optional()

});

export const CreatePaymentAttemptSchema = z.object({

  paymentIntentId:

    z.string(),

  transactionId:

    z.string().optional(),

  amount:

    z.coerce.number().positive(),

  currency:

    z.string()

});

export type CreatePaymentIntentInput =
  z.infer<typeof CreatePaymentIntentSchema>;

export type CreatePaymentAttemptInput =
  z.infer<typeof CreatePaymentAttemptSchema>;
