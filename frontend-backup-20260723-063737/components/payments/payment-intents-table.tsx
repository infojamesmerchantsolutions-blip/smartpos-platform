"use client";

import { usePaymentIntents } from "@/hooks/use-payment-intents";

export function PaymentIntentsTable() {

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

        <thead className="bg-slate-50">

          <tr>

            <th className="px-5 py-3 text-left">
              ID
            </th>

            <th className="px-5 py-3 text-left">
              Amount
            </th>

            <th className="px-5 py-3 text-left">
              Currency
            </th>

            <th className="px-5 py-3 text-left">
              Status
            </th>

            <th className="px-5 py-3 text-left">
              Created
            </th>

          </tr>

        </thead>

        <tbody>

          {intents.map((intent) => (

            <tr
              key={intent.id}
              className="border-t"
            >

              <td className="px-5 py-4">

                {intent.id}

              </td>

              <td className="px-5 py-4">

                {intent.amount}

              </td>

              <td className="px-5 py-4">

                {intent.currency}

              </td>

              <td className="px-5 py-4">

                {intent.status}

              </td>

              <td className="px-5 py-4">

                {intent.createdAt ?? "-"}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}