import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

import type {
  PaymentIntentListResponse,
} from "@/types/payment";

export async function getPaymentIntents() {
  const response =
    await api.get<PaymentIntentListResponse>(
      ENDPOINTS.paymentIntents.list
    );

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.data;
}
