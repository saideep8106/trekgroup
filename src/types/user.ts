export type Role =
  | "SUPER_ADMIN"
  | "ACCOUNTS"
  | "PROJECT_MANAGER"
  | "CLIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}

/** Maps each role to its default dashboard path after login */
export const ROLE_DASHBOARD_MAP: Record<Role, string> = {
  SUPER_ADMIN: "/admin/dashboard",
  ACCOUNTS: "/accounts/dashboard",
  PROJECT_MANAGER: "/pm/dashboard",
  CLIENT: "/client/dashboard",
};