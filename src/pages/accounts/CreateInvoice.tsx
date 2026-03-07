import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActivity } from "../../context/ActivityContext";

function CreateInvoice() {
  const navigate = useNavigate();
  const { logActivity } = useActivity();

  const [form, setForm] = useState({
    invoiceNo: "",
    client: "",
    amount: "",
    status: "Pending"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice = {
      ...form,
      id: Math.floor(Math.random() * 1000).toString()
    };
    const existing = JSON.parse(localStorage.getItem("trek_invoices") || "[]");
    localStorage.setItem("trek_invoices", JSON.stringify([...existing, newInvoice]));

    logActivity(`Created Invoice ${form.invoiceNo}`, "finance", `/invoices`, form.client);

    navigate("/invoices");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Client Name</label>
            <input
              type="text"
              name="client"
              value={form.client}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Invoice Number</label>
            <input
              type="text"
              name="invoiceNo"
              value={form.invoiceNo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="INV-001"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Amount (QAR)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option>Pending</option>
              <option>Paid</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInvoice;