export function generateEmailFromName(name: string, domain = "@gmail.com") {
    if (!name.trim()) return "";
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "") + domain;
}