import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLE_DASHBOARD_MAP } from "../../types/user";
import type { Role } from "../../types/user";
import { LogIn, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Already logged in → redirect to dashboard
  if (isAuthenticated && user) {
    return <Navigate to={ROLE_DASHBOARD_MAP[user.role]} replace />;
  }

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Credential-based role assignment
    let assignedRole: Role | null = null;
    let userName = "Demo User";

    if (email === "admin@trekgroup.com" && password === "password") {
      assignedRole = "SUPER_ADMIN";
      userName = "Admin User";
    } else if (email === "accounts@trekgroup.com" && password === "password") {
      assignedRole = "ACCOUNTS";
      userName = "Accounts User";
    } else if (email === "pm@trekgroup.com" && password === "password") {
      assignedRole = "PROJECT_MANAGER";
      userName = "PM User";
    } else if (email === "client@trekgroup.com" && password === "password") {
      assignedRole = "CLIENT";
      userName = "Client User";
    }

    if (!assignedRole) {
      setError("Invalid email or password for any known role");
      return;
    }

    const userData = {
      id: "1",
      name: userName,
      email,
      role: assignedRole,
      token: "demo-token",
    };

    login(userData);
    navigate(ROLE_DASHBOARD_MAP[assignedRole], { replace: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* ─── Left Panel (Branding) ───────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 relative items-center justify-center p-12">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-white max-w-md"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl font-bold mb-8 ring-1 ring-white/20">
            T
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            TrekGroup
            <br />
            <span className="text-brand-200">ERP System</span>
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed">
            Streamline your operations with our enterprise resource planning
            solution. Manage projects, finances, and clients — all in one place.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex -space-x-2">
              {["bg-emerald-400", "bg-amber-400", "bg-rose-400", "bg-cyan-400"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} ring-2 ring-brand-700`} />
              ))}
            </div>
            <p className="text-brand-300 text-sm">
              Used by 50+ businesses
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── Right Panel (Form) ──────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-surface-muted p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px]"
          onKeyDown={handleKeyDown}
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg mx-auto shadow-lg shadow-brand-500/30">
              T
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-float p-8 border border-gray-100">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your account to continue
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="label" htmlFor="login-email">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  className="input pl-10"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="label" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  className="input pl-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              onClick={handleLogin}
              className="w-full btn-primary justify-center py-3 text-base shadow-lg shadow-brand-500/25"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 TrekGroup. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}