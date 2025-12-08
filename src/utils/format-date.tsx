export type DateFormatType = "long" | "short" | "numeric";

/**
 * Parse date string to Date object without timezone conversion
 * Extracts only the date part (YYYY-MM-DD) to avoid timezone issues
 */
export function parseDateString(dateString: string): Date {
  if (!dateString) return new Date();
  
  // Extract YYYY-MM-DD part if string contains time
  let datePart: string;
  if (dateString.includes('T')) {
    datePart = dateString.split('T')[0];
  } else {
    datePart = dateString;
  }
  
  // Parse YYYY-MM-DD and create Date object using UTC
  const [year, month, day] = datePart.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDate(input: string | Date, format: DateFormatType = "long") {
  if (!input) return "-";
  
  let d: Date;
  if (typeof input === "string") {
    // Use parseDateString to avoid timezone conversion
    d = parseDateString(input);
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