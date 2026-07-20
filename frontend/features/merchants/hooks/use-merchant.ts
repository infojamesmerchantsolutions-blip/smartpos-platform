"use client";

import { useQuery } from "@tanstack/react-query";

import { getMerchant } from "../services/merchant.service";

export function useMerchant(id: string) {
  return useQuery({
    queryKey: ["merchant", id],
    queryFn: () => getMerchant(id),
    enabled: !!id,
  });
}