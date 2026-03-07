import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Eye, Trash2, Plus } from "lucide-react";
import { useActivity } from "../../context/ActivityContext";

function Invoices() {
  const { logActivity } = useActivity();
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const initialInvoices = [
      { id: "1", invoiceNo: "INV-001", client: "ABC Company", amount: "1200", status: "Paid" },
      { id: "2", invoiceNo: "INV-002", client: "XYZ Ltd", amount: "900", status: "Paid" }
    ];
    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");

    const formattedData = [...initialInvoices, ...persistedInvoices].map(invoice => ({
      ...invoice,
      "Invoice No": invoice.invoiceNo,
      "Client": invoice.client,
      "Amount": `QAR ${invoice.amount}`,
      "Status": <StatusBadge status={invoice.status} />,
      "Actions": (
        <div className="flex gap-2">
          <Link to={`/invoice-details/${invoice.id}`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
          {invoice.id !== "1" && invoice.id !== "2" && (
            <button
              onClick={() => handleDelete(invoice.id, invoice.invoiceNo)}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )
    }));

    setInvoices(formattedData);
  }, []);

  const handleDelete = (id: string, invoiceNo: string) => {
    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
    const filtered = persistedInvoices.filter((inv: any) => inv.id !== id);
    localStorage.setItem("trek_invoices", JSON.stringify(filtered));

    logActivity(`Deleted Invoice ${invoiceNo}`, "finance", "/invoices", invoiceNo);

    window.location.reload();
  };

  const columns = ["Invoice No", "Client", "Amount", "Status", "Actions"];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Invoices</h1>
        <Link
          to="/create-invoice"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={columns} data={invoices} />
      </div>
    </div>
  );
}

export default Invoices;