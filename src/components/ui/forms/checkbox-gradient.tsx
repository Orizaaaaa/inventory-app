import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import { Label } from "./label";


type CheckboxProps = React.ComponentProps<"input"> & {
  label?: string;
  hasError?: boolean;
  labelClassName?: string;
  onCheckedChange?: (checked: boolean) => void;
};

const Checkbox = ({
  label,
  hasError,
  required,
  disabled,
  className = "",
  labelClassName = "",
  onCheckedChange,
  ...props
}: CheckboxProps) => {
  // status menyala sejak awal, support controlled & uncontrolled
  const isOn = Boolean(
    props.checked ?? props.defaultChecked ?? false
  );

  return (
    <Label
      htmlFor={props.id}
      className={cn("relative flex items-center gap-2 font-normal", labelClassName)}
    >
      <input
        id={props.id}
        required={required}
        disabled={disabled}
        type="checkbox"
        data-slot="checkbox"
        className="peer absolute opacity-0 size-0"
        onChange={(e) => {
          props.onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
        {...props}
      />

      <div
        className={cn(
          // keadaan dasar
          "flex items-center justify-center rounded size-5 shrink-0 outline-none border border-gray-400 transition-colors",
          "[&_svg]:hidden",

          // SELALU nyala kalau checked (termasuk saat disabled)
          isOn &&
            "border-0 bg-[linear-gradient(90deg,#1874A5,#A31AF2)] [&_svg]:block [&_svg]:text-white",

          // dukung uncontrolled (klik manual)
          "peer-checked:border-0 peer-checked:bg-[linear-gradient(90deg,#1874A5,#A31AF2)] peer-checked:[&_svg]:block peer-checked:[&_svg]:text-white",

          // nonaktifkan interaksi saat disabled, tapi JANGAN memudarkan gradien
          disabled && "pointer-events-none",
          disabled && !isOn && "bg-grey-100", // cuma abu-abu jika tidak checked

          hasError && "border-red-500",
          className
        )}
      >
        <Check className="size-4 stroke-3" />
      </div>

      <p
        className={cn(
          "text-gray-700",
          disabled && "text-gray-400",
          hasError && "text-red-500",
        )}
      >
        {label}
      </p>
    </Label>
  );
};

export { Checkbox };
