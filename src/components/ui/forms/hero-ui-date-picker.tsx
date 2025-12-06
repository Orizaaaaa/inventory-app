import { DatePicker as HeroUIDatePicker } from "@heroui/date-picker";
import { parseDate, CalendarDate } from "@internationalized/date";
import { useState, useEffect, useMemo } from "react";
import { Label } from "./label";
import { cn } from "@/utils/cn";

interface HeroUIDatePickerProps {
  label?: string;
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  className?: string;
  showRequired?: boolean;
  disabled?: boolean;
  disablePastDates?: boolean;
  minValue?: Date | string;
  maxValue?: Date | string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  labelPlacement?: "inside" | "outside" | "outside-left";
  errorMessage?: string;
  isInvalid?: boolean;
}

export function HeroUIDatePickerComponent({
  label,
  value,
  onChange,
  className,
  showRequired,
  disabled = false,
  disablePastDates = false,
  minValue,
  maxValue,
  size = "md",
  variant = "bordered",
  color = "default",
  labelPlacement = "outside",
  errorMessage,
  isInvalid,
}: HeroUIDatePickerProps) {
  // Convert Date to CalendarDate for HeroUI
  const dateToCalendarDate = (date: Date | string | null | undefined): CalendarDate | null => {
    if (!date) return null;
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return null;
    return parseDate(
      `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`
    );
  };

  // Convert CalendarDate to Date
  const calendarDateToDate = (calendarDate: CalendarDate | null): Date | null => {
    if (!calendarDate) return null;
    return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
  };

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(
    dateToCalendarDate(value)
  );

  // Update internal state when value prop changes
  useEffect(() => {
    setSelectedDate(dateToCalendarDate(value));
  }, [value]);

  const handleChange = (date: CalendarDate | null) => {
    setSelectedDate(date);
    const dateObj = calendarDateToDate(date);
    onChange?.(dateObj);
  };

  // Calculate min/max values
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minCalendarDate = useMemo(() => {
    if (disablePastDates) {
      return parseDate(
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
      );
    }
    if (minValue) {
      const min = typeof minValue === "string" ? new Date(minValue) : minValue;
      return parseDate(
        `${min.getFullYear()}-${String(min.getMonth() + 1).padStart(2, "0")}-${String(min.getDate()).padStart(2, "0")}`
      );
    }
    return undefined;
  }, [disablePastDates, minValue, today]);

  const maxCalendarDate = useMemo(() => {
    if (maxValue) {
      const max = typeof maxValue === "string" ? new Date(maxValue) : maxValue;
      return parseDate(
        `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, "0")}-${String(max.getDate()).padStart(2, "0")}`
      );
    }
    return undefined;
  }, [maxValue]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && labelPlacement === "outside" && (
        <Label className="text-sm font-semibold text-neutral-9">
          {label}
          {showRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <HeroUIDatePicker
        label={labelPlacement === "inside" ? label : undefined}
        value={selectedDate}
        onChange={handleChange}
        isDisabled={disabled}
        minValue={minCalendarDate}
        maxValue={maxCalendarDate}
        size={size}
        variant={variant}
        color={color}
        labelPlacement={labelPlacement}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        className={cn("w-full", className)}
      />
    </div>
  );
}

