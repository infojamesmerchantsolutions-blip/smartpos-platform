import { z } from "zod";

export const registerTerminalSchema = z.object({

  terminalIdentifier: z
    .string()
    .min(3)
    .max(100),

  terminalName: z
    .string()
    .min(2)
    .max(100),

  serialNumber: z
    .string()
    .min(5),

  manufacturer: z
    .string()
    .optional(),

  model: z
    .string()
    .optional(),

  firmwareVersion: z
    .string()
    .optional(),

  operatingSystem: z
    .string()
    .optional(),

  location: z
    .string()
    .optional()

});

export type RegisterTerminalDto =
  z.infer<typeof registerTerminalSchema>;
