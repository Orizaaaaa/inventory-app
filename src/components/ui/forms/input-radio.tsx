import React from "react";
import { cn } from "@/utils/cn";
import { Label } from "./label";

type InputRadioProps = React.ComponentProps<"input"> & {
  label: string;
  hasError?: boolean;
  labelClassName?: string;
}

const InputRadio = ({
  label,
  hasError,
  required,
  disabled,
  className = "",
  labelClassName = "",
  ...props
}: InputRadioProps) => {
  return (
    <Label
      htmlFor={props.id} 
      className={cn("relative flex items-center gap-2 font-normal", labelClassName)}
    >
      <input
        id={props.id}
        required={required}
        disabled={disabled}
        type="radio"
        data-slot="radio"
        className="peer absolute opacity-0 size-0"
        {...props}
      />
      <div
        className={cn(
          "peer-checked:border-0 peer-checked:bg-[linear-gradient(90deg,#1874A5,#A31AF2)] peer-checked:[&_div]:block peer-checked:[&_div]:bg-white",
          "[&_div]:hidden peer-disabled:bg-grey-100 peer-disabled:bg-none peer-disabled:pointer-events-none",
          "flex items-center justify-center rounded-full size-5 shrink-0 outline-none bg-grey-50",
          hasError && "border-red-500",
          className
        )}
      >
        <div className="size-2 stroke-3 rounded-full" />
      </div>
      <p className={cn(
          "text-gray-700 peer-disabled:text-gray-400 peer-disabled:pointer-events-none", 
          hasError && "text-red-500 peer-checked:text-gray-700"
        )}
      >
        {label}
      </p>
    </Label>
  );
}

export { InputRadio }
