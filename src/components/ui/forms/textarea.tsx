import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Label } from "./label";

type TextAreaProps = React.ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
  maxLength?: number;
  containerClassName?: string;
  isShowCharCount?: boolean;
  fieldClassName?: string;
};

const Textarea = ({
  label = "",
  error = "",
  required = false,
  disabled = false,
  rows = 5,
  cols = 5,
  maxLength = 200,
  className = "",
  containerClassName = "",
  isShowCharCount = false,
  fieldClassName = "",
  value = "",
  ...props
}: TextAreaProps) => {
  const [charCount, setCharCount] = useState(0);
  const hasError = error || (error !== "" && error !== undefined);
  
  // Sinkronisasi charCount dengan value setiap kali value berubah
  useEffect(() => {
    setCharCount(typeof value === "string" ? value.length : 0);
  }, [value]);

  return (
    <div className={cn(`flex flex-col gap-2 text-sm ${containerClassName}`)}>
      {label ? (
        <Label>
          {label}
          {required && <sup className="text-red-500">*</sup>}
        </Label>
      ) : null}
      <div className={`relative w-full ${fieldClassName}`}>
        <textarea
          rows={rows}
          cols={cols}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setCharCount(target.value.length);
          }}
          maxLength={maxLength}
          className={cn(
            "peer flex-1 w-full h-full p-3 resize-none rounded-lg outline-none text-sm text-neutral-9 bg-neutral-3 transition-colors focus:bg-neutral-3 focus:border-transparent focus:placeholder:text-neutral-9 placeholder:text-neutral-6",
            "disabled:pointer-events-none disabled:text-neutral-9 disabled:placeholder:text-neutral-9 not-placeholder-shown:bg-neutral-3 not-placeholder-shown:border-transparent",
            hasError && "border border-red-500 bg-neutral-1",
            disabled && "bg-grey-100",
            className
          )}
          disabled={disabled}
          required={required}
          value={value}
          {...props}
        />
      </div>
      {isShowCharCount && (
        <span className="block text-xs text-neutral-6 text-right">
          {charCount}/{maxLength}
        </span>
      )}
      {error && (
        <p className="text-sm leading-[22px] text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
