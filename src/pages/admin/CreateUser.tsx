import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActivity } from "../../context/ActivityContext";

function CreateUser() {
  const navigate = useNavigate();
  const { logActivity } = useActivity();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // Added password field so admin can give them login access
    role: "PROJECT_MANAGER",
    status: "Active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      ...form,
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`
    };
    const existing = JSON.parse(localStorage.getItem("trek_users") || "[]");

    // Check if email already exists
    if (existing.some((u: any) => u.email === form.email)) {
      alert("Email already in use");
      return;
    }

    localStorage.setItem("trek_users", JSON.stringify([...existing, newUser]));

    logActivity("Created New User", "admin", "/users", newUser.name);

    navigate("/users");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create User</h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Assign an initial password"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ACCOUNTS">Accounts</option>
              <option value="PROJECT_MANAGER">Project Manager</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;