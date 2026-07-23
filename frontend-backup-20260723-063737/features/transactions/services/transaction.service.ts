import { api } from "@/lib/api/client";

import type {
  Transaction,
  TransactionListResponse,
} from "../types/transaction";

export async function getTransactions(
  page = 1,
  limit = 10
): Promise<Transaction[]> {
  const { data } = await api.get<TransactionListResponse>(
    `/transactions?page=${page}&limit=${limit}`
  );

  return data.data;
}

export async function getTransaction(
  id: string
): Promise<Transaction> {
  const { data } = await api.get<{
    success: boolean;
    data: Transaction;
  }>(`/transactions/${id}`);

  return data.data;
}
