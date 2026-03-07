import StatCard from "../../components/StatCard";
import { Folder, Banknote, Clock, TrendingUp } from "lucide-react";
import ChartCard from "../../components/ChartCard";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useActivity, formatTimeAgo } from "../../context/ActivityContext";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    AreaChart,
    Area,
} from "recharts";
import { Link } from "react-router-dom";

const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 5800 },
];

const projectData = [
    { name: "Completed", value: 6 },
    { name: "Ongoing", value: 3 },
    { name: "Pending", value: 2 },
];

const COLORS = ["#10b981", "#6366f1", "#f59e0b"];

const recentInvoices = [
    { id: "INV-001", client: "ABC Company", amount: "QAR 1,200", status: "Paid", path: "/invoices" },
    { id: "INV-002", client: "XYZ Ltd", amount: "QAR 900", status: "Pending", path: "/invoices" },
    { id: "INV-003", client: "TechCorp", amount: "QAR 3,400", status: "Overdue", path: "/invoices" },
];

const roleOverview = [
    { name: "Super Admin", users: 1, createdDate: "2026-01-01", updatedDate: "2026-03-01", path: "/roles" },
    { name: "Accounts", users: 2, createdDate: "2026-01-10", updatedDate: "2026-03-05", path: "/roles" },
    { name: "Project Manager", users: 3, createdDate: "2026-01-15", updatedDate: "2026-03-06", path: "/roles" },
];

export default function AdminDashboard() {
    useAuth();
    const { activities } = useActivity();

    // Filter activities
    const roleMoments = activities.filter(a => a.category === 'role').slice(0, 4);
    const recentActivity = activities.slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Super Admin Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Full system overview and management.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/create-user" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        + New User
                    </Link>
                    <Link to="/create-client" className="bg-white border hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        Add Client
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
                <Link to="/projects">
                    <StatCard
                        title="Active Projects"
                        value="8"
                        icon={<Folder size={20} className="text-brand-500" />}
                        trend={{ value: "2 new this week", positive: true }}
                    />
                </Link>
                <Link to="/jobs">
                    <StatCard
                        title="Pending Jobs"
                        value="4"
                        icon={<Clock size={20} className="text-amber-500" />}
                        trend={{ value: "1 overdue", positive: false }}
                    />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ChartCard title="Revenue Trend">
                    <div className="flex justify-end mb-2 -mt-8">
                        <Link to="/profit-loss" className="text-[10px] text-brand-600 font-medium hover:underline">View Full Report</Link>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
                                    fontSize: "13px",
                                }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Project Status">
                    <div className="flex justify-end mb-2 -mt-8">
                        <Link to="/projects" className="text-[10px] text-brand-600 font-medium hover:underline">Manage Projects</Link>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={projectData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={100}
                                paddingAngle={4}
                                strokeWidth={0}
                            >
                                {projectData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
                                    fontSize: "13px",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center gap-6 -mt-4">
                        {projectData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                <span className="text-xs text-gray-500 font-medium">
                                    {entry.name} ({entry.value})
                                </span>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="card-hover p-5 border border-gray-100 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Role Moments</h2>
                        <Clock size={16} className="text-gray-400" />
                    </div>
                    {roleMoments.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">No recent role moments.</p>
                    ) : (
                        <ul className="space-y-3">
                            {roleMoments.map((item, i) => (
                                <Link key={i} to={item.path} className="block group">
                                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-700 group-hover:text-brand-600 transition-colors">
                                                <span className="font-medium">{item.action}</span>
                                                {item.subject && <> for <span className="text-brand-600 underline underline-offset-4 decoration-brand-100 group-hover:decoration-brand-500">{item.subject}</span></>}
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{formatTimeAgo(item.time)} by {item.performingUser}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="card-hover p-5 lg:col-span-2 border border-gray-100 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Role Overview</h2>
                        <Link to="/roles" className="text-xs text-brand-600 font-medium hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role Name</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Users</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {roleOverview.map((role) => (
                                    <tr key={role.name} className="hover:bg-brand-50/30 transition-colors group cursor-pointer" onClick={() => window.location.href = role.path}>
                                        <td className="py-3 font-medium text-gray-800 group-hover:text-brand-600">{role.name}</td>
                                        <td className="py-3 text-gray-700">{role.users}</td>
                                        <td className="py-3 text-gray-600 text-xs">{role.createdDate}</td>
                                        <td className="py-3 text-gray-600 text-xs">{role.updatedDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="card-hover p-5 border border-gray-100 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Recent Activity</h2>
                        <TrendingUp size={16} className="text-gray-400" />
                    </div>
                    {recentActivity.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">No recent activity recorded.</p>
                    ) : (
                        <ul className="space-y-3">
                            {recentActivity.map((item, i) => (
                                <Link key={i} to={item.path} className="block group">
                                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-700 group-hover:text-brand-600 transition-colors">
                                                {item.action} {item.subject && <span className="font-medium text-gray-900">- {item.subject}</span>}
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{formatTimeAgo(item.time)} by {item.performingUser}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="card-hover p-5 lg:col-span-2 border border-gray-100 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Recent Invoices</h2>
                        <Link to="/invoices" className="text-xs text-brand-600 font-medium hover:underline">Manage Invoices</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-brand-50/30 transition-colors group cursor-pointer" onClick={() => window.location.href = inv.path}>
                                        <td className="py-3 font-medium text-brand-600 group-hover:underline underline-offset-4">{inv.id}</td>
                                        <td className="py-3 text-gray-700">{inv.client}</td>
                                        <td className="py-3 text-gray-700 font-medium">{inv.amount}</td>
                                        <td className="py-3"><StatusBadge status={inv.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
