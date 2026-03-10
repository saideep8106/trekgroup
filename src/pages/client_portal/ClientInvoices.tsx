import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

function ClientInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, we'd filter by client ID from auth context
    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");

    const formattedData = persistedInvoices.map((inv: any) => ({
      ...inv,
      "Invoice No": inv.invoiceNo,
      "Amount": `QAR ${parseFloat(inv.amount).toLocaleString()}`,
      "Status": <StatusBadge status={inv.status} />,
      "Date": inv.date,
      "Actions": (
        <div className="flex gap-3">
          <Link to={`/invoice-details/${inv.id}`} className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium text-sm">
            <Eye size={14} /> View Invoice
          </Link>
        </div>
      )
    }));

    setInvoices(formattedData);
  }, []);

  const columns = [
    "Invoice No",
    "Amount",
    "Status",
    "Date",
    "Actions"
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">My Invoices</h1>
          <p className="text-slate-500 text-sm">View and download your invoices</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable columns={columns} data={invoices} />
        {invoices.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No invoices found.
          </div>
        )}
      </div>
    </>
  );
}

export default ClientInvoices;