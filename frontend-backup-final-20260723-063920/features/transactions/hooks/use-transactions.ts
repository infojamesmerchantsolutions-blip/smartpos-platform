"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Transaction,
  TransactionListResponse,
} from "@/features/transactions/types/transaction";

async function getTransactions(): Promise<Transaction[]> {
  const response =
    await api.get<TransactionListResponse>(
      ENDPOINTS.transactions.list
    );

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.data;
}

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
}

export type { Transaction };
