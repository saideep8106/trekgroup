import ClientLayout from "../../layouts/ClientLayout";
import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";
import { Briefcase, FileText, CreditCard, Clock, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const projectProgress = [
  { week: "W1", progress: 20 },
  { week: "W2", progress: 45 },
  { week: "W3", progress: 60 },
  { week: "W4", progress: 85 },
];

const activityMoments = [
  { action: "Invoice Ready", detail: "INV-202 for Villa A-21", time: "2 hrs ago", type: "success" },
  { action: "Job Update", detail: "Installation started at Villa A-21", time: "5 hrs ago", type: "info" },
  { action: "Document Shared", detail: "Warranty papers uploaded", time: "1 day ago", type: "info" },
];

function ClientDashboard() {
  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Client Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your projects, jobs, and invoices in real-time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/client/jobs">
            <StatCard
              title="Pending Jobs"
              value="3"
              icon={<Briefcase size={20} className="text-brand-500" />}
            />
          </Link>
          <Link to="/client/invoices">
            <StatCard
              title="Paid Invoices"
              value="5"
              icon={<FileText size={20} className="text-emerald-500" />}
            />
          </Link>
          <Link to="/client/invoices">
            <StatCard
              title="Outstanding Balance"
              value="QAR 4,500"
              icon={<CreditCard size={20} className="text-rose-500" />}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Overall Project Progress" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={projectProgress}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
                <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={3} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="card-hover p-6 border border-gray-100 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-gray-800">Activity Moments</h2>
              <Clock size={16} className="text-gray-400" />
            </div>
            <ul className="space-y-5">
              {activityMoments.map((moment, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${moment.type === 'success' ? 'bg-emerald-500' : 'bg-brand-500'
                    }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 tracking-tight">
                      {moment.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {moment.detail}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium italic">
                      {moment.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-5 border-t border-gray-50 text-center">
              <Link to="/job-documents" className="text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors inline-flex items-center gap-2">
                <Terminal size={14} /> View All Documents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}

export default ClientDashboard;