export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  reference?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  merchantId?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface TransactionListResponse {
  data: Transaction[];
  total?: number;
  page?: number;
  limit?: number;
}
