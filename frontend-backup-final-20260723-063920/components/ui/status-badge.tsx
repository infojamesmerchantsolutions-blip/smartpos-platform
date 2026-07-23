type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  const colors: Record<string, string> = {
    SETTLED:
      "bg-green-100 text-green-700",

    SUCCESS:
      "bg-green-100 text-green-700",

    PENDING:
      "bg-yellow-100 text-yellow-700",

    FAILED:
      "bg-red-100 text-red-700",

    DECLINED:
      "bg-red-100 text-red-700",

    PROCESSING:
      "bg-blue-100 text-blue-700",

    REFUNDED:
      "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}