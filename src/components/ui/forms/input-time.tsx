import { Clock4 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { Label } from "./label";

type InputTimeProps = {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  containerClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hasIcon?: boolean;
};

const InputTime = forwardRef<HTMLInputElement, InputTimeProps>(
  (
    {
      label,
      error,
      required,
      disabled,
      className,
      fieldClassName,
      containerClassName,
      value = "",
      onChange,
      placeholder = "00:00",
      hasIcon = true,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error && error.trim());
    const hasValue = Boolean(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/[^\d]/g, "");
      const isDeleting =
        (e.nativeEvent as InputEvent).inputType === "deleteContentBackward";

      if (inputValue.length >= 3) {
        // Auto format: 1230 -> 12:30
        inputValue = inputValue.slice(0, 2) + ":" + inputValue.slice(2, 4);
      } else if (inputValue.length === 2 && !isDeleting) {
        // Auto add colon: 12 -> 12:
        inputValue = inputValue + ":";
      }

      // Validate hour (00-23) and minute (00-59)
      const parts = inputValue.split(":");
      if (parts.length === 2) {
        const hour = parseInt(parts[0]);
        const minute = parseInt(parts[1]);

        if (hour > 23) {
          inputValue = "23:" + parts[1];
        }
        if (minute > 59) {
          inputValue = parts[0] + ":59";
        }
      }

      // Max length 5 (HH:MM)
      if (inputValue.length > 5) {
        inputValue = inputValue.slice(0, 5);
      }

      onChange?.({ ...e, target: { ...e.target, value: inputValue } });
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
            "flex items-center h-[46px] px-3 bg-neutral-3 rounded-lg border border-transparent transition-colors relative",
            hasError && "border border-red-500 bg-neutral-1",
            disabled && "bg-grey-100 cursor-not-allowed",
            fieldClassName
          )}
        >
          {hasIcon && (
            <>
              <Clock4
                className={cn(
                  "w-5 h-5 mr-2 flex-shrink-0 transition-colors",
                  hasValue ? "text-neutral-9" : "text-neutral-6",
                  hasError && "text-red-500",
                  disabled && "text-neutral-9"
                )}
              />

              <span
                className={cn(
                  "mr-2 transition-colors",
                  hasValue ? "text-neutral-9" : "text-neutral-6",
                  hasError && "text-red-500",
                  disabled && "text-neutral-9"
                )}
              >
                |
              </span>
            </>
          )}
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              "flex-grow min-w-0 bg-transparent outline-none text-sm border-none",
              "focus:outline-none focus:ring-0",
              "placeholder:text-neutral-6",
              "text-neutral-9",
              hasError && "text-red-500",
              disabled && "text-neutral-9"
            )}
            maxLength={5}
            {...props}
          />
        </div>

        {hasError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputTime.displayName = "InputTime";

export { InputTime };
