import { cn } from "@/utils/cn";
import { Label } from "./label";
import type { ComponentProps } from "react";

type InputUrlProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showError?: boolean;
  fieldClassName?: string;
  containerClassName?: string;
  urlPrefix?: string;
}

const InputUrl = ({ 
  label,
  error,
  required,
  disabled,
  showError = true,
  className = "",
  fieldClassName = "", 
  containerClassName = "", 
  urlPrefix = "URL",
  ...props 
}: InputUrlProps) => {
  const hasError = error || (error !== "" && error !== undefined);
  
  return (
    <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
      {label ? <Label>{label}{required && <sup className="text-red-500">*</sup>}</Label> : null}
      <div className={cn(
          "flex group items-center w-full h-[46px] pl-3 rounded-lg bg-neutral-3 border border-transparent transition-colors focus-within:bg-neutral-3 focus-within:border-transparent",
          "[&:has(input:not(:placeholder-shown))]:border-transparent [&:has(input:not(:placeholder-shown))]:bg-neutral-3",
          hasError && "border border-red-500 bg-neutral-1", 
          fieldClassName
        )}
      >
        <span className={cn(
            "group-has-[input:not(:placeholder-shown)]:text-neutral-9 group-has-[input:not(:placeholder-shown)]:border-gray-300",
            "flex items-center h-full pr-3 transition-colors border-r border-gray-300 text-sm text-neutral-6",
            "group-focus-within:text-neutral-9 group-focus-within:border-gray-300",
            hasError && "border-red-500 text-red-500", 
            disabled && "text-neutral-9"
          )} 
        >
          {urlPrefix}
        </span>
        <input
          type="text"
          data-slot="input"
          className={cn(
            "px-3 flex-1 w-full h-full rounded-r-lg outline-none text-neutral-9 text-sm bg-transparent transition-colors placeholder:text-neutral-6",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-9 disabled:placeholder:text-neutral-9",
            "focus:placeholder:text-neutral-9",
            hasError && "placeholder:text-red-500",
            disabled && "bg-grey-100",
            className
          )}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      {hasError && showError && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export { InputUrl }