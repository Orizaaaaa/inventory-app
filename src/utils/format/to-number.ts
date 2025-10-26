export const toNumber = (x: unknown, fallback = 0): number => {
    if (x == null) return fallback;
    if (typeof x === "number") return x;
    if (typeof x === "string") {
        const n = Number(x.replaceAll(",", "").trim());
        return Number.isFinite(n) ? n : fallback;
    }
    return fallback;
};