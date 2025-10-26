import type { PermissionOption } from "@/modules/SSO/user-access-management/types/permission";

function prettifyModuleKey(raw: string): string {
  return raw
    .replace(/-/g, " ")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s*\(\s*/g, " (")
    .replace(/\s*\)\s*/g, ")");
}

export function normalizePermissionGroup(
  permissions: (PermissionOption | string)[] = []
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  for (const p of permissions) {
    const value = typeof p === "string" ? p : p.value;
    const parts = value.split(".");
    if (parts.length < 2) continue;

    const moduleRaw = parts[1];
    const moduleKey = prettifyModuleKey(moduleRaw);

    if (!grouped[moduleKey]) grouped[moduleKey] = [];
    grouped[moduleKey].push(value);
  }

  return grouped;
}