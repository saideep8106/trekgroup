import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import { useActivity } from "../../context/ActivityContext";

function CreateProject() {
  const navigate = useNavigate();
  const { logActivity } = useActivity();
  const [form, setForm] = useState({
    name: "",
    client: "",
    budget: "",
    manager: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "Pending"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      ...form,
      id: `PRJ-${Math.floor(Math.random() * 1000)}`
    };
    const existing = JSON.parse(localStorage.getItem("trek_projects") || "[]");
    localStorage.setItem("trek_projects", JSON.stringify([...existing, newProject]));

    logActivity("Created New Project", "project", `/projects`, newProject.name);

    navigate("/projects");
  };

  return (
    <div className="p-6">
      <PageHeader title="Create Project" subtitle="Start a new construction or renovation project" />

      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-3xl mt-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <FormInput
            label="Project Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <FormInput
            label="Client"
            name="client"
            value={form.client}
            onChange={handleChange}
          />

          <FormInput
            label="Budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
          />

          <FormInput
            label="Project Manager"
            name="manager"
            value={form.manager}
            onChange={handleChange}
          />

          <FormInput
            label="Start Date"
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />

          <FormInput
            label="End Date"
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />

          <div className="col-span-2">
            <label className="block text-sm mb-1 text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="col-span-2 mt-4">
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;