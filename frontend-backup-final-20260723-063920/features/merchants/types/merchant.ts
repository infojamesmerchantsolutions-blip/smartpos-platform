export interface Merchant {
  id: string;
  name: string;
  legalName?: string | null;
  email: string;
  phone?: string | null;
  status: string;
  currency: string;
  isVerified: boolean;
  createdAt: string;
}

export interface MerchantResponse {
  success: boolean;

  data: {
    items: Merchant[];

    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}