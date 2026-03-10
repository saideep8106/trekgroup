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
    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");

    // Mock initial data if empty
    const initialInvoices = persistedInvoices.length > 0 ? persistedInvoices : [
      {
        id: "1",
        invoiceNo: "INV-2024-001",
        client: "ABC Company",
        refType: "Proposal",
        refNo: "PROP-2024-001",
        amount: "1200",
        status: "Paid",
        date: "2024-02-15",
        dueDate: "2024-03-01"
      },
      {
        id: "2",
        invoiceNo: "INV-2024-002",
        client: "XYZ Ltd",
        refType: "Project",
        refNo: "PRJ-990",
        amount: "900",
        status: "Unpaid",
        date: "2024-02-28",
        dueDate: "2024-03-15"
      }
    ];

    if (persistedInvoices.length === 0) {
      localStorage.setItem("trek_invoices", JSON.stringify(initialInvoices));
    }

    const formattedData = initialInvoices.map((invoice: any) => ({
      ...invoice,
      "Invoice No": invoice.invoiceNo,
      "Client": invoice.client,
      "Ref Type": invoice.refType || "General",
      "Ref No": invoice.refNo || "-",
      "Amount": `QAR ${parseFloat(invoice.amount).toLocaleString()}`,
      "Status": <StatusBadge status={invoice.status} />,
      "Date": invoice.date,
      "Actions": (
        <div className="flex gap-2">
          <Link to={`/invoice-details/${invoice.id}`} title="View" className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
          <button
            onClick={() => handleDelete(invoice.id, invoice.invoiceNo)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }));

    setInvoices(formattedData);
  }, []);

  const handleDelete = (id: string, invoiceNo: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete invoice ${invoiceNo}?`);
    if (!confirmed) return;

    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
    const filtered = persistedInvoices.filter((inv: any) => inv.id !== id);
    localStorage.setItem("trek_invoices", JSON.stringify(filtered));

    logActivity(`Deleted Invoice ${invoiceNo}`, "finance", "/invoices", invoiceNo);
    window.location.reload();
  };

  const columns = ["Invoice No", "Client", "Ref Type", "Ref No", "Amount", "Status", "Date", "Actions"];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Invoices</h1>
          <p className="text-slate-500">Manage invoices and payment statuses</p>
        </div>
        <Link
          to="/create-invoice"
          className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition"
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