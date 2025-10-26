export type PermissionOption = {
  value: string;
  label?: string;
};

export function groupPermissionsByApp(
  permissions: (string | PermissionOption)[] = []
) {
  const result: Record<
    string,
    Record<string, { value: string; label: string }[]>
  > = {};

  permissions.forEach((perm) => {
    // ambil value string dari PermissionOption atau langsung string
    const value = typeof perm === "string" ? perm : perm.value;

    const parts = value.split(".");
    if (parts.length < 2) return;

    const appRaw = parts[0];
    const moduleRaw = parts[1];
    const featureRaw = parts.slice(2).join(".");

    const app = appRaw.replace(/-/g, " ");
    const module = moduleRaw.replace(/-/g, " ");
    const feature = featureRaw.replace(/-/g, " ");

    if (!result[app]) result[app] = {};
    if (!result[app][module]) result[app][module] = [];

    // label fallback ke feature atau module jika feature kosong
    const labelParts = [feature].filter(Boolean).join(" / ");

    result[app][module].push({
      value,
      label: labelParts || module,
    });
  });

  return result;
}
