import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-muted print:h-auto print:bg-white print:block">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden print:overflow-visible print:block">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 print:overflow-visible print:p-0 print:block">
          <div className="w-full h-full animate-fade-in print:h-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;