export const isBeforeHPlus1 = (iso?: string | Date | undefined) => {
    if (!iso) return false;
    const start = new Date(iso);
    const boundary = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 1,
        0, 0, 0, 0
    );
    return new Date() < boundary;
};