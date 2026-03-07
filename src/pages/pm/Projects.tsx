import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useActivity } from "../../context/ActivityContext";

function Projects() {
  const { logActivity } = useActivity();
  const initialData = [
    {
      "Project": "Office Construction",
      "Client": "ABC Builders",
      "Budget": "QAR 5,00,000",
      "Manager": "John",
      "Status": <StatusBadge status="Pending" />,
      "Actions": (
        <div className="flex gap-2">
          <Link to="/projects" className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
            <Edit size={16} />
          </Link>
          <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      )
    },
  ];

  const columns = ["Project", "Client", "Budget", "Manager", "Status", "Actions"];
  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    const persistedProjects = JSON.parse(localStorage.getItem("trek_projects") || "[]");
    const formattedPersisted = persistedProjects.map((item: any) => ({
      ...item,
      "Project": item.name,
      "Client": item.client,
      "Budget": item.budget,
      "Manager": item.manager,
      "Status": <StatusBadge status={item.status || "Pending"} />,
      "Actions": (
        <div className="flex gap-2">
          <Link to={`/edit-project/${item.id}`} className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
            <Edit size={16} />
          </Link>
          <button
            onClick={() => handleDelete(item.id, item.name)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }));
    setTableData([...initialData, ...formattedPersisted]);
  }, []);

  const handleDelete = (id: string, projectName: string) => {
    const persistedProjects = JSON.parse(localStorage.getItem("trek_projects") || "[]");
    const filtered = persistedProjects.filter((p: any) => p.id !== id);
    localStorage.setItem("trek_projects", JSON.stringify(filtered));

    logActivity("Deleted Project", "project", "/projects", projectName);

    window.location.reload(); // Simple way to refresh
  };

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Manage your current and upcoming projects"
        action={
          <Link to="/create-project">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              <Plus size={16} />
              Create Project
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

export default Projects;