"use client";

import { useMerchantDashboard } from "@/features/merchants/hooks/use-merchant-dashboard";
import { useParams } from "next/navigation";
import {
  Building2,
  Mail,
  Phone,
  BadgeCheck,
} from "lucide-react";

import { useMerchant } from "@/features/merchants/hooks/use-merchant";

export default function MerchantDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: merchant,
    isLoading,
  } = useMerchant(id);

  const {
  data: dashboard,
} = useMerchantDashboard(id);

  if (isLoading) {
    return (
      <div className="p-8">
        Loading merchant...
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="p-8">
        Merchant not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="flex items-center gap-3 text-3xl font-bold">

          <Building2 className="text-blue-600" />

          {merchant.name}

        </h1>

        <p className="mt-2 text-slate-500">
          Merchant Overview
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-xl border bg-white p-6">

    <p className="text-sm text-slate-500">
      Revenue
    </p>

    <p className="mt-2 text-2xl font-bold">
      {dashboard?.totalRevenue ?? 0}
    </p>

  </div>

  <div className="rounded-xl border bg-white p-6">

    <p className="text-sm text-slate-500">
      Transactions
    </p>

    <p className="mt-2 text-2xl font-bold">
      {dashboard?.totalTransactions ?? 0}
    </p>

  </div>

  <div className="rounded-xl border bg-white p-6">

    <p className="text-sm text-slate-500">
      Active Terminals
    </p>

    <p className="mt-2 text-2xl font-bold">
      {dashboard?.activeTerminals ?? 0}
    </p>

  </div>

  <div className="rounded-xl border bg-white p-6">

    <p className="text-sm text-slate-500">
      Wallet Balance
    </p>

    <p className="mt-2 text-2xl font-bold">
      {dashboard?.walletBalance ?? 0}
    </p>

  </div>

</div>

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Merchant Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div>

            <p className="text-sm text-slate-500">
              Legal Name
            </p>

            <p>
              {merchant.legalName ?? "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Verified
            </p>

            <p>
              {merchant.isVerified ? "Yes" : "No"}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Created
            </p>

            <p>
              {new Date(
                merchant.createdAt
              ).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}