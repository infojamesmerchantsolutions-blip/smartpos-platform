import { api } from "@/lib/api/client";

import type {
  Merchant,
  MerchantResponse,
} from "../types/merchant";

export async function getMerchants(
  page = 1,
  limit = 10,
): Promise<MerchantResponse> {

  const { data } =
    await api.get<MerchantResponse>(
      `/merchants?page=${page}&limit=${limit}`,
    );

  return data;

}

export interface MerchantDashboard {
  totalTransactions: number;
  totalRevenue: number;
  activeTerminals: number;
  walletBalance: number;
}

export async function getMerchantDashboard(
  merchantId: string,
): Promise<MerchantDashboard> {

  const { data } =
    await api.get<{
      success: boolean;
      data: MerchantDashboard;
    }>(
      `/merchants/${merchantId}/dashboard`,
    );

  return data.data;

}

export async function getMerchant(
  id: string,
): Promise<Merchant> {

  const { data } =
    await api.get<{
      success: boolean;
      data: Merchant;
    }>(`/merchants/${id}`);

  return data.data;

}