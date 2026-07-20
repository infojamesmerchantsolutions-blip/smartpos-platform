import { api } from "@/lib/api/client";

import type {
  TransactionResponse,
} from "../types/transaction";

export async function getTransactions(
  page = 1,
  limit = 10
): Promise<TransactionResponse["data"]> {

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  const response = await api.get<TransactionResponse>(
    `/transactions?page=${page}&limit=${limit}`
  );

  console.log("Full Response:", response.data);

  return response.data.data;
}