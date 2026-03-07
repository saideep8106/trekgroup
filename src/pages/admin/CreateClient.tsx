import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "../../components/DocumentUpload";

function CreateClient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    contractType: "Monthly PRO",
    startDate: "",
    renewalDate: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      ...form,
      id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`
    };
    const existing = JSON.parse(localStorage.getItem("trek_clients") || "[]");
    localStorage.setItem("trek_clients", JSON.stringify([...existing, newClient]));
    navigate("/clients");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Create Client
      </h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Client Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contract Type</label>
              <select
                name="contractType"
                value={form.contractType}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Monthly PRO</option>
                <option>Project Contract</option>
                <option>Trading Customer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Contract Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contract Renewal Date</label>
              <input
                type="date"
                name="renewalDate"
                value={form.renewalDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              /> <br /><br />
              <DocumentUpload />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Client
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateClient;