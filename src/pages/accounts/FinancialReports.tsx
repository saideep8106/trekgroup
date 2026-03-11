import { useState, useEffect, useMemo } from "react";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";
import {
    DollarSign, TrendingUp, TrendingDown, Filter
} from "lucide-react";

const DIVISION_COLORS: Record<string, string> = {
    contracting: "#3b82f6",
    trading: "#8b5cf6",
    business: "#f59e0b",
    general: "#6b7280",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function FinancialReports() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>("daily");

    // Filters
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());
    const [filterMonth, setFilterMonth] = useState<number | "all">("all");
    const [filterDivision, setFilterDivision] = useState("all");
    const [filterDateFrom, setFilterDateFrom] = useState("");
    const [filterDateTo, setFilterDateTo] = useState("");

    useEffect(() => {
        setInvoices(JSON.parse(localStorage.getItem("trek_invoices") || "[]"));
        setExpenses(JSON.parse(localStorage.getItem("trek_expenses") || "[]"));
    }, []);

    // Filtered data helpers
    const filterByDate = (items: any[], dateField: string) => {
        return items.filter((item) => {
            const d = new Date(item[dateField]);
            if (isNaN(d.getTime())) return false;
            if (d.getFullYear() !== filterYear) return false;
            if (filterMonth !== "all" && d.getMonth() !== filterMonth) return false;
            if (filterDivision !== "all") {
                const branch = (item.branch || item.referenceType || "general").toLowerCase();
                if (branch !== filterDivision) return false;
            }
            if (filterDateFrom && d < new Date(filterDateFrom)) return false;
            if (filterDateTo && d > new Date(filterDateTo + "T23:59:59")) return false;
            return true;
        });
    };

    const filteredInvoices = useMemo(() => filterByDate(invoices, "date"), [invoices, filterYear, filterMonth, filterDivision, filterDateFrom, filterDateTo]);
    const filteredExpenses = useMemo(() => filterByDate(expenses, "date"), [expenses, filterYear, filterMonth, filterDivision, filterDateFrom, filterDateTo]);

    const totalIncome = filteredInvoices.reduce((s, i) => s + parseFloat(i.total || i.amount || 0), 0);
    const totalExpense = filteredExpenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0);
    const netProfit = totalIncome - totalExpense;

    // Monthly breakdown for charts
    const monthlyData = useMemo(() => {
        return MONTHS.map((name, idx) => {
            const mIncome = invoices
                .filter((i) => {
                    const d = new Date(i.date);
                    return d.getFullYear() === filterYear && d.getMonth() === idx &&
                        (filterDivision === "all" || (i.branch || "").toLowerCase() === filterDivision);
                })
                .reduce((s, i) => s + parseFloat(i.total || i.amount || 0), 0);
            const mExpense = expenses
                .filter((e) => {
                    const d = new Date(e.date);
                    return d.getFullYear() === filterYear && d.getMonth() === idx &&
                        (filterDivision === "all" || (e.referenceType || "general") === filterDivision);
                })
                .reduce((s, e) => s + parseFloat(e.amount || 0), 0);
            return { name, Income: mIncome, Expenses: mExpense, Profit: mIncome - mExpense };
        });
    }, [invoices, expenses, filterYear, filterDivision]);

    // Division breakdown
    const divisionData = useMemo(() => {
        const divs = ["contracting", "trading", "business", "general"];
        return divs.map((div) => {
            const income = filteredInvoices
                .filter((i) => (i.branch || "").toLowerCase() === div || (div === "general" && !i.branch))
                .reduce((s, i) => s + parseFloat(i.total || i.amount || 0), 0);
            const expense = filteredExpenses
                .filter((e) => (e.referenceType || "general") === div)
                .reduce((s, e) => s + parseFloat(e.amount || 0), 0);
            return {
                name: div === "contracting" ? "Contracting" : div === "trading" ? "Trading" : div === "business" ? "Business" : "General",
                Income: income,
                Expenses: expense,
                Profit: income - expense,
                fill: DIVISION_COLORS[div],
            };
        });
    }, [filteredInvoices, filteredExpenses]);

    // Day-wise data for current month
    const dayWiseData = useMemo(() => {
        const targetMonth = filterMonth !== "all" ? filterMonth : new Date().getMonth();
        const daysInMonth = new Date(filterYear, targetMonth + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayStr = `${day}`;
            const dayIncome = invoices
                .filter((inv) => {
                    const d = new Date(inv.date);
                    return d.getFullYear() === filterYear && d.getMonth() === targetMonth && d.getDate() === day &&
                        (filterDivision === "all" || (inv.branch || "").toLowerCase() === filterDivision);
                })
                .reduce((s, inv) => s + parseFloat(inv.total || inv.amount || 0), 0);
            const dayExpense = expenses
                .filter((exp) => {
                    const d = new Date(exp.date);
                    return d.getFullYear() === filterYear && d.getMonth() === targetMonth && d.getDate() === day &&
                        (filterDivision === "all" || (exp.referenceType || "general") === filterDivision);
                })
                .reduce((s, exp) => s + parseFloat(exp.amount || 0), 0);
            return { name: dayStr, Income: dayIncome, Expenses: dayExpense };
        });
    }, [invoices, expenses, filterYear, filterMonth, filterDivision]);

    // Expense category breakdown
    const categoryPieData = useMemo(() => {
        const catMap: Record<string, number> = {};
        filteredExpenses.forEach((e) => {
            const cat = e.category || "Uncategorized";
            catMap[cat] = (catMap[cat] || 0) + parseFloat(e.amount || 0);
        });
        return Object.entries(catMap).map(([name, value]) => ({ name, value }));
    }, [filteredExpenses]);

    const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e", "#06b6d4", "#ec4899", "#84cc16"];

    const tabs = [
        { id: "daily", label: "Daily Report" },
        { id: "monthly", label: "Monthly Report" },
        { id: "division", label: "Division-wise" },
        { id: "income-expense", label: "Income vs Expense" },
        { id: "pnl", label: "Profit & Loss" },
    ];

    const fmtQAR = (v: number) => `QAR ${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <div className="p-6 space-y-6 pb-12">
            <PageHeader title="Financial Reports" subtitle="Comprehensive financial analytics across all divisions" />

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <Filter size={16} className="text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filters</span>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-500 font-medium">Year</label>
                        <select value={filterYear} onChange={(e) => setFilterYear(Number(e.target.value))} className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                            {[2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-500 font-medium">Month</label>
                        <select value={filterMonth === "all" ? "all" : filterMonth} onChange={(e) => setFilterMonth(e.target.value === "all" ? "all" : Number(e.target.value))} className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white min-w-[120px]">
                            <option value="all">All Months</option>
                            {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-500 font-medium">Division</label>
                        <select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white min-w-[150px]">
                            <option value="all">All Divisions</option>
                            <option value="contracting">Contracting</option>
                            <option value="trading">Trading</option>
                            <option value="business">Business</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-500 font-medium">From</label>
                        <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-500 font-medium">To</label>
                        <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div className="flex items-end">
                        <button onClick={() => { setFilterMonth("all"); setFilterDivision("all"); setFilterDateFrom(""); setFilterDateTo(""); }}
                            className="text-sm text-brand-600 hover:text-brand-800 font-medium px-3 py-2 rounded-lg hover:bg-brand-50 transition">
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 gap-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${activeTab === tab.id ? "text-brand-600" : "text-slate-500 hover:text-slate-700"}`}>
                        {tab.label}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />}
                    </button>
                ))}
            </div>



            {/* ───── DAILY REPORT TAB ───── */}
            {activeTab === "daily" && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Day-wise Report</h3>
                        <p className="text-sm text-slate-400 mb-6">{filterMonth !== "all" ? MONTHS[filterMonth as number] : MONTHS[new Date().getMonth()]} {filterYear}</p>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dayWiseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} formatter={(v: any) => fmtQAR(v)} />
                                    <Legend iconType="circle" />
                                    <Area type="monotone" dataKey="Income" stroke="#10B981" fill="url(#colorIncome)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="Expenses" stroke="#F43F5E" fill="url(#colorExpense)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Daily table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Daily Breakdown</h3>
                        </div>
                        <div className="overflow-x-auto max-h-[400px]">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3">Day</th>
                                        <th className="px-6 py-3 text-right">Income</th>
                                        <th className="px-6 py-3 text-right">Expenses</th>
                                        <th className="px-6 py-3 text-right">Net</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {dayWiseData.filter((d) => d.Income > 0 || d.Expenses > 0).map((d, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 font-medium text-gray-700">Day {d.name}</td>
                                            <td className="px-6 py-3 text-right text-emerald-600 font-semibold">{d.Income > 0 ? fmtQAR(d.Income) : "-"}</td>
                                            <td className="px-6 py-3 text-right text-rose-500 font-semibold">{d.Expenses > 0 ? fmtQAR(d.Expenses) : "-"}</td>
                                            <td className={`px-6 py-3 text-right font-bold ${(d.Income - d.Expenses) >= 0 ? "text-emerald-700" : "text-rose-600"}`}>{fmtQAR(d.Income - d.Expenses)}</td>
                                        </tr>
                                    ))}
                                    {dayWiseData.filter((d) => d.Income > 0 || d.Expenses > 0).length === 0 && (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">No transactions for this period.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ───── MONTHLY REPORT TAB ───── */}
            {activeTab === "monthly" && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Profit Trend ({filterYear})</h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} formatter={(v: any) => fmtQAR(v)} />
                                    <Legend iconType="circle" />
                                    <Line type="monotone" dataKey="Income" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="Expenses" stroke="#F43F5E" strokeWidth={3} dot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="Profit" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Monthly Summary Table</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">Month</th>
                                        <th className="px-6 py-3 text-right">Income</th>
                                        <th className="px-6 py-3 text-right">Expenses</th>
                                        <th className="px-6 py-3 text-right">Profit / Loss</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {monthlyData.map((d, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 font-medium text-gray-700">{d.name}</td>
                                            <td className="px-6 py-3 text-right text-emerald-600 font-semibold">{fmtQAR(d.Income)}</td>
                                            <td className="px-6 py-3 text-right text-rose-500 font-semibold">{fmtQAR(d.Expenses)}</td>
                                            <td className={`px-6 py-3 text-right font-bold ${d.Profit >= 0 ? "text-emerald-700" : "text-rose-600"}`}>{fmtQAR(d.Profit)}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-slate-50 font-bold text-base">
                                        <td className="px-6 py-4">Total</td>
                                        <td className="px-6 py-4 text-right text-emerald-700">{fmtQAR(monthlyData.reduce((s, d) => s + d.Income, 0))}</td>
                                        <td className="px-6 py-4 text-right text-rose-600">{fmtQAR(monthlyData.reduce((s, d) => s + d.Expenses, 0))}</td>
                                        <td className="px-6 py-4 text-right text-brand-700">{fmtQAR(monthlyData.reduce((s, d) => s + d.Profit, 0))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ───── DIVISION-WISE TAB ───── */}
            {activeTab === "division" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Division Income Breakdown</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={divisionData.filter((d) => d.Income > 0)} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="Income">
                                            {divisionData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                                        </Pie>
                                        <Tooltip formatter={(v: any) => fmtQAR(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                        <Legend iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Division Expense Breakdown</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={divisionData.filter((d) => d.Expenses > 0)} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="Expenses">
                                            {divisionData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                                        </Pie>
                                        <Tooltip formatter={(v: any) => fmtQAR(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                        <Legend iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Division comparison bar chart */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Division Comparison</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={divisionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={(v: any) => fmtQAR(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="Income" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                    <Bar dataKey="Expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                    <Bar dataKey="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Division Detail Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50"><h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Division Financial Summary</h3></div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                <tr><th className="px-6 py-3">Division</th><th className="px-6 py-3 text-right">Income</th><th className="px-6 py-3 text-right">Expenses</th><th className="px-6 py-3 text-right">Profit/Loss</th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {divisionData.map((d, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-700 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }}></span>{d.name}</td>
                                        <td className="px-6 py-3 text-right text-emerald-600 font-semibold">{fmtQAR(d.Income)}</td>
                                        <td className="px-6 py-3 text-right text-rose-500 font-semibold">{fmtQAR(d.Expenses)}</td>
                                        <td className={`px-6 py-3 text-right font-bold ${d.Profit >= 0 ? "text-emerald-700" : "text-rose-600"}`}>{fmtQAR(d.Profit)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ───── INCOME VS EXPENSE TAB ───── */}
            {activeTab === "income-expense" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard title="Total Income" value={fmtQAR(totalIncome)} icon={<TrendingUp size={20} />} />
                        <StatCard title="Total Expenses" value={fmtQAR(totalExpense)} icon={<TrendingDown size={20} />} />
                    </div>

                    {/* Expense by category pie */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Expense by Category</h3>
                            <div className="h-[300px] w-full">
                                {categoryPieData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                                {categoryPieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip formatter={(v: any) => fmtQAR(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">No expense data</div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Income vs Expense Trend</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id="colorInc2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10B981" stopOpacity={0} /></linearGradient>
                                            <linearGradient id="colorExp2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} /><stop offset="95%" stopColor="#F43F5E" stopOpacity={0} /></linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                        <Tooltip formatter={(v: any) => fmtQAR(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                        <Legend iconType="circle" />
                                        <Area type="monotone" dataKey="Income" stroke="#10B981" fill="url(#colorInc2)" strokeWidth={2} />
                                        <Area type="monotone" dataKey="Expenses" stroke="#F43F5E" fill="url(#colorExp2)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Detailed transaction list */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50"><h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Recent Transactions</h3></div>
                        <div className="overflow-x-auto max-h-[350px]">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold sticky top-0">
                                    <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Type</th><th className="px-6 py-3">Description</th><th className="px-6 py-3 text-right">Amount</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        ...filteredInvoices.map((i) => ({ date: i.date, type: "Income", desc: `Invoice ${i.invoiceNo} - ${i.client}`, amount: parseFloat(i.total || i.amount || 0) })),
                                        ...filteredExpenses.map((e) => ({ date: e.date, type: "Expense", desc: e.expenseName || e.description || e.category, amount: -parseFloat(e.amount || 0) })),
                                    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((t, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 text-gray-500">{t.date}</td>
                                            <td className="px-6 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.type === "Income" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{t.type}</span></td>
                                            <td className="px-6 py-3 font-medium text-gray-700">{t.desc}</td>
                                            <td className={`px-6 py-3 text-right font-bold ${t.amount >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{fmtQAR(Math.abs(t.amount))}</td>
                                        </tr>
                                    ))}
                                    {filteredInvoices.length === 0 && filteredExpenses.length === 0 && (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">No transactions for this period.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ───── PROFIT & LOSS TAB ───── */}
            {activeTab === "pnl" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={64} className="text-emerald-500" /></div>
                            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">{fmtQAR(totalIncome)}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingDown size={64} className="text-rose-500" /></div>
                            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Expenses</p>
                            <p className="text-3xl font-bold text-gray-900">{fmtQAR(totalExpense)}</p>
                        </div>
                        <div className={`p-6 rounded-2xl shadow-lg relative overflow-hidden text-white ${netProfit >= 0 ? "bg-brand-600" : "bg-rose-600"}`}>
                            <div className="absolute top-0 right-0 p-4 opacity-20"><DollarSign size={64} /></div>
                            <p className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">Net {netProfit >= 0 ? "Profit" : "Loss"}</p>
                            <p className="text-3xl font-bold">{fmtQAR(Math.abs(netProfit))}</p>
                            <p className="text-xs opacity-60 mt-1">{totalIncome > 0 ? `${((netProfit / totalIncome) * 100).toFixed(1)}% margin` : ""}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue vs Expenses ({filterYear})</h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={(v: any) => fmtQAR(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                    <Bar dataKey="Income" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={50} name="Revenue" />
                                    <Bar dataKey="Expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100"><h3 className="text-lg font-bold text-gray-800">Financial Breakdown</h3></div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                <tr><th className="px-6 py-4">Category</th><th className="px-6 py-4 text-right">Amount (QAR)</th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">Total Revenue (Invoices)</td><td className="px-6 py-4 text-right text-emerald-600 font-bold">{fmtQAR(totalIncome)}</td></tr>
                                {categoryPieData.map((cat, i) => (
                                    <tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-600 pl-10">— {cat.name}</td><td className="px-6 py-4 text-right text-rose-500 font-medium">{fmtQAR(cat.value)}</td></tr>
                                ))}
                                <tr className="hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">Total Expenses</td><td className="px-6 py-4 text-right text-rose-600 font-bold">{fmtQAR(totalExpense)}</td></tr>
                                <tr className="bg-gray-50/50"><td className="px-6 py-5 font-bold text-gray-900 text-base">Net {netProfit >= 0 ? "Profit" : "Loss"}</td><td className={`px-6 py-5 text-right font-black text-lg ${netProfit >= 0 ? "text-brand-600" : "text-rose-600"}`}>{fmtQAR(Math.abs(netProfit))}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FinancialReports;
