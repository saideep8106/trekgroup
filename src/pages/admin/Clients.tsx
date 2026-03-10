import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";

function Clients() {
  const navigate = useNavigate();
  const initialData = [
    {
      id: "CLI-001",
      Name: "Ahmed Ali",
      Email: "ahmed@email.com",
      Phone: "+974 5555 1234",
      Company: "ABC Trading"
    },
    {
      id: "CLI-002",
      Name: "Mohammed Khan",
      Email: "mkhan@email.com",
      Phone: "+974 6666 5678",
      Company: "City Builders"
    }
  ];

  const columns = ["Name", "Email", "Phone", "Company", "Actions"];
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const persistedClients = JSON.parse(localStorage.getItem("trek_clients") || "[]");

    const formattedPersisted = persistedClients.map((item: any) => ({
      ...item,
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Company: item.company,
      Actions: (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/client-details/${item.id}`)}
            className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }));

    const formattedInitial = initialData.map(item => ({
      ...item,
      Actions: (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/client-details/${item.id}`)}
            className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }));

    setTableData([...formattedInitial, ...formattedPersisted]);
  }, [navigate]);

  const handleDelete = (id: string) => {
    // Check if it's in localStorage
    const persistedClients = JSON.parse(localStorage.getItem("trek_clients") || "[]");
    const filtered = persistedClients.filter((c: any) => c.id !== id);
    localStorage.setItem("trek_clients", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Clients
        </h1>

        <Link to="/create-client">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            + Create Client
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}

export default Clients;