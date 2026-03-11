import PageHeader from "../../components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

function ProfitLoss() {
  const data = [
    { name: 'Jan', Revenue: 15000, Expenses: 8000 },
    { name: 'Feb', Revenue: 20000, Expenses: 12000 },
    { name: 'Mar', Revenue: 15000, Expenses: 0 }, // For the current month
  ];

  const totalRevenue = 50000;
  const totalExpenses = 20000;
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Profit & Loss Report" subtitle="Track company revenue and expenses over time" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={64} className="text-emerald-500" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">QAR {totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingDown size={64} className="text-rose-500" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Total Expenses</p>
          <p className="text-3xl font-bold text-gray-900">QAR {totalExpenses.toLocaleString()}</p>
        </div>

        <div className="bg-brand-600 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow text-white">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <DollarSign size={64} />
          </div>
          <p className="text-sm font-medium text-brand-100 mb-2 uppercase tracking-wider">Net Profit</p>
          <p className="text-3xl font-bold">QAR {netProfit.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue vs Expenses (Q1 2026)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} tickFormatter={(value) => `QAR ${value}`} />
              <Tooltip
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Bar dataKey="Revenue" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={60} />
              <Bar dataKey="Expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Financial Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Amount (QAR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Total Revenue</td>
                <td className="px-6 py-4 text-right text-emerald-600 font-bold">50,000</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Cost of Goods Sold (COGS)</td>
                <td className="px-6 py-4 text-right text-rose-600 font-medium">12,000</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">Operating Expenses</td>
                <td className="px-6 py-4 text-right text-rose-600 font-medium">8,000</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-6 py-5 font-bold text-gray-900 text-base">Net Profit</td>
                <td className="px-6 py-5 text-right text-brand-600 font-black text-lg">30,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProfitLoss;