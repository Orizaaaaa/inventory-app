import { useState } from "react";
import { FilterIcon, X } from "lucide-react";


import { cn } from "@/utils/cn";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import FilterWrapper from "./filter-wrapper";



type FilterSelectProps = {
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

const FilterSelect = ({
    placeholder = "Select an option",
    onChange,
    disabled = false,
    options = [],
    defaultValue = "",
    minWidth = 200,
    maxWidth = 300,
    className,
    value
}: FilterSelectProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = value !== undefined;
    const selectValue = isControlled ? value : internalValue;

    const handleChange = (val: string) => {
        setInternalValue(val);
        onChange?.(val);
    };

    return (
        <FilterWrapper
            leftIcon={
                <FilterIcon
                    size={24}
                    className={cn(
                        "transition-colors",
                        disabled ? "text-neutral-7" : internalValue ? "text-neutral-9" : "text-neutral-6"
                    )}
                />
            }
            centerIcon={
                <div
                    className={cn(
                        "w-px h-5 transition-colors",
                        disabled ? "bg-neutral-7" : internalValue ? "bg-neutral-9" : "bg-neutral-5"
                    )}
                />
            }
        // rightIcon={
        //     <ChevronDownIcon
        //         className={cn(
        //             "size-6 transition-colors",
        //             disabled ? "text-neutral-7" : internalValue ? "text-neutral-6" : "text-neutral-6"
        //         )}
        //     />
        // }
        >
            <Select value={selectValue} onValueChange={handleChange} disabled={disabled}>
                <SelectTrigger
                    className={cn(
                        "w-auto pl-16 pr-4 text-neutral-6 transition-colors cursor-pointer h-[46px]! shadow-none",
                        selectValue && "text-neutral-9",
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
                <SelectContent className="z-99 max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                            {opt.label}
                        </SelectItem>
                    ))}
                    {selectValue && !disabled && (
                        <div className="flex justify-center mb-2">
                            <div
                                key="clear-filter"
                                className="cursor-pointer text-center rounded-md p-2 w-8 text-xs shadow hover:bg-grey-50"
                                onClick={() => {
                                    setInternalValue("");
                                    onChange?.("");
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                <X size={15} />
                            </div>
                        </div>
                    )}
                </SelectContent>
            </Select>
        </FilterWrapper>
    );
};

export default FilterSelect;