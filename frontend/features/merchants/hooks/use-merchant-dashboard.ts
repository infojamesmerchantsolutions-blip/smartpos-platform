"use client";

import { useQuery } from "@tanstack/react-query";

import { getMerchantDashboard } from "../services/merchant.service";

export function useMerchantDashboard(
  merchantId: string,
) {
  return useQuery({

    queryKey: [
      "merchant-dashboard",
      merchantId,
    ],

    queryFn: () =>
      getMerchantDashboard(
        merchantId,
      ),

    enabled: !!merchantId,

  });
}