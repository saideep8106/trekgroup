import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  FileText,
  CreditCard,
  Folder,
  Briefcase,
  Package,
  BarChart3,
  ClipboardList,
  FileCheck,
  Receipt,
  AlertTriangle,
  BarChart2,
} from "lucide-react";
import type { Role } from "../types/user";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface SidebarSection {
  section: string;
  roles: Role[];
  items: SidebarItem[];
}

export const sidebarMenu: SidebarSection[] = [
  // ─── Dashboard (all roles) ───────────────────────────
  {
    section: "Overview",
    roles: ["SUPER_ADMIN", "ACCOUNTS", "PROJECT_MANAGER", "CLIENT"],
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },

  // ─── Super Admin ─────────────────────────────────────
  {
    section: "User Management",
    roles: ["SUPER_ADMIN"],
    items: [
      { label: "Users", path: "/users", icon: Users },
      { label: "Roles", path: "/roles", icon: Shield },
      { label: "Permissions", path: "/permissions", icon: Settings },
    ],
  },

  // ─── Projects (Super Admin + Project Manager) ────────
  {
    section: "Projects",
    roles: ["SUPER_ADMIN", "PROJECT_MANAGER"],
    items: [
      { label: "Projects", path: "/projects", icon: Folder },
      { label: "Jobs", path: "/jobs", icon: Briefcase },
    ],
  },

  // ─── Estimations & Sales (Consolidated) ────────────
  {
    section: "Estimations",
    roles: ["SUPER_ADMIN", "ACCOUNTS", "PROJECT_MANAGER"],
    items: [
      { label: "BOQ", path: "/boq", icon: ClipboardList },
      { label: "Business Services Proposal", path: "/quotations/business", icon: FileText },
      { label: "Trading Services", path: "/quotations/trading", icon: Package },
      { label: "Contracting Division", path: "/quotations/contracting", icon: FileCheck },
    ],
  },

  // ─── Clients ─────────────────────────────────────────

  // ─── Accounting (Super Admin + Accounts) ───────────────
  {
    section: "Accounting",
    roles: ["SUPER_ADMIN", "ACCOUNTS"],
    items: [
      { label: "Chart of Accounts", path: "/chart-of-accounts", icon: FileText },
      { label: "Payments", path: "/payments", icon: CreditCard },
      { label: "Expenses", path: "/expenses", icon: Receipt },
    ],
  },

  // ─── Reports (Super Admin + Accounts) ────────────────
  {
    section: "Reports",
    roles: ["SUPER_ADMIN", "ACCOUNTS", "PROJECT_MANAGER"],
    items: [
      { label: "Financial Reports", path: "/financial-reports", icon: BarChart2 },
    ],
  },

  // ─── Inventory / Trading (Super Admin) ───────────────
  {
    section: "Inventory",
    roles: ["SUPER_ADMIN"],
    items: [
      { label: "Inventory Dashboard", path: "/inventory", icon: Package },
      { label: "Products", path: "/products", icon: Package },
      { label: "Purchase Orders", path: "/inventory/purchase-orders", icon: Package },
      { label: "Sales Orders", path: "/inventory/sales-orders", icon: Package },
      { label: "Inventory Movements", path: "/inventory-movements", icon: Package },
      { label: "Profit Report", path: "/inventory/profit-report", icon: BarChart3 },
      { label: "Low Stock", path: "/inventory/low-stock", icon: AlertTriangle },
    ],
  },

  // ─── Client Portal ───────────────────────────────────
  {
    section: "My Portal",
    roles: ["CLIENT"],
    items: [
      { label: "My Jobs", path: "/client/jobs", icon: Briefcase },
      { label: "My Proposals", path: "/client/proposals", icon: FileText },
      { label: "My Invoices", path: "/client/invoices", icon: Receipt },
      { label: "Documents", path: "/job-documents", icon: Folder },
    ],
  },
];
