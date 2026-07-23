"use client";

import { useRouter } from "next/navigation";

import { useTransactions } from "@/features/transactions/hooks/use-transactions";
import type { Transaction } from "@/features/transactions/types/transaction";

export function TransactionTable() {

  const router = useRouter();

  const {
    data,
    isLoading,
  } = useTransactions();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Merchant
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {(data ?? []).length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="p-10 text-center text-slate-500"
              >
                No transactions found.
              </td>

            </tr>

          ) : (

            (data ?? []).map(
              (transaction: Transaction) => (

                <tr
                  key={transaction.id}
                  onClick={() =>
                    router.push(
                      `/dashboard/transactions/${transaction.id}`
                    )
                  }
                  className="cursor-pointer border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-mono text-sm">
                    {transaction.id.slice(0,10)}
                  </td>

                  <td className="p-4">
                    {transaction.merchantId ?? "-"}
                  </td>

                  <td className="p-4">
                    {transaction.amount} {transaction.currency}
                  </td>

                  <td className="p-4">
                    {transaction.status}
                  </td>

                  <td className="p-4">
                    {new Date(
                      transaction.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>
  );

}