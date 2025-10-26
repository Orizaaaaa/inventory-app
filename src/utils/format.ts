const formatter = new Intl.NumberFormat("id-ID");

export const formatRupiah = (val: number): string => {
    if (val === undefined || val === null || isNaN(val)) {
        return "";
    }
    return formatter.format(val);
};
export const parsesRupiah = (val: string): number | undefined => {
    let digits = val.replace(/\D/g, "");
    if(!digits) return undefined;
    
    return Number(digits);
};
