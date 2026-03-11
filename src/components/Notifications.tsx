import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications = [
    { message: "Job JOB-004 deadline tomorrow", type: "warning" as const, time: "2 min ago" },
    { message: "Invoice INV-002 overdue", type: "error" as const, time: "15 min ago" },
    { message: "Low stock: Aluminum Frame", type: "warning" as const, time: "1 hr ago" },
  ];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dotColor = {
    warning: "bg-amber-400",
    error: "bg-red-400",
    info: "bg-blue-400",
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-surface-muted transition-colors cursor-pointer"
      >
        <Bell size={20} className="text-gray-500" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-xl animate-slide-down z-50">
          <div className="px-4 py-3 border-b border-gray-100/50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              Notifications
            </h3>
            <span className="text-[10px] text-brand-600 font-medium bg-brand-50 px-2 py-0.5 rounded-full">
              {notifications.length} new
            </span>
          </div>

          <ul>
            {notifications.map((note, index) => (
              <li
                key={index}
                className="px-4 py-3 border-b border-gray-50 hover:bg-surface-muted transition-colors cursor-pointer last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor[note.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{note.message}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{note.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="px-4 py-2.5 border-t border-gray-100">
            <button className="text-xs text-brand-600 font-medium hover:text-brand-700 transition-colors cursor-pointer">
              View all notifications →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;