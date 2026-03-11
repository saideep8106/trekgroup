import { sidebarMenu, type SidebarSection } from "../config/sidebarMenu";
import type { Role } from "../types/user";

export interface PermissionsData {
    [sectionName: string]: Role[];
}

export function getDynamicPermissions(): PermissionsData {
    try {
        const data = localStorage.getItem("trek_permissions");
        if (data) {
            return JSON.parse(data) as PermissionsData;
        }
    } catch (error) {
        console.error("Failed to parse permissions", error);
    }
    return {};
}

export function saveDynamicPermissions(permissions: PermissionsData) {
    localStorage.setItem("trek_permissions", JSON.stringify(permissions));
}

export function getAuthorizedSidebarSections(userRole: Role | undefined): SidebarSection[] {
    if (!userRole) return [];

    const dynamicPermissions = getDynamicPermissions();

    return sidebarMenu.filter((section) => {
        // If the section has dynamic permissions saved, use those
        if (dynamicPermissions[section.section]) {
            return dynamicPermissions[section.section].includes(userRole);
        }

        // Otherwise fall back to the defaults defined in sidebarMenu.ts
        return section.roles.includes(userRole);
    });
}
