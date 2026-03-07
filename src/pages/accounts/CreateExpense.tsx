import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/forms/FormInput";
import FormTextarea from "../../components/forms/FormTextarea";

function CreateExpense() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      ...form,
      id: Math.floor(Math.random() * 1000).toString()
    };
    const existing = JSON.parse(localStorage.getItem("trek_expenses") || "[]");
    localStorage.setItem("trek_expenses", JSON.stringify([...existing, newExpense]));
    navigate("/expenses");
  };

  return (
    <div className="p-6">
      <PageHeader title="Create Expense" subtitle="Record a new company or project expense" />

      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-3xl mt-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <FormInput
            label="Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Office Rent, Materials, etc."
            required
          />

          <FormInput
            label="Amount (QAR)"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <div className="col-span-2">
            <FormTextarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="col-span-2 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateExpense;