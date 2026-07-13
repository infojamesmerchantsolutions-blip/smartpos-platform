import { z } from "zod";

export const createCustomerSchema = z.object({

  firstName: z
    .string()
    .min(2),

  lastName: z
    .string()
    .min(2),

  email: z
    .string()
    .email()
    .optional(),

  phone: z
    .string()
    .optional(),

  address: z
    .string()
    .optional()

});

export type CreateCustomerDto =
  z.infer<typeof createCustomerSchema>;
