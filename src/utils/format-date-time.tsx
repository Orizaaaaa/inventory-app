export function formatDateTime(input: string | Date) {
  if (!input) return "-";
  const d = typeof input === "string" ? new Date(input) : input;
  
  if (!d || isNaN(d.getTime())) return "-";

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC" // Force UTC to prevent timezone conversion
  };

  return new Intl.DateTimeFormat("en-GB", formatOptions).format(d);
}

  // Format tanggal ke YYYY-MM-DDTHH:mm
export const formatDateTime2 = (date?: Date, hour: number = 7, minute: number = 0) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const h = String(hour).padStart(2, "0");
    const m = String(minute).padStart(2, "0");
    return `${year}-${month}-${day}T${h}:${m}`;
  };

export const formatTime = (t: any) => t.length === 5 ? `${t}:00` : t;
  
export function getUTCDate(dateString: string) {
  const d = new Date(dateString);
  return new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds()
  );
}