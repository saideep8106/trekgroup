import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { useActivity } from "../../context/ActivityContext";

function Users() {
  const { logActivity } = useActivity();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const initialUsers = [
      { id: "USR-001", name: "Admin User", email: "admin@erp.com", role: "SUPER_ADMIN", status: "Active" }
    ];
    const persistedUsers = JSON.parse(localStorage.getItem("trek_users") || "[]");
    setUsers([...initialUsers, ...persistedUsers]);
  }, []);

  const handleDelete = (id: string) => {
    const persistedUsers = JSON.parse(localStorage.getItem("trek_users") || "[]");
    const userToDelete = users.find(u => u.id === id);
    const filtered = persistedUsers.filter((u: any) => u.id !== id);
    localStorage.setItem("trek_users", JSON.stringify(filtered));

    if (userToDelete) {
      logActivity("Deleted User", "admin", "/users", userToDelete.name);
    }

    window.location.reload();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link
          to="/create-user"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Create User
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Name</th>
              <th className="text-left p-4 font-semibold text-slate-600">Email</th>
              <th className="text-left p-4 font-semibold text-slate-600">Role</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              <th className="text-right p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{user.name}</td>
                <td className="p-4 text-slate-600">{user.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/edit-user/${user.id}`} className="p-1 text-slate-400 hover:text-amber-600 transition-colors">
                      <Edit size={16} />
                    </Link>
                    {user.id !== "USR-001" && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;