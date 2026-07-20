"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/services/transaction.service";

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
}