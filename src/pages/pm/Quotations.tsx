import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Plus, Eye, Trash2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useActivity } from "../../context/ActivityContext";

import { useParams } from "react-router-dom";

function Quotations() {
  const navigate = useNavigate();
  const { division } = useParams();
  const { logActivity } = useActivity();
  const [activeTab, setActiveTab] = useState<"quotations" | "invoices">("quotations");
  const [tableData, setTableData] = useState<any[]>([]);

  const divisionMap: Record<string, string> = {
    business: "Business Services Proposal",
    trading: "Trading Services",
    contracting: "Contracting Division"
  };

  const currentTitle = division ? divisionMap[division] || "Project Quotations" : "Project Quotations";

  useEffect(() => {
    if (activeTab === "quotations") {
      const persistedQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");

      const filtered = persistedQuotations.filter((item: any) => {
        if (!division) return true;
        const branchLower = (item.branch || "Contracting").toLowerCase();
        if (division === "business" && branchLower === "business") return true;
        if (division === "trading" && branchLower === "trading") return true;
        if (division === "contracting" && branchLower === "contracting") return true;
        return false;
      });

      const formattedData = filtered.map((item: any) => ({
        ...item,
        "Quote ID": item["Quote ID"] || item.id,
        "Project": item.project,
        "Client": item.client,
        "Amount": `QAR ${parseFloat(item.netTotal || item.amount || 0).toLocaleString()}`,
        "Expiry Date": item.expiryDate,
        "Status": <StatusBadge status={item.Status || "Submitted"} />,
        "Actions": (
          <div className="flex gap-2">
            <Link to={`/quotation-details/${item["Quote ID"] || item.id}`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
              <Eye size={16} />
            </Link>

            <button
              onClick={() => handleDeleteQuote(item["Quote ID"] || item.id)}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )
      }));
      setTableData(formattedData);
    } else {
      const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");

      const filtered = persistedInvoices.filter((item: any) => {
        if (!division) return true;
        const branchLower = (item.branch || "Contracting").toLowerCase();
        if (division === "business" && branchLower === "business") return true;
        if (division === "trading" && branchLower === "trading") return true;
        if (division === "contracting" && branchLower === "contracting") return true;
        return false;
      });

      const formattedData = filtered.map((invoice: any) => ({
        ...invoice,
        "Invoice No": invoice.invoiceNo,
        "Client": invoice.client,
        "Ref Type": invoice.refType || "General",
        "Ref No": invoice.refNo || "-",
        "Amount": `QAR ${parseFloat(invoice.amount).toLocaleString()}`,
        "Status": <StatusBadge status={invoice.status} />,
        "Date": invoice.date || invoice.createdAt || "-",
        "Actions": (
          <div className="flex gap-2 items-center">
            <Link to={`/invoice-details/${invoice.id}`} title="View" className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
              <Eye size={16} />
            </Link>
            <button
              onClick={() => toggleInvoiceStatus(invoice.id, invoice.status, invoice.invoiceNo)}
              className="p-1 px-2 text-xs font-semibold bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
              title="Toggle Status"
            >
              Mark {invoice.status === "Paid" ? "Unpaid" : "Paid"}
            </button>
            <button
              onClick={() => handleDeleteInvoice(invoice.id)}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )
      }));
      setTableData(formattedData);
    }
  }, [division, activeTab]);

  const handleDeleteQuote = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this quotation?");
    if (!confirmed) return;

    const persistedQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");
    const filtered = persistedQuotations.filter((item: any) => (item["Quote ID"] !== id && item.id !== id));
    localStorage.setItem("trek_quotations", JSON.stringify(filtered));
    window.location.reload();
  };

  const toggleInvoiceStatus = (id: string, currentStatus: string, invoiceNo: string) => {
    const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    const confirmed = window.confirm(`Mark invoice ${invoiceNo} as ${newStatus}?`);
    if (!confirmed) return;

    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
    const updated = persistedInvoices.map((inv: any) => inv.id === id ? { ...inv, status: newStatus } : inv);
    localStorage.setItem("trek_invoices", JSON.stringify(updated));

    logActivity(`Marked Invoice ${invoiceNo} as ${newStatus}`, "finance", "/invoices", invoiceNo);
    window.location.reload();
  };

  const handleDeleteInvoice = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this invoice?");
    if (!confirmed) return;

    const persistedInvoices = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
    const filtered = persistedInvoices.filter((inv: any) => inv.id !== id);
    localStorage.setItem("trek_invoices", JSON.stringify(filtered));
    window.location.reload();
  };

  const quoteColumns = ["Quote ID", "Project", "Client", "Amount", "Status", "Expiry Date", "Actions"];
  const invoiceColumns = ["Invoice No", "Client", "Ref Type", "Ref No", "Amount", "Status", "Date", "Actions"];

  return (
    <>
      <PageHeader
        title={currentTitle}
        subtitle={`Manage and track ${currentTitle.toLowerCase()}`}
        action={
          <div className="flex gap-3">
            {activeTab === "quotations" ? (
              <button
                onClick={() => navigate(division ? `/create-quotation/${division}` : "/create-quotation")}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={16} />
                Create Quotation
              </button>
            ) : (
              <button
                onClick={() => navigate(division ? `/create-invoice/${division}` : "/create-invoice")}
                className="btn-primary flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus size={16} />
                Create Invoice
              </button>
            )}
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-8">
        <button
          onClick={() => setActiveTab("quotations")}
          className={`pb-4 text-sm font-semibold transition-colors relative ${activeTab === "quotations" ? "text-brand-600" : "text-slate-500 hover:text-slate-700"
            }`}
        >
          Quotations
          {activeTab === "quotations" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab("invoices")}
          className={`pb-4 text-sm font-semibold transition-colors relative ${activeTab === "invoices" ? "text-brand-600" : "text-slate-500 hover:text-slate-700"
            }`}
        >
          Invoices
          {activeTab === "invoices" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={activeTab === "quotations" ? quoteColumns : invoiceColumns} data={tableData} />
      </div>
    </>
  );
}

export default Quotations;
