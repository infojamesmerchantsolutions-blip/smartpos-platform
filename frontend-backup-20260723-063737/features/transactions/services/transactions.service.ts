import { api } from "@/lib/api/client";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;

  merchant?: {
    name: string;
  };

  terminal?: {
    serialNumber: string;
  };

  customer?: {
    firstName: string;
    lastName: string;
  };
}

export interface TransactionResponse {
  success: boolean;

  data: {
    items: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export async function getTransactions(
  page = 1,
  limit = 10
) {
  const { data } =
    await api.get<TransactionResponse>(
      `/transactions?page=${page}&limit=${limit}`
    );

  return data.data;
}