export interface PaymentIntent {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
  description?: string;
  createdAt: string;
}

export interface PaymentIntentResponse {
  success: boolean;

  data: {
    items: PaymentIntent[];

    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}