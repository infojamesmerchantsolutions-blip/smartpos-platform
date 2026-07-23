export interface PaymentIntentResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string | null;
  merchantId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentIntentListResponse {
  data: PaymentIntentResponse[];
  total?: number;
  page?: number;
  limit?: number;
}
