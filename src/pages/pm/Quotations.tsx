import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Plus, Eye, Edit, Trash2, Printer } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const columns = ["Quote ID", "Project", "Client", "Amount", "Status", "Expiry Date", "Actions"];

const initialData = [
  {
    "Quote ID": "QT-2026-452",
    "Project": "Luxury Villa Construction",
    "Client": "Al Thani Estates",
    "Amount": "QAR 2,450,000",
    "Status": <StatusBadge status="Submitted" />,
    "Expiry Date": "2026-04-01",
    "Actions": (
      <div className="flex gap-2">
        <Link to={`/quotation-details/QT-2026-452`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
          <Eye size={16} />
        </Link>
        <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors">
          <Printer size={16} />
        </button>
        <Link to="/create-quotation" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
          <Edit size={16} />
        </Link>
        <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    )
  }
];

function Quotations() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    const persistedQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");
    const formattedPersisted = persistedQuotations.map((item: any) => ({
      ...item,
      "Project": item.project,
      "Client": item.client,
      "Amount": item.amount,
      "Expiry Date": item.expiryDate,
      "Status": <StatusBadge status={item.Status || "Submitted"} />,
      "Actions": (
        <div className="flex gap-2">
          <Link to={`/quotation-details/${item["Quote ID"] || item.id}`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
          <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors">
            <Printer size={16} />
          </button>
          <Link to="/create-quotation" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
            <Edit size={16} />
          </Link>
          <button
            onClick={() => handleDelete(item["Quote ID"])}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }));
    setTableData([...initialData, ...formattedPersisted]);
  }, []);

  const handleDelete = (id: string) => {
    const persistedQuotations = JSON.parse(localStorage.getItem("trek_quotations") || "[]");
    const filtered = persistedQuotations.filter((item: any) => item["Quote ID"] !== id);
    localStorage.setItem("trek_quotations", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <>
      <PageHeader
        title="Project Quotations"
        subtitle="Manage and track project cost estimates"
        action={
          <button
            onClick={() => navigate("/create-quotation")}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Create Quotation
          </button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
}

export default Quotations;
