"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  PaymentIntentListResponse,
  PaymentIntentResponse,
} from "@/types/payment";

async function getPaymentIntents(): Promise<PaymentIntentResponse[]> {
  const response =
    await api.get<PaymentIntentListResponse>(
      ENDPOINTS.paymentIntents.list
    );

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.data;
}

export function usePaymentIntents() {
  return useQuery({
    queryKey: ["payment-intents"],
    queryFn: getPaymentIntents,
  });
}
