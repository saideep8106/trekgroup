import { Search, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Notifications from "./Notifications";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="print:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
      {/* ─── Search Bar ────────────────────────────────── */}
      <div className="flex items-center bg-surface-muted border border-gray-100 px-4 py-2.5 rounded-xl w-80 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-50 transition-all">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none px-3 text-sm w-full text-gray-700 placeholder:text-gray-400"
        />
        <kbd className="hidden sm:inline text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* ─── Right Section ─────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Notifications />

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-muted transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-800 leading-tight">
                {user?.name || "Guest"}
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide leading-tight font-medium">
                {user?.role?.replace(/_/g, " ") || ""}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-xl animate-slide-down z-50">
              <div className="p-4 border-b border-gray-100/50">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-surface-muted transition-colors cursor-pointer">
                  <UserCircle size={16} />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;