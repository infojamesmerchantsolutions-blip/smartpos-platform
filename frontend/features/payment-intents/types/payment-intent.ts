export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
  description?: string;
  createdAt: string;

  merchant?: {
    name: string;
  };

  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
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