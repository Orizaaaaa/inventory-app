import React, { useEffect, useState } from "react";
import SelectBase from "react-select";
import type { MultiValue } from "react-select";
import { cn } from "@/utils/cn";

export type SelectWithTagsOption = {
    label: string;
    value: string;
};

type SelectWithTagsRightProps = {
    datalist: SelectWithTagsOption[];
    label?: string;
    placeholder?: string;
    value?: string[];
    onChange?: (values: string[]) => void;
    containerClassName?: string;
    styles?: any;
    immutableValues?: string[];
    isLoading?: boolean;
};

export function SelectWithTagsRight({
    datalist,
    label,
    placeholder = "Choose option",
    value = [],
    onChange,
    containerClassName,
    styles,
    immutableValues,
    isLoading = false
}: SelectWithTagsRightProps) {
    const [internalValue, setInternalValue] = useState<string[]>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);


    const handleChange = (selected: MultiValue<SelectWithTagsOption>) => {
        const vals = selected.map((s) => s.value);
        const newVals = Array.from(new Set([...(immutableValues || []), ...vals]));
        setInternalValue(newVals);
        onChange?.(newVals);
    };

    const NoMultiValue = () => null;

    return (
        <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
            {label && <label className="font-medium text-sm">{label}</label>}
            <div className="flex gap-3 items-start">
                <div className="max-w-[254px] flex-1">
                    <SelectBase<SelectWithTagsOption, true>
                        options={datalist}
                        isMulti
                        value={internalValue.map((val) => {
                            const opt = datalist.find((o) => o.value === val);
                            return opt || { label: val, value: val };
                        })}
                        onChange={handleChange}
                        placeholder={placeholder}
                        isLoading={isLoading}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        menuShouldScrollIntoView={false}
                        menuShouldBlockScroll={false}
                        unstyled={true}
                        styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999, pointerEvents: "auto" }),
                            menuList: (base) => ({ ...base }),
                            ...styles,
                        }}
                        components={{ MultiValue: NoMultiValue }}
                        classNames={{
                            control: () =>
                                cn("!min-h-[46px] !px-3 rounded-lg text-sm bg-neutral-4"),
                            menu: () =>
                                "mt-2 py-2 rounded-lg bg-neutral-3 text-sm border border-gray-300 shadow-xs",
                            option: ({ isFocused, isSelected }) =>
                                cn(
                                    "!flex items-center min-h-9 px-3 border-l-2 border-transparent !text-sm hover:bg-blue-50 hover:border-l-2 hover:border-blue-500",
                                    (isFocused || isSelected) && "bg-blue-50 border-l-2"
                                ),
                            placeholder: () => "text-neutral-7",
                            valueContainer: () => "stroke-0 mr-2",
                            clearIndicator: () => "stroke-0 mr-1",
                            dropdownIndicator: () => "stroke-0 mr-0",
                        }}
                        isClearable={true}
                        closeMenuOnSelect={false}
                    />
                </div>

                {/* Chips di kanan */}
                <div className="flex flex-wrap gap-2 flex-1">
                    {internalValue.map((val) => {
                        const opt = datalist.find((o) => o.value === val);
                        const isImmutable = immutableValues?.includes(val);
                        return (
                            <span
                                key={val}
                                className="flex items-center gap-1 px-2 py-1 bg-primary-50 rounded-md text-[12px]"
                            >
                                {opt?.label}
                                {!isImmutable && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleChange(
                                                internalValue
                                                    .filter((v) => v !== val)
                                                    .map(
                                                        (v) => datalist.find((o) => o.value === v) || { label: v, value: v }
                                                    )
                                            )
                                        }
                                        className="text-red-500 hover:text-red-700 cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
