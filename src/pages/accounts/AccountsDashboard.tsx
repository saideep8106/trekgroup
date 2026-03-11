import StatCard from "../../components/StatCard";
import { Banknote, TrendingUp, CreditCard } from "lucide-react";
import ChartCard from "../../components/ChartCard";
import StatusBadge from "../../components/StatusBadge";
import { useActivity, formatTimeAgo } from "../../context/ActivityContext";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area,
} from "recharts";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const financialData = [
    { month: "Jan", receivables: 4000, payables: 2400 },
    { month: "Feb", receivables: 3000, payables: 1398 },
    { month: "Mar", receivables: 5000, payables: 3800 },
    { month: "Apr", receivables: 4500, payables: 3908 },
    { month: "May", receivables: 6000, payables: 4800 },
    { month: "Jun", receivables: 5800, payables: 3800 },
];

const recentTransactions = [
    { id: "PAY-001", client: "ABC Company", amount: "QAR 1,200", type: "Payment", status: "Paid", path: "/payments" },
    { id: "EXP-042", vendor: "Material Supply Co", amount: "QAR 2,500", type: "Expense", status: "Pending", path: "/expenses" },
    { id: "INV-103", client: "TechCorp", amount: "QAR 3,400", type: "Invoice", status: "Overdue", path: "/invoices" },
];

export default function AccountsDashboard() {
    const { activities } = useActivity();
    const financialMoments = activities.filter(a => a.category === 'finance').slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Financial Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage accounts, invoices, and payments.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/create-invoice" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Plus size={16} /> Create Invoice
                    </Link>
                    <Link to="/create-expense" className="bg-white border hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        File Expense
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Link to="/invoices">
                    <StatCard
                        title="Total Receivables"
                        value="QAR 12,400"
                        icon={<Banknote size={20} className="text-emerald-500" />}
                        trend={{ value: "12% from last month", positive: true }}
                    />
                </Link>
                <Link to="/expenses">
                    <StatCard
                        title="Total Payables"
                        value="QAR 4,800"
                        icon={<Banknote size={20} className="text-rose-500" />}
                        trend={{ value: "3% from last month", positive: false }}
                    />
                </Link>
                <Link to="/payments">
                    <StatCard
                        title="Pending Payments"
                        value="QAR 2,150"
                        icon={<CreditCard size={20} className="text-amber-500" />}
                        trend={{ value: "Stable this week", positive: true }}
                    />
                </Link>
                <Link to="/profit-loss">
                    <StatCard
                        title="Profit Margin"
                        value="24.5%"
                        icon={<TrendingUp size={20} className="text-brand-500" />}
                        trend={{ value: "+2% increase", positive: true }}
                    />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <ChartCard title="Revenue vs Expenses" className="lg:col-span-2">
                    <div className="flex justify-end mb-2 -mt-8">
                        <Link to="/profit-loss" className="text-[10px] text-brand-600 font-medium hover:underline">Full Report</Link>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={financialData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="receivables" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                            <Area type="monotone" dataKey="payables" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <div className="card-hover p-5 border border-gray-100 bg-white rounded-xl flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Financial Moments</h2>
                        <CreditCard size={16} className="text-gray-400" />
                    </div>

                    {financialMoments.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4 flex-1">No recent financial moments.</p>
                    ) : (
                        <ul className="space-y-4 flex-1">
                            {financialMoments.map((moment, i) => (
                                <Link key={i} to={moment.path} className="block group">
                                    <li className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-emerald-500" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-700 group-hover:text-brand-600 transition-colors">
                                                <span className="font-semibold">{moment.action}</span>
                                                {moment.subject && `: ${moment.subject}`}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{formatTimeAgo(moment.time)} by {moment.performingUser}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}

                    <Link to="/payments" className="block text-center mt-6 text-xs text-brand-600 font-medium hover:underline">
                        View All Activity
                    </Link>
                </div>
            </div>

            <div className="card-hover p-5 border border-gray-100 bg-white rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-800">Recent Financial Activity</h2>
                    <Link to="/invoices" className="text-xs text-brand-600 font-medium hover:underline">Manage All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Ref ID</th>
                                <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Entity</th>
                                <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-brand-50/30 transition-colors group cursor-pointer" onClick={() => window.location.href = tx.path}>
                                    <td className="py-3 font-medium text-brand-600 group-hover:underline">{tx.id}</td>
                                    <td className="py-3 text-gray-700">{tx.client || tx.vendor}</td>
                                    <td className="py-3 text-gray-600">{tx.type}</td>
                                    <td className="py-3 text-gray-700 font-medium">{tx.amount}</td>
                                    <td className="py-3"><StatusBadge status={tx.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
