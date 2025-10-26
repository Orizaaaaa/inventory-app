export type DateFormatType = "long" | "short" | "numeric";

export function formatDate(input: string | Date, format: DateFormatType = "long") {
  if (!input) return "-";
  
  let d: Date;
  if (typeof input === "string") {
    d = input.includes('T') ? new Date(input) : new Date(input + 'T00:00:00.000Z');
  } else {
    d = input;
  }
  
  if (!d || isNaN(d.getTime())) return "-";

  const formatOptions: Record<DateFormatType, Intl.DateTimeFormatOptions> = {
    long: {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
    short: {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
    numeric: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  };

  return new Intl.DateTimeFormat("en-GB", {
    ...formatOptions[format],
    timeZone: "UTC"
  }).format(d);
}

// Utility functions for specific formats
export const formatDateLong = (input: string | Date) => formatDate(input, "long");
export const formatDateShort = (input: string | Date) => formatDate(input, "short");
export const formatDateNumeric = (input: string | Date) => formatDate(input, "numeric");