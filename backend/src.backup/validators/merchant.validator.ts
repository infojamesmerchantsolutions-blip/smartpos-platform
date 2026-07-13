import { z } from "zod";

export const createMerchantSchema = z.object({

  businessName: z.string().min(2),

  legalBusinessName: z.string().optional(),

  email: z.string().email(),

  phone: z.string().optional(),

  website: z.string().url().optional(),

  country: z.string(),

  state: z.string().optional(),

  city: z.string().optional(),

  address: z.string().optional(),

  postalCode: z.string().optional()

});

export type CreateMerchantDto =
  z.infer<typeof createMerchantSchema>;
