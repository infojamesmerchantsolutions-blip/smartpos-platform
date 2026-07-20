"use client";

import { useQuery } from "@tanstack/react-query";

import { getPaymentIntents } from "@/services/payment.service";

export function usePaymentIntents() {

  return useQuery({

    queryKey: ["payment-intents"],

    queryFn: getPaymentIntents,

  });

}