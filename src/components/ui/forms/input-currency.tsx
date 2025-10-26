import { Input } from "./input";
import { formatRupiah, parsesRupiah } from "@/utils/format";
import { 
    forwardRef, 
    type ComponentProps 
} from "react";

type InputCurrencyProps = Omit<
    ComponentProps<typeof Input>, 
    "type" | "value" | "prefix" | "onChange"
> & {
    value?: number; 
    onChange?: (value: number | undefined) => void;
}

const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(
    ({ value, onChange, ...props }, ref) => (
        <Input 
            {...props}
            ref={ref}
            value={value != undefined ? formatRupiah(value) : ""}
            onChange={(e) => onChange?.(parsesRupiah(e.target.value))}
            prefix="Rp"
        />
    )
);

export { InputCurrency };
