import { z } from "zod";

export const loginSchema = z.object({

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8)

});

export const registerSchema = z.object({

  firstName: z
    .string()
    .min(2)
    .max(100),

  lastName: z
    .string()
    .min(2)
    .max(100),

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8)
    .max(100)

});

export const refreshTokenSchema = z.object({

  refreshToken: z.string()

});

export type LoginDto = z.infer<typeof loginSchema>;

export type RegisterDto = z.infer<typeof registerSchema>;
