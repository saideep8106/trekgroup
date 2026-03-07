import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { Plus, Trash2, Eye } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

function Jobs() {
  const initialData = [
    {
      "Job ID": "JOB-001",
      Client: "ABC Company",
      Service: "Visa Renewal",
      Status: <StatusBadge status="Under Process" />,
      "Due Date": "2026-03-20",
      Actions: (
        <div className="flex gap-2">
          <Link to={`/job-details/JOB-001`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
        </div>
      )
    },
  ];

  const columns = ["Job ID", "Client", "Service", "Status", "Due Date", "Actions"];
  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    const persistedJobs = JSON.parse(localStorage.getItem("trek_jobs") || "[]");
    const formattedPersisted = persistedJobs.map((item: any) => ({
      ...item,
      "Job ID": item.jobId,
      Client: item.clientName,
      Service: item.serviceType,
      Status: <StatusBadge status={item.status || "New"} />,
      "Due Date": item.dueDate,
      Actions: (
        <div className="flex gap-2">
          <Link to={`/job-details/${item.jobId}`} className="p-1 text-slate-400 hover:text-brand-600 transition-colors">
            <Eye size={16} />
          </Link>
          <button
            onClick={() => handleDelete(item.jobId)}
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
    const persistedJobs = JSON.parse(localStorage.getItem("trek_jobs") || "[]");
    const filtered = persistedJobs.filter((j: any) => j.jobId !== id);
    localStorage.setItem("trek_jobs", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <>
      <PageHeader
        title="Jobs"
        subtitle="Track ongoing service requests and deliverables"
        action={
          <Link to="/create-job">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              <Plus size={16} />
              Create Job
            </button>
          </Link>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
}

export default Jobs;
