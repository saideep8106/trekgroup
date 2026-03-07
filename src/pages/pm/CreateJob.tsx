import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import FormTextarea from "../../components/forms/FormTextarea";
import DocumentUpload from "../../components/DocumentUpload";

function CreateJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    clientName: "",
    serviceType: "",
    status: "New",
    dueDate: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      ...form,
      jobId: `JOB-${Math.floor(Math.random() * 1000)}`
    };
    const existing = JSON.parse(localStorage.getItem("trek_jobs") || "[]");
    localStorage.setItem("trek_jobs", JSON.stringify([...existing, newJob]));
    navigate("/jobs");
  };

  return (
    <div className="p-6">
      <PageHeader title="Create Job" subtitle="Define a new service request or deliverable" />

      <div className="bg-white p-6 rounded-xl border shadow-sm mt-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <FormInput
            label="Client Name"
            name="clientName"
            value={form.clientName}
            placeholder="ABC Company"
            onChange={handleChange}
          />

          <FormInput
            label="Service Type"
            name="serviceType"
            value={form.serviceType}
            placeholder="Visa Renewal"
            onChange={handleChange}
          />

          <FormSelect
            label="Job Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              "New",
              "Submitted",
              "Under Process",
              "Approved",
              "Completed",
              "Delivered"
            ]}
          />

          <FormInput
            label="Due Date"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <div className="col-span-2">
            <FormTextarea
              label="Job Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <DocumentUpload />
          </div>

          <div className="col-span-2 mt-4">
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;