import { cn } from "@/utils/cn";
import { Label } from "./label";
import { forwardRef, type ComponentProps } from "react";

type InputNumberProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showError?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
  fieldClassName?: string;
  containerClassName?: string;
  suffixClassName?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
};

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      label,
      error,
      required,
      disabled,
      type = "number",
      hint,
      prefix,
      suffix,
      showError = true,
      className,
      fieldClassName,
      suffixClassName,
      containerClassName,
      min,
      max,
      step,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error && error.trim());
    const affixcss = cn(
      "group-has-[input:not(:placeholder-shown)]:text-neutral-9 group-has-[input:not(:placeholder-shown)]:border-gray-300",
      "flex items-center h-full px-3 transition-colors border-gray-300 text-sm text-neutral-6",
      "group-focus-within:text-neutral-9 group-focus-within:border-gray-300",
      hasError && "border-red-500 text-red-500",
      disabled && "text-neutral-9 bg-neutral-3",
      prefix && "border-r",
      suffix && "border-l"
    );

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
            "flex group items-center gap-3 w-full h-[46px] pl-3 pr-3 rounded-lg bg-neutral-3 border border-transparent transition-colors overflow-hidden focus-within:bg-neutral-3 focus-within:border-transparent",
            hasError && "border border-red-500 bg-neutral-1",
            disabled && "bg-grey-100",
            prefix && "pr-3 pl-0",
            suffix && "pr-0 pl-3",
            fieldClassName
          )}
        >
          {prefix ? <span className={affixcss}>{prefix}</span> : null}
          <input
            ref={ref}
            data-slot="input"
            className={cn(
              "flex-1 w-full h-full outline-none text-neutral-9 text-sm bg-transparent transition-colors placeholder:text-neutral-6",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-9 disabled:placeholder:text-neutral-9",
              "focus:placeholder:text-neutral-9",
              hasError && "placeholder:text-red-500",
              className
            )}
            type={type}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            step={step}
            onWheel={(e) => (e.target as HTMLElement).blur()}
            {...props}
          />
          {suffix ? (
            <span className={cn(affixcss, suffixClassName)}>{suffix}</span>
          ) : null}
        </div>
        {!hasError && hint && <p className="text-sm">{hint}</p>}
        {hasError && showError && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";

export { InputNumber };
