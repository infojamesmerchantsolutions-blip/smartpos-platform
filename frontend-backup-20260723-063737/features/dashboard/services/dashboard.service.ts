import { api } from "@/lib/api/client";

export interface DashboardMetrics {
  totalMerchants: number;
  activeTerminals: number;
  transactionsToday: number;
  revenue: number;
}

export async function getDashboardMetrics() {
  const { data } = await api.get<{
    success: boolean;
    data: DashboardMetrics;
  }>("/metrics");

  return data.data;
}