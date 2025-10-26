import * as React from "react";
import { cn } from "@/utils/cn";
import { Label } from "./label";
import { forwardRef } from "react";
import SelectBase, {
  type SelectInstance,
  type Props as SelectProps,
} from "react-select";

export type SelectOptionProps = {
  label: any;
  value: string;
  isDisabled?: boolean;
  optionImage?: React.ReactNode;
  optionLabel?: React.ReactNode;
};

type BaseSelectProps = Omit<
  SelectProps<SelectOptionProps, boolean>,
  "datalist" | "onChange"
> & {
  datalist: SelectOptionProps[];
  label?: string;
  disabled?: boolean;
  errorMsg?: string;
  defValue?: string; // tetap string aja, jangan diubah
  containerClassName?: string;
};

type SingleSelectProps = BaseSelectProps & {
  isMulti?: false;
  onChange?: (selected: string | null) => void;
};

type MultiSelectProps = BaseSelectProps & {
  isMulti: true;
  onChange?: (selected: string[]) => void;
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
      ...props
    },
    ref
  ) {
    const hasError = Boolean(errorMsg && errorMsg.trim());

    // cari option yang match dengan defValue (buat controlled value)
    const selectedValue = React.useMemo(() => {
      if (!defValue) return null;
      if (Array.isArray(defValue)) {
        return datalist.filter((o) => defValue.includes(o.value));
      }
      return datalist.find((o) => o.value === defValue) || null;
    }, [defValue, datalist]);

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
          menuPosition="absolute"
          value={selectedValue} // ⬅️ pakai value, bukan defaultValue
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          menuShouldScrollIntoView={false}
          unstyled={true}
          onChange={(val) => {
            props.isMulti
              ? (onChange as MultiSelectProps["onChange"])?.(
                Array.isArray(val) ? val.map((v) => v.value) : []
              )
              : (onChange as SingleSelectProps["onChange"])?.(
                (val as SelectOptionProps | null)?.value || null
              );
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
                "!flex items-center min-h-9 px-3 border-l-2 border-transparent !text-sm hover:bg-blue-50 hover:border-l-2 hover:border-blue-500",
                (isFocused || isSelected) &&
                "bg-blue-50 border-l-2 border-blue-500"
              ),
            placeholder: ({ isDisabled }) =>
              cn("text-neutral-6", isDisabled && "text-neutral-9"),
            valueContainer: () => "stroke-0 mr-2",
            clearIndicator: () => "stroke-0 mr-1",
            dropdownIndicator: () => "stroke-0 mr-0",
          }}
          isClearable={true}
          placeholder={props.placeholder ?? "Not Selected"}
          closeMenuOnSelect={!props.isMulti}
          {...props}
        />
        {hasError && <p className="text-sm text-red-500">{errorMsg}</p>}
      </div>
    );
  }
);

export { Select };