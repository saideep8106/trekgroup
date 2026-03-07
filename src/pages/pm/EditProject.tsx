import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useActivity } from "../../context/ActivityContext";

function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logActivity } = useActivity();

    const [form, setForm] = useState({
        name: "",
        client: "",
        budget: "",
        manager: "",
        status: "Pending",
        description: ""
    });

    useEffect(() => {
        const initialData = [
            { id: "1", name: "Office Construction", client: "ABC Builders", budget: "QAR 5,00,000", manager: "John", status: "Pending" }
        ];
        const persistedProjects = JSON.parse(localStorage.getItem("trek_projects") || "[]");
        const allProjects = [...initialData, ...persistedProjects];
        const project = allProjects.find(p => p.id === id);

        if (project) {
            setForm({
                name: project.name || project.Project || "",
                client: project.client || project.Client || "",
                budget: project.budget || project.Budget || "",
                manager: project.manager || project.Manager || "",
                status: project.status || "Pending",
                description: project.description || ""
            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id === "1") {
            alert("Cannot edit the default project in this demo.");
            return;
        }
        const persistedProjects = JSON.parse(localStorage.getItem("trek_projects") || "[]");
        const updated = persistedProjects.map((p: any) =>
            p.id === id ? { ...p, ...form } : p
        );
        localStorage.setItem("trek_projects", JSON.stringify(updated));

        logActivity(`Updated Project Status to ${form.status}`, "project", `/projects`, form.name);

        navigate("/projects");
    };

    return (
        <div className="p-6">
            <PageHeader
                title="Edit Project"
                subtitle={`Updating project details for ID: ${id}`}
            />

            <div className="bg-white p-6 rounded-xl border shadow-sm max-w-2xl mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm mb-1 text-gray-600">Project Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Client</label>
                            <input
                                name="client"
                                value={form.client}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Budget</label>
                            <input
                                name="budget"
                                value={form.budget}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Project Manager</label>
                            <input
                                name="manager"
                                value={form.manager}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option>Pending</option>
                                <option>Active</option>
                                <option>Completed</option>
                                <option>On Hold</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-600">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="submit" className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            Update Project
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/projects")}
                            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProject;
