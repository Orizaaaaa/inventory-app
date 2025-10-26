import * as React from "react";
import { AlertCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Label } from "./label";

type InputPrefixProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showError?: boolean;
  showErrorIcon?: boolean;
  fieldClassName?: string;
  containerClassName?: string;
  icon?: LucideIcon;
  prefix?: string; // <-- Tambahan untuk prefix (misal "Rp.", "$", dll.)
};

const InputPrefix = ({
  label,
  error,
  required,
  disabled,
  type,
  icon: Icon,
  prefix,
  showError = true,
  showErrorIcon = true,
  className = "",
  fieldClassName = "",
  containerClassName = "",
  ...props
}: InputPrefixProps) => {
  const hasError = Boolean(error && error !== "");

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
          "relative flex items-center w-full h-[46px] rounded-lg overflow-hidden border border-transparent transition-colors",
          hasError && "border border-red-500 bg-neutral-1",
          disabled && "bg-grey-100",
          fieldClassName
        )}
      >
        {prefix ? (
          <div className="bg-neutral-3 text-neutral-9 px-3 h-full flex items-center text-sm">
            {prefix}
          </div>
        ) : null}

        {Icon ? (
          <Icon
            className={cn(
              "ml-3 text-neutral-6",
              hasError && "text-red-500"
            )}
          />
        ) : null}

        <input
          type={type}
          data-slot="input"
          className={cn(
            "flex-1 h-full px-3 outline-none text-sm bg-[#D0D3D9] transition-colors placeholder:text-neutral-6 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-9 disabled:placeholder:text-neutral-9",
            hasError
              ? `text-red-500 placeholder:text-red-500 ${showErrorIcon ? "pr-8" : ""}`
              : "text-neutral-9",
            className
          )}
          disabled={disabled}
          required={required}
          {...props}
        />

        {hasError && showErrorIcon && (
          <AlertCircle className="absolute right-3 text-red-500 w-5 h-5 pointer-events-none" />
        )}
      </div>

      {hasError && showError && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export { InputPrefix };
