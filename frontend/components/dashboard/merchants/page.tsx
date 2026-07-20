"use client";

import { Building2 } from "lucide-react";

import { MerchantTable } from "@/components/merchants/merchant-table";

export default function MerchantsPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900">

            <Building2 className="h-8 w-8 text-blue-600" />

            Merchants

          </h1>

          <p className="mt-1 text-slate-500">
            Manage all registered merchants.
          </p>

        </div>

      </div>

      <MerchantTable />

    </div>
  );
}