import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { Plus, Trash2, Eye, Receipt, TrendingUp, Briefcase, DollarSign } from "lucide-react";

const DIVISION_FILTERS = [
  { value: "all", label: "All Divisions" },
  { value: "general", label: "General" },
  { value: "contracting", label: "Contracting" },
  { value: "trading", label: "Trading" },
  { value: "business", label: "Business Proposals" },
];

function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [rawExpenses, setRawExpenses] = useState<any[]>([]);
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  const loadExpenses = () => {
    const persisted: any[] = JSON.parse(localStorage.getItem("trek_expenses") || "[]");
    setRawExpenses(persisted);

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(persisted.map((e: any) => e.category).filter(Boolean)),
    ];
    setCategories(uniqueCategories as string[]);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    let filtered = [...rawExpenses];

    if (divisionFilter !== "all") {
      filtered = filtered.filter(
        (e) => (e.referenceType || "general") === divisionFilter
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    const formattedData = filtered.map((expense) => ({
      ...expense,
      Date: expense.date || "-",
      "Expense Name": expense.expenseName || expense.description || "-",
      Category: expense.category || "-",
      Division:
        expense.divisionLabel ||
        DIVISION_FILTERS.find((d) => d.value === (expense.referenceType || "general"))
          ?.label ||
        "General",
      Vendor: expense.vendor || "-",
      "Payment Method": expense.paymentMethod || "-",
      Amount: `QAR ${parseFloat(expense.amount || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      Attachment: expense.attachment ? (
        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
          📎 {expense.attachment}
        </span>
      ) : (
        <span className="text-slate-300 text-xs">None</span>
      ),
      Actions: (
        <div className="flex gap-2">
          <Link
            to={`/expense-details/${expense.id}`}
            className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => handleDelete(expense.id)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }));

    setExpenses(formattedData);
  }, [rawExpenses, divisionFilter, categoryFilter]);

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmed) return;
    const persisted = JSON.parse(
      localStorage.getItem("trek_expenses") || "[]"
    );
    const filtered = persisted.filter((exp: any) => exp.id !== id);
    localStorage.setItem("trek_expenses", JSON.stringify(filtered));
    loadExpenses();
  };

  // Stats calculations
  const totalExpenses = rawExpenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );

  const contractingTotal = rawExpenses
    .filter((e) => e.referenceType === "contracting")
    .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  const tradingTotal = rawExpenses
    .filter((e) => e.referenceType === "trading")
    .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  const businessTotal = rawExpenses
    .filter((e) => e.referenceType === "business")
    .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  const generalTotal = rawExpenses
    .filter((e) => !e.referenceType || e.referenceType === "general")
    .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  const topCategory =
    rawExpenses.length > 0
      ? Object.entries(
        rawExpenses.reduce((acc: Record<string, number>, e: any) => {
          const cat = e.category || "Uncategorized";
          acc[cat] = (acc[cat] || 0) + parseFloat(e.amount || 0);
          return acc;
        }, {})
      ).sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0] || "N/A"
      : "N/A";

  const columns = [
    "Date",
    "Expense Name",
    "Category",
    "Division",
    "Vendor",
    "Payment Method",
    "Amount",
    "Attachment",
    "Actions",
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Expense Management"
        subtitle="Track and manage all company and project expenditures"
        action={
          <Link to="/create-expense">
            <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition shadow-sm">
              <Plus size={16} />
              Add Expense
            </button>
          </Link>
        }
      />

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Total Expenses"
          value={`QAR ${totalExpenses.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Contracting"
          value={`QAR ${contractingTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          icon={<Briefcase size={20} />}
        />
        <StatCard
          title="Trading"
          value={`QAR ${tradingTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Business Proposals"
          value={`QAR ${businessTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          icon={<Receipt size={20} />}
        />
        <StatCard
          title="General"
          value={`QAR ${generalTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          icon={<Eye size={20} />}
        />
      </div>

      {/* Top Category Banner */}
      {rawExpenses.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-100 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-sm text-brand-700 font-medium">
            🏷️ Top Expense Category:
          </span>
          <span className="text-sm font-bold text-brand-800">{topCategory}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Division
          </label>
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white min-w-[180px]"
          >
            {DIVISION_FILTERS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white min-w-[180px]"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setDivisionFilter("all");
              setCategoryFilter("all");
            }}
            className="text-sm text-brand-600 hover:text-brand-800 font-medium px-3 py-2 rounded-lg hover:bg-brand-50 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        {expenses.length > 0 ? (
          <DataTable columns={columns} data={expenses} />
        ) : (
          <div className="p-12 text-center">
            <Receipt size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-1">
              No expenses found
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {divisionFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters or add a new expense."
                : "Start tracking your expenses by adding the first one."}
            </p>
            <Link to="/create-expense">
              <button className="text-sm bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition">
                <Plus size={14} className="inline mr-1" /> Add Expense
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Expenses;