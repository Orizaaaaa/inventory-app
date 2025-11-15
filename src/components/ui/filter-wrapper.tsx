import React, { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FilterWrapperProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  centerIcon?: ReactNode;
  showError?: boolean;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({
  children,
  leftIcon,
  centerIcon,
  rightIcon,
  showError = false,
}) => {
  return (
    <div className="relative w-fit">
      {(leftIcon || centerIcon) && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-1">
          {leftIcon && <div className="shrink-0">{leftIcon}</div>}
          {centerIcon && <div className="shrink-0">{centerIcon}</div>}
        </div>
      )}

      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 z-1">
          {rightIcon && <div className="shrink-0">{rightIcon}</div>}
        </div>
      )}

      {React.isValidElement(children) &&
        (() => {
          const childElement = children as React.ReactElement<{
            className?: string;
          }>;

          return React.cloneElement(childElement, {
            className: cn(
              "min-w-[254px] rounded-lg px-3 py-[11px] placeholder:text-sm text-sm focus:outline-none h-[46px]",
              showError
                ? "border border-red-500 bg-transparent placeholder:text-red-500"
                : "bg-neutral-3 placeholder:text-neutral-6",
              leftIcon && !centerIcon ? "pl-12" : "",
              centerIcon && !leftIcon ? "pl-12" : "",
              leftIcon && centerIcon ? "pl-[68px]" : "",
              rightIcon ? "pr-12" : "",
              childElement.props.className
            ),
          });
        })()}
    </div>
  );
};

export default FilterWrapper;
