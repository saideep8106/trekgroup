import { Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";

// Auth / Public pages
import Landing from "../pages/common/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Unauthorized from "../pages/common/Unauthorized";

// Route guard
import ProtectedRoute from "./ProtectedRoute";

// Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AccountsDashboard from "../pages/accounts/AccountsDashboard";
import PMDashboard from "../pages/pm/PMDashboard";
import Users from "../pages/admin/Users";
import CreateUser from "../pages/admin/CreateUser";
import Roles from "../pages/admin/Roles";
import Permissions from "../pages/admin/Permissions";
import EditUser from "../pages/admin/EditUser";

import Projects from "../pages/pm/Projects";
import CreateProject from "../pages/pm/CreateProject";
import EditProject from "../pages/pm/EditProject";
import Jobs from "../pages/pm/Jobs";
import CreateJob from "../pages/pm/CreateJob";
import JobDetails from "../pages/pm/JobDetails";
import JobDocuments from "../pages/pm/JobDocuments";

import Clients from "../pages/admin/Clients";
import CreateClient from "../pages/admin/CreateClient";
import ClientDetails from "../pages/admin/ClientDetails";

import BOQ from "../pages/pm/BOQ";
import CreateBOQ from "../pages/pm/CreateBOQ";
import BOQDetails from "../pages/pm/BOQDetails";
import Quotations from "../pages/pm/Quotations";
import CreateQuotation from "../pages/pm/CreateQuotation";
import QuotationDetails from "../pages/pm/QuotationDetails";

import Proposals from "../pages/admin/Proposals";
import CreateProposal from "../pages/admin/CreateProposal";
import ProposalDetails from "../pages/admin/ProposalDetails";

import Invoices from "../pages/accounts/Invoices";
import CreateInvoice from "../pages/accounts/CreateInvoice";
import InvoiceDetails from "../pages/accounts/InvoiceDetails";
import Payments from "../pages/accounts/Payments";
import Expenses from "../pages/accounts/Expenses";
import CreateExpense from "../pages/accounts/CreateExpense";
import ChartOfAccounts from "../pages/accounts/ChartOfAccounts";
import CreateAccount from "../pages/accounts/CreateAccount";
import ProfitLoss from "../pages/accounts/ProfitLoss";
import BalanceSheet from "../pages/accounts/BalanceSheet";
import Receipts from "../pages/accounts/Receipts";

import Products from "../pages/inventory/Products";
import CreateProduct from "../pages/inventory/CreateProduct";
import InventoryDashboard from "../pages/inventory/InventoryDashboard";
import InventoryMovements from "../pages/inventory/InventoryMovements";
import CreateStockMovement from "../pages/inventory/CreateStockMovement";

import ClientDashboard from "../pages/client_portal/ClientDashboard";
import ClientJobs from "../pages/client_portal/ClientJobs";
import ClientInvoices from "../pages/client_portal/ClientInvoices";
import ClientProposals from "../pages/client_portal/ClientProposals";

import LowStock from "../pages/inventory/LowStock";
import ProfitReport from "../pages/inventory/ProfitReport";
import PurchaseOrders from "../pages/inventory/PurchaseOrders";
import SalesOrders from "../pages/inventory/SalesOrders";

import { useAuth } from "../context/AuthContext";
import { ROLE_DASHBOARD_MAP } from "../types/user";
import { Navigate } from "react-router-dom";

function DashboardRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_DASHBOARD_MAP[user.role]} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ─── Public Routes ─────────────────────────────── */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* ─── Protected: SUPER_ADMIN ────────────────────── */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/client-details/:id" element={<ClientDetails />} />

          <Route path="/proposal-templates" element={<Proposals filter="Templates" />} />

          {/* Inventory / Trading */}
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route
            path="/inventory-movements"
            element={<InventoryMovements />}
          />
          <Route
            path="/create-stock-movement"
            element={<CreateStockMovement />}
          />
          <Route path="/inventory/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/inventory/sales-orders" element={<SalesOrders />} />
          <Route path="/inventory/profit-report" element={<ProfitReport />} />
          <Route path="/inventory/low-stock" element={<LowStock />} />
        </Route>
      </Route>

      {/* ─── Protected: ACCOUNTS ─────────── */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ACCOUNTS"]} />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route path="/accounts/dashboard" element={<AccountsDashboard />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/create-expense" element={<CreateExpense />} />
          <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
          <Route path="/receipts" element={<Receipts />} />
        </Route>
      </Route>

      {/* ─── Protected: PROJECT_MANAGER ──── */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["SUPER_ADMIN", "PROJECT_MANAGER"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route path="/pm/dashboard" element={<PMDashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="/boq" element={<BOQ />} />
          <Route path="/create-boq" element={<CreateBOQ />} />
          <Route path="/boq-details/:id" element={<BOQDetails />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/create-quotation" element={<CreateQuotation />} />
          <Route path="/quotation-details/:id" element={<QuotationDetails />} />

          {/* Proposals (Shared Admin/PM) */}
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/create-proposal" element={<CreateProposal />} />
          <Route path="/edit-proposal/:id" element={<CreateProposal />} />
          <Route path="/draft-proposals" element={<Proposals filter="Draft" />} />
        </Route>
      </Route>

      {/* ─── Protected: CLIENT ─────────────────────────── */}
      <Route
        element={<ProtectedRoute allowedRoles={["CLIENT"]} />}
      >
        <Route element={<DashboardLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/jobs" element={<ClientJobs />} />
          <Route path="/client/invoices" element={<ClientInvoices />} />
          <Route path="/client/proposals" element={<ClientProposals />} />
        </Route>
      </Route>



      {/* ─── Shared: SUPER_ADMIN, PROJECT_MANAGER & ACCOUNTS ─── */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["SUPER_ADMIN", "PROJECT_MANAGER", "ACCOUNTS"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
        </Route>
      </Route>

      {/* ─── Shared Protected Routes ──────────── */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["SUPER_ADMIN", "PROJECT_MANAGER", "ACCOUNTS", "CLIENT"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route path="/job-documents" element={<JobDocuments />} />
          <Route path="/proposal-details/:id" element={<ProposalDetails />} />
          <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;