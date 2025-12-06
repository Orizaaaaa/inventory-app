import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "./label";
import { cn } from "@/utils/cn";
import { Calendar } from "lucide-react";

interface DatePickerComponentProps {
  label?: string;
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  containerClassName?: string;
  fieldClassName?: string;
  showError?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  yearDropdownItemNumber?: number;
  scrollableYearDropdown?: boolean;
}

const DatePickerComponent = ({
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = "Pilih tanggal",
  containerClassName,
  fieldClassName,
  showError = true,
  className,
  minDate,
  maxDate,
  dateFormat = "dd/MM/yyyy",
  showTimeSelect,
  timeFormat,
  showYearDropdown,
  showMonthDropdown,
  yearDropdownItemNumber,
  scrollableYearDropdown,
}: DatePickerComponentProps) => {
  const hasError = Boolean(error && error !== "");

  // Convert value to Date
  const selectedDate = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : null;

  // Validate date
  const isValidDate = selectedDate && !isNaN(selectedDate.getTime());

  const handleChange = (date: Date | null) => {
    onChange?.(date);
  };

    return (
      <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
        {label ? (
          <Label>
            {label}
            {required && <sup className="text-red-500">*</sup>}
          </Label>
        ) : null}
        <div
          className={cn(
            "relative flex items-center gap-3 w-full h-[46px] pl-3 pr-3 rounded-lg bg-neutral-3 border border-transparent transition-colors focus-within:bg-neutral-3 focus-within:border-transparent",
            hasError && "border border-red-500 bg-neutral-1",
            disabled && "bg-grey-100",
            fieldClassName
          )}
        >
          <Calendar
            className={cn(
              "w-5 h-5 text-neutral-6 pointer-events-none shrink-0",
              hasError && "text-red-500",
              disabled && "text-neutral-9"
            )}
          />
          <DatePicker
            selected={isValidDate ? selectedDate : null}
            onChange={handleChange}
            disabled={disabled}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={maxDate}
            showTimeSelect={showTimeSelect}
            timeFormat={timeFormat}
            showYearDropdown={showYearDropdown}
            showMonthDropdown={showMonthDropdown}
            yearDropdownItemNumber={yearDropdownItemNumber}
            scrollableYearDropdown={scrollableYearDropdown}
            withPortal
            className={cn(
              "flex-1 w-full h-full outline-none text-neutral-9 text-sm bg-transparent transition-colors placeholder:text-neutral-6 cursor-pointer",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-9 disabled:placeholder:text-neutral-9",
              "focus:placeholder:text-neutral-9",
              hasError && "placeholder:text-red-500",
              className
            )}
            wrapperClassName="w-full"
          />
        </div>
        {hasError && showError && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
};

export { DatePickerComponent };

