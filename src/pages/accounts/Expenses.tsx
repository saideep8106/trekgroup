import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    const initialExpenses = [
      { id: "1", date: "2026-03-05", category: "Office Rent", description: "March Office Rent", amount: "3000" },
      { id: "2", date: "2026-03-06", category: "Materials", description: "Glass Purchase", amount: "1200" }
    ];
    const persistedExpenses = JSON.parse(localStorage.getItem("trek_expenses") || "[]");

    const formattedData = [...initialExpenses, ...persistedExpenses].map(expense => ({
      ...expense,
      "Date": expense.date,
      "Category": expense.category,
      "Description": expense.description,
      "Amount": `QAR ${expense.amount}`,
      "Actions": (
        <div className="flex gap-2">
          {expense.id !== "1" && expense.id !== "2" && (
            <button
              onClick={() => handleDelete(expense.id)}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )
    }));

    setExpenses(formattedData);
  }, []);

  const handleDelete = (id: string) => {
    const persistedExpenses = JSON.parse(localStorage.getItem("trek_expenses") || "[]");
    const filtered = persistedExpenses.filter((exp: any) => exp.id !== id);
    localStorage.setItem("trek_expenses", JSON.stringify(filtered));
    window.location.reload();
  };

  const columns = ["Date", "Category", "Description", "Amount", "Actions"];

  return (
    <div className="p-6">
      <PageHeader
        title="Expenses"
        subtitle="Track company and project expenditures"
        action={
          <Link to="/create-expense">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus size={16} />
              Add Expense
            </button>
          </Link>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  );
}

export default Expenses;