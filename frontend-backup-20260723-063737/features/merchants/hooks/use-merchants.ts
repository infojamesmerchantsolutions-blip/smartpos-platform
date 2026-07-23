"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export interface Merchant {
  id: string;
  name: string;
  email?: string | null;
  status?: string | null;
  currency?: string | null;
  isVerified?: boolean;
  createdAt?: string;
}

interface MerchantListResponse {
  success: boolean;
  data: {
    items: Merchant[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

async function getMerchants(): Promise<Merchant[]> {
  const response = await api.get<MerchantListResponse>(
    ENDPOINTS.merchants.list
  );

  return response.data.data.items;
}

export function useMerchants() {
  return useQuery({
    queryKey: ["merchants"],
    queryFn: getMerchants,
  });
}
