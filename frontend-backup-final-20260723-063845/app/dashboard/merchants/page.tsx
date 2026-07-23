"use client";

import { MerchantTable } from "@/components/merchants/merchant-table";

export default function MerchantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Merchants
        </h1>

        <p className="mt-2 text-slate-500">
          Manage and monitor registered merchants.
        </p>
      </div>

      <MerchantTable />
    </div>
  );
}
