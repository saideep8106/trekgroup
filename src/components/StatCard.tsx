import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
}

function StatCard({ title, value, icon, trend }: Props) {
  return (
    <div className="card-hover p-5 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            {value}
          </p>
          {trend && (
            <p
              className={`text-xs font-medium flex items-center gap-1 ${
                trend.positive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <span>{trend.positive ? "↑" : "↓"}</span>
              {trend.value}
            </p>
          )}
        </div>

        <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-100 transition-colors duration-200">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;