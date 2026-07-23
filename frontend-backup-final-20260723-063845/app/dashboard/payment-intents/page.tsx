import { PaymentIntentsTable } from "@/components/payments/payment-intents-table";

export default function PaymentIntentsPage() {

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Payment Intents

        </h1>

        <p className="text-slate-500">

          Incoming payment requests.

        </p>

      </div>

      <PaymentIntentsTable />

    </div>

  );

}