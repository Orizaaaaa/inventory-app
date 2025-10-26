export function stripTime(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isWeekend(d: Date) {
    const day = d.getDay();
    return day === 0 || day === 6;
}

function addBusinessDays(from: Date, n: number) {
    const x = stripTime(new Date(from));
    let left = Math.max(0, n);
    while (left > 0) {
        x.setDate(x.getDate() + 1);
        if (!isWeekend(x)) left--;
    }
    return x;
}


export function getMinDate(
    submissionTime: number | null | undefined,
    _leaveKind?: "Izin" | "Cuti Tahunan" | null,
    options?: { workingDays?: boolean }
): Date | undefined {
    if (submissionTime == null) return undefined;

    const today = stripTime(new Date());

    if (options?.workingDays) {
        const daysToAdd = Math.max(0, submissionTime - 1);
        return addBusinessDays(today, daysToAdd);
    }

    const min = new Date(today);
    min.setDate(min.getDate() + Math.max(0, submissionTime));
    return stripTime(min);
}

export function calculateEndDateSkippingWeekends(startDate: Date, durationDays: number) {
    if (!durationDays || durationDays <= 1) {
        let s = stripTime(startDate);
        while (isWeekend(s)) {
        s.setDate(s.getDate() + 1);
        }
        return s;
    }

    let current = stripTime(startDate);
    while (isWeekend(current)) {
        current.setDate(current.getDate() + 1);
    }

    let counted = 1;
    while (counted < durationDays) {
        current.setDate(current.getDate() + 1); 
        if (!isWeekend(current)) counted++;
    }
    return current;
}
