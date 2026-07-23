"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Merchant } from "./use-merchants";

export function useMerchant(id: string) {
  return useQuery({
    queryKey: ["merchant", id],

    queryFn: async (): Promise<Merchant> => {
      const response = await api.get<Merchant>(
        ENDPOINTS.merchants.detail(id)
      );

      return response.data;
    },

    enabled: Boolean(id),
  });
}
