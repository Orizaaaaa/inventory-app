import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../select";
import { cn } from "@/utils/cn";

type SelectDropdownProps = {
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    options?: { label: string; value: string }[];
    defaultValue?: string;
    minWidth?: number;
    maxWidth?: number;
    className?: string;
    value?: string;
};

const SelectDropdown = ({ 
    placeholder,
    onChange, 
    disabled = false, 
    options = [],
    defaultValue = "",
    minWidth = 200,
    maxWidth = 300,
    className,
    value
}: SelectDropdownProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = value !== undefined;
    const selectValue = isControlled ? value : internalValue;

    const handleChange = (val: string) => {
        setInternalValue(val);  
        onChange?.(val);
    };

    return (
        <Select value={selectValue} onValueChange={handleChange} disabled={disabled}>
            <SelectTrigger
                className={cn(
                    "w-auto p-4 text-neutral-6 transition-colors cursor-pointer h-[46px]! shadow-none",
                    value && "text-neutral-9",
                    !selectValue ? "text-neutral-6" : "text-black", 
                    disabled && "text-neutral-7",
                    className
                )}
                style={{ 
                    minWidth: `${minWidth}px`,
                    maxWidth: `${maxWidth}px`
                }}
                size="default"
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="z-99">
                {options.map((opt, idx) => (
                    <SelectItem key={idx} value={opt.value} className="cursor-pointer">
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectDropdown;