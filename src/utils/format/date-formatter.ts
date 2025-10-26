export function formatISOToReadable(iso: string | Date | undefined): string {
    if (!iso) return "-";

    const date = iso instanceof Date ? iso : new Date(iso);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function formatISOToReadable2(iso: string | Date | undefined): string {
    if (!iso) return "-";

    const date = iso instanceof Date ? iso : new Date(iso);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export function formatISOToReadable3(iso: string | Date | undefined): string {
    if (!iso) return "-";

    const date = iso instanceof Date ? iso : new Date(iso);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
}

export function formatISOToReadable4(iso: string | Date | undefined): string {
    if (!iso) return "-";

    const date = iso instanceof Date ? iso : new Date(iso);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
}

export function formatISOToReadable5(iso: string | Date | undefined): string {
    if (!iso) return "-";

    const date = iso instanceof Date ? iso : new Date(iso);

    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
}

export function formatISOToReadable6(iso: string | Date | undefined): string {
    if (!iso) return "-";

    const date = iso instanceof Date ? iso : new Date(iso);

    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
}

export function formatLeavePeriod(start: string | Date | undefined): string {
    if (!start) return "-";

    const date = start instanceof Date ? start : new Date(start);
    const year = date.getFullYear();

    return `1 Jan ${year} - 31 Dec ${year}`;
}

export const formatDateISO2 = (d?: string | Date) => d ? new Date(d).toISOString() : undefined;

export const combineDateTime = (date: Date, time: string) => {
    // time dalam format "HH:mm"
    const [hours, minutes] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined.toISOString(); // "2025-09-21T05:48:36.663Z"
};

export function add7Hours(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    const newHour = hour + 7;
    return `${String(newHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function formatISOToUTC(iso: string | Date | undefined): string {
    if (!iso) return "-";
    const date = iso instanceof Date ? iso : new Date(iso);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

export function formatHoursToText(totalHours?: string | number | null) {
    if (totalHours === null || totalHours === undefined || totalHours === '') {
        return '-';
    }

    const total = Number(totalHours);
    if (isNaN(total)) return '-';

    const hours = Math.floor(total);
    const minutes = Math.round((total - hours) * 60);

    return `${hours} hour${minutes ? ` ${minutes} minute` : ''}`;
}

    // Format date manually to avoid timezone issues
export const formatDateISO = (year: number, month: number, date: number, hours: number = 0, minutes: number = 0, seconds: number = 0, ms: number = 0) => {
      const monthStr = (month + 1).toString().padStart(2, '0');
      const dateStr = date.toString().padStart(2, '0');
      const hoursStr = hours.toString().padStart(2, '0');
      const minutesStr = minutes.toString().padStart(2, '0');
      const secondsStr = seconds.toString().padStart(2, '0');
      const msStr = ms.toString().padStart(3, '0');
      return `${year}-${monthStr}-${dateStr}T${hoursStr}:${minutesStr}:${secondsStr}.${msStr}Z`;
    };
    
  
  // Helper function untuk membentuk ISO string dari date + time
export const createISOString = (date: string, time: string): string => {
    if (!date || !time) return "";
    
    const dateOnly = date.split("T")[0]; // Pastikan hanya ambil bagian tanggal
    const datetime = `${dateOnly}T${time}:00Z`; // Format: YYYY-MM-DDTHH:MM:SSZ
    return datetime;
  };
