interface Props {
  status: string;
}

const statusStyles: Record<string, string> = {
  "New": "bg-gray-100 text-gray-600 ring-gray-200",
  "Submitted": "bg-amber-50 text-amber-700 ring-amber-200",
  "Under Process": "bg-blue-50 text-blue-700 ring-blue-200",
  "Approved": "bg-violet-50 text-violet-700 ring-violet-200",
  "Completed": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Delivered": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "Paid": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Unpaid": "bg-red-50 text-red-700 ring-red-200",
  "Pending": "bg-amber-50 text-amber-700 ring-amber-200",
  "Overdue": "bg-red-50 text-red-700 ring-red-200",
  "Active": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Inactive": "bg-gray-100 text-gray-600 ring-gray-200",
};

function StatusBadge({ status }: Props) {
  const style = statusStyles[status] || "bg-gray-100 text-gray-600 ring-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] rounded-full font-medium ring-1 ring-inset ${style}`}
    >
      <span
        className={`w-1 h-1 rounded-full mr-1.5 ${style.includes("emerald") ? "bg-emerald-500" :
            style.includes("amber") ? "bg-amber-500" :
              style.includes("blue") ? "bg-blue-500" :
                style.includes("violet") ? "bg-violet-500" :
                  style.includes("red") ? "bg-red-500" :
                    style.includes("indigo") ? "bg-indigo-500" :
                      "bg-gray-400"
          }`}
      />
      {status}
    </span>
  );
}

export default StatusBadge;