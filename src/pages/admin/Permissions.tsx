import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { sidebarMenu } from "../../config/sidebarMenu";
import { getDynamicPermissions, saveDynamicPermissions, type PermissionsData } from "../../utils/permissions";
import { Save, ShieldCheck } from "lucide-react";
import type { Role } from "../../types/user";

const ROLES: Role[] = ["SUPER_ADMIN", "ACCOUNTS", "PROJECT_MANAGER", "CLIENT"];

export default function Permissions() {
  const [permissions, setPermissions] = useState<PermissionsData>({});

  useEffect(() => {
    // Initialize permissions state from localStorage or defaults
    const saved = getDynamicPermissions();
    const initial: PermissionsData = {};

    sidebarMenu.forEach((section) => {
      initial[section.section] = saved[section.section] || section.roles;
    });

    setPermissions(initial);
  }, []);

  const handleToggle = (sectionName: string, role: Role) => {
    setPermissions((prev) => {
      const currentRoles = prev[sectionName] || [];
      const hasRole = currentRoles.includes(role);

      let newRoles;
      if (hasRole) {
        newRoles = currentRoles.filter((r) => r !== role);
      } else {
        newRoles = [...currentRoles, role];
      }

      return {
        ...prev,
        [sectionName]: newRoles,
      };
    });
  };

  const handleSave = () => {
    saveDynamicPermissions(permissions);

    // Create a toast notification (simulated with standard alert for now if no toast is available,
    // though the app uses generic windows alert in other places mostly).
    alert("Permissions updated successfully. Refresh your browser to see changes take effect in the sidebar if you changed your own role.");
  };

  return (
    <div className="p-6 pb-24 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title="Module Permissions"
          subtitle="Dynamically configure which roles have access to which sidebar modules."
        />
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-lg hover:bg-brand-700 transition shadow-lg shadow-brand-200 font-bold"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-700">Module / Section</th>
                {ROLES.map((role) => (
                  <th key={role} className="p-4 font-bold text-slate-700 text-center uppercase text-sm tracking-wider">
                    {role.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sidebarMenu.map((section, idx) => (
                <tr key={section.section} className={idx !== sidebarMenu.length - 1 ? "border-b border-slate-100" : ""}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="font-bold text-slate-800">{section.section}</span>
                    </div>
                  </td>
                  {ROLES.map((role) => {
                    const isChecked = permissions[section.section]?.includes(role) || false;

                    return (
                      <td key={role} className="p-4 text-center align-middle">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggle(section.section, role)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}