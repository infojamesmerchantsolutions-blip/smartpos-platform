import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

import type { Transaction } from "@/features/transactions/types/transaction";

export async function getTransaction(
  id: string
): Promise<Transaction> {
  const response = await api.get<Transaction>(
    ENDPOINTS.transactions.detail(id)
  );

  return response.data;
}
