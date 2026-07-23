"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export interface MerchantDashboard {
  totalTransactions: number;
  totalRevenue: number;
  successfulPayments: number;
  failedPayments: number;
}

export function useMerchantDashboard(id: string) {
  return useQuery({
    queryKey: ["merchant", id, "dashboard"],

    queryFn: async (): Promise<MerchantDashboard> => {
      const response =
        await api.get<MerchantDashboard>(
          ENDPOINTS.merchants.dashboard(id)
        );

      return response.data;
    },

    enabled: Boolean(id),
  });
}
