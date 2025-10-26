export const getWeekFromIndex = (index: number): string => {
    return `W${(index % 4) + 1}`;
};

export const getMonthFromIndex = (index: number, monthsData: { name: string; year: number }[]) => {
    const monthIndex = Math.floor(index / 4);
    return monthsData[monthIndex];
};