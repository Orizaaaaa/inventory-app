import * as React from "react";
import { cn } from "@/utils/cn";
import { Search } from "lucide-react";

function SearchInput({ className, type, onFocus, onBlur, onChange, ...props }: React.ComponentProps<"input">) {
  const [focused, setFocused] = React.useState(false);
  const [filled, setFilled] = React.useState(
    props.value !== undefined ? String(props.value ?? "").length > 0 : false
  );

  React.useEffect(() => {
    if (props.value !== undefined) {
      setFilled(String(props.value ?? "").length > 0);
    }
  }, [props.value]);

  const active = !props.disabled && (focused || filled);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.value === undefined) {
      setFilled(e.currentTarget.value.length > 0);
    }
    onChange?.(e);
  };

  return (
    <div className="flex w-auto h-auto gap-[8px] bg-neutral-3 items-center px-[12px] py-[4px] rounded-[8px]">
      <Search
        className={cn(
          "w-6 h-6 transition-colors",
          active ? "text-neutral-9" : "text-neutral-6"
        )}
      />
      <div
        className={cn(
          "w-px h-5 transition-colors",
          active ? "bg-neutral-9" : "bg-neutral-5"
        )}
      />
      <input
        type={type}
        data-slot="input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
          "flex min-w-0 bg-transparent text-base md:text-sm transition-none outline-none",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "w-[254px] h-[32px] p-[12px] bg-neutral-3",
          "border-0 focus:border-0 hover:border-0 ring-0 focus:ring-0 shadow-none focus:shadow-none rounded-none",
          active ? "text-neutral-9"
            : "text-neutral-7 placeholder:text-neutral-6",
          className
        )}
        placeholder="Search by employee number/name"
        {...props}
      />
    </div>
  );
}

export { SearchInput };
