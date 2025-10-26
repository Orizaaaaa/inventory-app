import { cn } from "@/utils/cn"

const Label = ({ className, ...props }: React.ComponentProps<"label">) => {
  return (
    <label
      data-slot="label"
      className={cn("text-sm font-[600] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", className)}
      {...props}
    />
  );
}

export { Label }