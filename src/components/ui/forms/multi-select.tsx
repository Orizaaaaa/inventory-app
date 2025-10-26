import { cn } from "@/utils/cn";
import { Label } from "./label";
import React, { forwardRef } from "react";
import SelectBase, {
  type SelectInstance,
  type Props as SelectProps,
  type GroupBase,
} from "react-select";

export type SelectOptionProps = {
  label: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  optionImage?: React.ReactNode;
  optionLabel?: React.ReactNode;
};

type BaseSelectProps = Omit<
  SelectProps<SelectOptionProps, boolean, GroupBase<SelectOptionProps>>,
  | "options"
  | "onChange"
  | "defaultValue"
  | "isMulti"
  | "menuPortalTarget"
  | "menuPosition"
> & {
  datalist: SelectOptionProps[];
  label?: string;
  disabled?: boolean;
  errorMsg?: string;
  defValue?: string | string[] | null;
  containerClassName?: string;

  /** (opsional) z-index menu; default tinggi supaya di atas overlay modal */
  menuZIndex?: number;
};

type SingleSelectProps = BaseSelectProps & {
  isMulti?: false;
  /** hasil onChange: string | null */
  onChange?: (selectedValue: string | null) => void;
};

type MultiSelectProps = BaseSelectProps & {
  isMulti: true;
  /** hasil onChange: string[] */
  onChange?: (selectedValues: string[]) => void;
};

export type CustomSelectProps = SingleSelectProps | MultiSelectProps;

const Select = forwardRef<SelectInstance<SelectOptionProps, boolean>, CustomSelectProps>(
  function Select(
    {
      label,
      datalist,
      defValue,
      errorMsg,
      required,
      disabled,
      containerClassName,
      onChange,
      menuZIndex = 100000, // pastikan di atas modal overlay
      placeholder,
      ...props
    },
    ref
  ) {
    const hasError = Boolean(errorMsg && errorMsg.trim());

    // react-select butuh object option utk defaultValue
    const defaultValue = Array.isArray(defValue)
      ? datalist.filter((o) => defValue.includes(o.value))
      : defValue
      ? datalist.find((o) => o.value === defValue) ?? null
      : null;

    return (
      <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
        {label ? (
          <Label>
            {label}
            {required && <sup className="text-red-500">*</sup>}
          </Label>
        ) : null}

        <SelectBase
          ref={ref}
          options={datalist}
          isMulti={props.isMulti}
          isDisabled={disabled}
          isOptionDisabled={(option) => !!option.isDisabled}
          unstyled
          instanceId={props.instanceId || "select-" + Math.random().toString(36).slice(2)}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          menuPosition="fixed"
          menuShouldScrollIntoView={false}

          defaultValue={defaultValue as any}

          onChange={(val) => {
            if (props.isMulti) {
              const values = Array.isArray(val) ? (val as SelectOptionProps[]).map((v) => v.value) : [];
              (onChange as MultiSelectProps["onChange"])?.(values);
            } else {
              const v = (val as SelectOptionProps | null)?.value ?? null;
              (onChange as SingleSelectProps["onChange"])?.(v);
            }
          }}

          styles={{
            menuPortal: (base) => ({ ...base, zIndex: menuZIndex }),
            menu: (base) => ({ ...base, zIndex: menuZIndex }),
          }}

          classNames={{
            control: () =>
              cn(
                "!min-h-[46px] !px-3 border rounded-lg bg-neutral-3 text-sm border-gray-300/0",
                hasError && "bg-[#FFFFFF] border-red-500",
                disabled && "bg-[#D0D3D9] text-neutral-9"
              ),
            menu: () =>
              "mt-2 py-2 border rounded-lg bg-neutral-1 text-sm border-gray-300 shadow-xs",
            multiValue: () => "gap-1 py-1.5 px-2 mr-1",
            multiValueRemove: () => "mt-0.5 px-0 mr-0",
            option: ({ isFocused, isSelected }) =>
              cn(
                "!flex items-center min-h-9 px-3 border-l-2 border-transparent !text-sm hover:bg-blue-50 hover:border-l-2 hover:border-blue-500 cursor-pointer",
                (isFocused || isSelected) && "bg-blue-50 border-l-2 border-blue-500"
              ),
            placeholder: ({ isDisabled }) =>
              cn("text-neutral-6", isDisabled && "text-neutral-9"),
            valueContainer: () => "stroke-0 mr-2",
            clearIndicator: () => "stroke-0 mr-1",
            dropdownIndicator: () => "stroke-0 mr-0",
            menuList: () => "max-h-60 overflow-auto",
          }}

          isClearable
          closeMenuOnSelect={!props.isMulti}
          backspaceRemovesValue
          escapeClearsValue={false}
          placeholder={placeholder ?? "Not Selected"}
          {...props}
        />

        {hasError && <p className="text-sm text-red-500">{errorMsg}</p>}
      </div>
    );
  }
);

export { Select };
