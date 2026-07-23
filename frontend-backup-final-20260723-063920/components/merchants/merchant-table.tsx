"use client";

import Link from "next/link";

import { useMerchants } from "@/features/merchants/hooks/use-merchants";

export function MerchantTable() {
  const { data, isLoading } = useMerchants();

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-6">
        Loading merchants...
      </div>
    );
  }

  const merchants = data ?? [];

  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <table className="w-full">

        <thead className="border-b bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Merchant
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Currency
            </th>

            <th className="px-6 py-4 text-left">
              Verified
            </th>

            <th className="px-6 py-4 text-left">
              Created
            </th>

          </tr>

        </thead>

        <tbody>

          {merchants.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="px-6 py-10 text-center text-slate-500"
              >
                No merchants found.
              </td>

            </tr>

          ) : (

            merchants.map((merchant) => (

              <tr
                key={merchant.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">

                  <Link
                    href={`/dashboard/merchants/${merchant.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {merchant.name}
                  </Link>

                </td>

                <td className="px-6 py-4">
                  {merchant.email}
                </td>

                <td className="px-6 py-4">
                  {merchant.status}
                </td>

                <td className="px-6 py-4">
                  {"NGN"}
                </td>

                <td className="px-6 py-4">
                  {"-"}
                </td>

                <td className="px-6 py-4">
                  {merchant.createdAt
                    ? new Date(merchant.createdAt).toLocaleDateString()
                    : "-"}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}