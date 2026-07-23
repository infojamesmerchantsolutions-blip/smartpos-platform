"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export interface DashboardMetrics {
  totalMerchants: number;
  totalTransactions: number;
  totalRevenue: number;
  pendingPayments: number;
}

async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await api.get<DashboardMetrics>(
    ENDPOINTS.dashboard.metrics
  );

  return response.data;
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: getDashboardMetrics,
  });
}
