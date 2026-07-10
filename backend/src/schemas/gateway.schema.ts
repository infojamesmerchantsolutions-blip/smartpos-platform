import { z } from "zod";

export const GatewayRequestSchema = z.object({

  providerId:

    z.string(),

  transactionId:

    z.string().optional(),

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

    z.record(z.any())

});

export const GatewayResponseSchema = z.object({

  gatewayRequestId:

    z.string(),

  statusCode:

    z.number().int(),

  responseBody:

    z.record(z.any()),

  responseHeaders:

    z.record(z.any()),

  error:

    z.string().optional(),

  responseTime:

    z.number().optional()

});

export type GatewayRequestInput =
  z.infer<typeof GatewayRequestSchema>;

export type GatewayResponseInput =
  z.infer<typeof GatewayResponseSchema>;
