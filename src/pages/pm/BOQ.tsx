import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const columns = ["ID", "Project", "Client", "Total Amount", "Status", "Date", "Actions"];

const initialData = [
  {
    "ID": "BOQ-2026-001",
    "Project": "Luxury Villa Construction",
    "Client": "Al Thani Estates",
    "Total Amount": "QAR 2,450,000",
    "Status": <StatusBadge status="Under Process" />,
    "Date": "2026-03-01",
    "Actions": (
      <div className="flex gap-2">
        <Link to={`/boq-details/BOQ-2026-001`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
          <Eye size={16} />
        </Link>
        <Link to="/create-boq" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
          <Edit size={16} />
        </Link>
        <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    )
  },
  {
    "ID": "BOQ-2026-002",
    "Project": "Modern Office Complex",
    "Client": "Qatar Business Hub",
    "Total Amount": "QAR 5,200,000",
    "Status": <StatusBadge status="Approved" />,
    "Date": "2026-02-28",
    "Actions": (
      <div className="flex gap-2">
        <Link to={`/boq-details/BOQ-2026-002`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
          <Eye size={16} />
        </Link>
        <Link to="/create-boq" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
          <Edit size={16} />
        </Link>
        <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    )
  }
];

function BOQ() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    const persistedBOQs = JSON.parse(localStorage.getItem("trek_boqs") || "[]");
    const formattedPersisted = persistedBOQs.map((item: any) => ({
      ...item,
      "Project": item.project,
      "Client": item.client,
      "Total Amount": item.totalAmount,
      "Date": item.date,
      "Status": <StatusBadge status={item.Status} />,
      "Actions": (
        <div className="flex gap-2">
          <Link to={`/boq-details/${item.ID || item.id}`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
          <Link to="/create-boq" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
            <Edit size={16} />
          </Link>
          <button
            onClick={() => handleDelete(item.ID)}
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
    const persistedBOQs = JSON.parse(localStorage.getItem("trek_boqs") || "[]");
    const filtered = persistedBOQs.filter((item: any) => item.ID !== id);
    localStorage.setItem("trek_boqs", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <>
      <PageHeader
        title="Bill of Quantities (BOQ)"
        subtitle="Manage material estimations and project quantities"
        action={
          <button
            onClick={() => navigate("/create-boq")}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Create BOQ
          </button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
}

export default BOQ;
