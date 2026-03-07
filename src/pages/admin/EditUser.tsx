import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivity } from "../../context/ActivityContext";

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logActivity } = useActivity();

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "PROJECT_MANAGER",
        status: "Active"
    });

    useEffect(() => {
        const initialUsers = [
            { id: "USR-001", name: "Admin User", email: "admin@erp.com", role: "SUPER_ADMIN", status: "Active" }
        ];
        const persistedUsers = JSON.parse(localStorage.getItem("trek_users") || "[]");
        const allUsers = [...initialUsers, ...persistedUsers];
        const userToEdit = allUsers.find(u => u.id === id);

        if (userToEdit) {
            setForm({
                name: userToEdit.name,
                email: userToEdit.email,
                role: userToEdit.role,
                status: userToEdit.status
            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id === "USR-001") {
            alert("Cannot edit the default Super Admin user in this demo.");
            return;
        }

        const persistedUsers = JSON.parse(localStorage.getItem("trek_users") || "[]");
        const updatedUsers = persistedUsers.map((u: any) =>
            u.id === id ? { ...u, ...form } : u
        );

        localStorage.setItem("trek_users", JSON.stringify(updatedUsers));

        logActivity("Updated User Profile", "admin", `/users`, form.name);

        navigate("/users");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit User</h1>

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
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Update User
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/users")}
                            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
