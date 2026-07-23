"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getTransaction } from "@/features/transactions/services/transaction-details.service";

export default function TransactionDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: transaction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8">
        <div className="text-sm font-medium text-slate-500">
          Loading transaction details...
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="space-y-6 p-8">
        <Link
          href="/dashboard/transactions"
          className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Transactions
        </Link>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-800">
            Unable to load transaction
          </h1>

          <p className="mt-2 text-sm text-red-600">
            The requested transaction could not be found or could not be
            loaded from the SmartPOS API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <Link
          href="/dashboard/transactions"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Transactions
        </Link>

        <div className="mt-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Transaction Details
          </h1>

          <p className="mt-2 text-slate-500">
            Review the full details of this payment transaction.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Transaction Reference
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {transaction.reference}
              </h2>
            </div>

            <TransactionStatus status={transaction.status} />
          </div>
        </div>

        <div className="grid gap-8 p-8 sm:grid-cols-2">
          <DetailItem
            label="Reference"
            value={transaction.reference ?? "-"}
          />

          <DetailItem
            label="Amount"
            value={`${transaction.amount} ${transaction.currency}`}
          />

          <DetailItem
            label="Status"
            value={transaction.status}
          />

          <DetailItem
            label="Payment Method"
            value={transaction.reference ?? "-"}
          />

          <DetailItem
            label="Merchant"
            value={transaction.merchantId ?? "-"}
          />

          <DetailItem
            label="Terminal"
            value={"-"}
          />

          <DetailItem
            label="Created"
            value={formatDate(transaction.createdAt)}
          />

          <DetailItem
            label="Description"
            value={transaction.reference ?? "-"}
          />
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function TransactionStatus({
  status,
}: {
  status: string;
}) {
  const normalizedStatus = status.toUpperCase();

  const statusStyles =
    normalizedStatus === "SETTLED"
      ? "border-green-200 bg-green-100 text-green-700"
      : normalizedStatus === "PENDING"
        ? "border-yellow-200 bg-yellow-100 text-yellow-700"
        : normalizedStatus === "FAILED"
          ? "border-red-200 bg-red-100 text-red-700"
          : normalizedStatus === "REFUNDED"
            ? "border-purple-200 bg-purple-100 text-purple-700"
            : "border-slate-200 bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles}`}
    >
      {normalizedStatus}
    </span>
  );
}

function formatDate(value: string | Date) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString();
}