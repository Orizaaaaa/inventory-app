import type { PermissionOption } from "@/modules/SSO/user-access-management/types/permission";

export function normalizeFeatures(
    features?: PermissionOption[] | string[]
): string[] {
    if (!features) return [];
    return features.map(f => typeof f === "string" ? f : f.value);
}