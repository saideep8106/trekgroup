import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  FileText,
  CreditCard,
  Folder,
  User,
  Briefcase,
  Package,
  BarChart3,
  ClipboardList,
  FileCheck,
  Receipt,
  AlertTriangle,
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

  // ─── BOQ & Quotations (Project Manager) ──────────────
  {
    section: "Estimations",
    roles: ["PROJECT_MANAGER"],
    items: [
      { label: "BOQ", path: "/boq", icon: ClipboardList },
      { label: "Quotations", path: "/quotations", icon: FileCheck },
    ],
  },

  // ─── Clients ─────────────────────────────────────────
  {
    section: "Clients",
    roles: ["SUPER_ADMIN"],
    items: [
      { label: "Clients", path: "/clients", icon: User },
    ],
  },

  // ─── Business Proposals ───────────────────────
  {
    section: "Business Proposals",
    roles: ["SUPER_ADMIN", "PROJECT_MANAGER"],
    items: [
      { label: "Proposal List", path: "/proposals", icon: FileText },
      { label: "Create Proposal", path: "/create-proposal", icon: ClipboardList },
      { label: "Draft Proposals", path: "/draft-proposals", icon: FileText },
    ],
  },

  // ─── Invoicing (Project Manager) ───────────────────────
  {
    section: "Invoicing",
    roles: ["PROJECT_MANAGER"],
    items: [
      { label: "Invoices", path: "/invoices", icon: Receipt },
      { label: "Create Invoice", path: "/create-invoice", icon: ClipboardList },
    ],
  },

  // ─── Accounting (Super Admin + Accounts) ───────────────
  {
    section: "Accounting",
    roles: ["SUPER_ADMIN", "ACCOUNTS"],
    items: [
      { label: "Chart of Accounts", path: "/chart-of-accounts", icon: FileText },
      { label: "Invoices", path: "/invoices", icon: Receipt },
      { label: "Payments", path: "/payments", icon: CreditCard },
      { label: "Expenses", path: "/expenses", icon: Receipt },
    ],
  },

  // ─── Reports (Super Admin + Accounts) ────────────────
  {
    section: "Reports",
    roles: ["SUPER_ADMIN", "ACCOUNTS"],
    items: [
      { label: "Profit & Loss", path: "/profit-loss", icon: BarChart3 },
      { label: "Balance Sheet", path: "/balance-sheet", icon: FileText },
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
