import * as React from "react"
import { cn } from "@/utils/cn";
import { Label } from "./label";
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { NavLink } from "react-router";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showError?: boolean;
  showForgotPassword?: boolean,
  fieldClassName?: string;
  containerClassName?: string;
}

const InputPassword = ({ 
  label,
  error,
  required,
  disabled,
  showError = true,
  showForgotPassword = true,
  className = "",
  fieldClassName = "", 
  containerClassName = "", 
  ...props 
}: InputProps) => {
  const [show, setShow] = React.useState(false);
  const hasError = Boolean(error);
  
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label ? (
        <Label>{label}{required && <sup className="text-red-500">*</sup>}</Label>
      ) : null}

      <div className={cn(
        "relative flex items-center gap-2 w-full h-[46px] px-3 rounded-lg bg-neutral-3 transition-colors border border-transparent",
        hasError && "border border-red-500 bg-neutral-1", 
        disabled && "bg-grey-100", 
        fieldClassName
      )}>
        {/* Lock icon */}
        <Lock className={cn("text-neutral-6", hasError && "text-red-500")} />

        {/* Input */}
        <input
          type={show ? "text" : "password"}
          data-slot="input"
          className={cn(
            "flex-1 w-full h-full outline-none text-sm bg-transparent transition-colors placeholder:text-neutral-6 disabled:pointer-events-none disabled:cursor-not-allowed",
            hasError 
              ? "text-red-500 placeholder:text-red-500" 
              : "text-neutral-9",
            className
          )}
          disabled={disabled}
          required={required}
          {...props}
        />

        {/* Right side icons */}
        <div className="flex items-center gap-2">
          {hasError && (
            <AlertCircle className="text-red-500 w-6 h-6" />
          )}

          <button 
            type="button" 
            onClick={() => setShow((prev) => !prev)}
            className="p-1"
          >
            {show 
              ? <EyeOff className={cn("text-neutral-6", hasError && "text-red-500")} /> 
              : <Eye className={cn("text-neutral-6", hasError && "text-red-500")} />
            }
          </button>
        </div>
      </div>
      {/* Error message */}
      {showError && (
        <div className="flex justify-between items-center text-sm leading-[22px] mt-1">
          {hasError ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <span />
          )}
          {showForgotPassword && (
            <NavLink
              to="/forgot-password"
              type="button"
              style={{ fontFamily: "var(--font-head)" }}
              className="text-neutral-7 text-normal text-[13px] hover:underline"
            >
              Forgot Password?
            </NavLink>
          )}
        </div>
      )}
    </div>
  )
}

export { InputPassword }
