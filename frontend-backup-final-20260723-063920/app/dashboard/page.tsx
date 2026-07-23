"use client";

import {
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { TransactionsTable } from "@/components/dashboard/transactions-table";

import { useDashboardMetrics } from "@/features/dashboard/hooks/use-dashboard-metrics";

export default function DashboardPage() {

  const {
    data,
    isLoading,
  } = useDashboardMetrics();

  return (

    <main className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <section className="flex-1 min-w-0">

        <Topbar />

        <div className="p-8">

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Monitor today's platform activity.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <StatCard
              title="Revenue Today"
              value={
                isLoading
                  ? "..."
                  : `$${Number(
                      data?.totalRevenue ?? 0
                    ).toLocaleString()}`
              }
              icon={<DollarSign size={28} />}
            />

            <StatCard
              title="Transactions Today"
              value={
                isLoading
                  ? "..."
                  : Number(
                      data?.totalTransactions ?? 0
                    ).toLocaleString()
              }
              icon={<CreditCard size={28} />}
            />

            <StatCard
              title="Merchants"
              value={
                isLoading
                  ? "..."
                  : Number(
                      data?.totalMerchants ?? 0
                    ).toLocaleString()
              }
              icon={<Users size={28} />}
            />

          </div>

          <TransactionsTable />

        </div>

      </section>

    </main>

  );

}