export function toLabel(key: string) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^./, str => str.toUpperCase());
}

export function formatLabel(value: string | null | undefined) {
    if (!value) return "-";
    return value
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}