import { api } from "@/lib/api/client";

import type {
  PaymentIntentResponse,
} from "../types/payment-intent";

export async function getPaymentIntents(
  page = 1,
  limit = 10
): Promise<PaymentIntentResponse> {

  const { data } =
    await api.get<PaymentIntentResponse>(
      `/payment-intents?page=${page}&limit=${limit}`
    );

  return data;
}