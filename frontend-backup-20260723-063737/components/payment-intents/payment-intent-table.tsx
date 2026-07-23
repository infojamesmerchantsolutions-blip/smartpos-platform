"use client";

import { usePaymentIntents } from "@/features/payment-intents/hooks/use-payment-intents";

export function PaymentIntentTable() {

  const {
    data,
    isLoading,
  } = usePaymentIntents();

  if (isLoading) {

    return (
      <div className="rounded-xl border bg-white p-6">
        Loading payment intents...
      </div>
    );

  }

  const intents =
    data ?? [];

  return (

    <div className="overflow-hidden rounded-xl border bg-white">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">ID</th>

            <th className="p-4 text-left">Merchant</th>

            <th className="p-4 text-left">Amount</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Created</th>

          </tr>

        </thead>

        <tbody>

          {intents.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="p-10 text-center text-slate-500"
              >
                No Payment Intents Found.
              </td>

            </tr>

          ) : (

            intents.map((intent) => (

              <tr
                key={intent.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  {intent.id.slice(0, 12)}
                </td>

                <td className="p-4">
                  {intent.merchantId ?? "-"}
                </td>

                <td className="p-4">
                  {intent.amount} {intent.currency}
                </td>

                <td className="p-4">
                  {intent.status}
                </td>

                <td className="p-4">
                  {new Date(
                    intent.createdAt ?? new Date().toISOString()
                  ).toLocaleString()}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}