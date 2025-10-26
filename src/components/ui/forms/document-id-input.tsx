import React from "react";

import { ChevronRight } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";


interface DocumentIdInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const DocumentIdInput: React.FC<DocumentIdInputProps> = ({
  value = "",
  onChange,
  label = "Document ID",
  placeholder = "BR-2025080001",
  className,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <div className={`w-full rounded-xs ${className}`}>
      <div className="flex items-center px-4 py-2 cursor-pointer bg-neutral-3 rounded-xs" onClick={() => setOpen((v) => !v)}>
        <Label className="text-sm mr-3 whitespace-nowrap">{label} :</Label>
        <div className="border-0 flex-1">
          <Input
              value={value}
              onChange={e => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="bg-neutral-1 w-fit"
              readOnly
          />
        </div>
        <span className="ml-auto text-gray-400 text-lg">
          <ChevronRight className="text-black transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
        </span>
      </div>
      {open && (
        <div className="pb-4 pt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default DocumentIdInput;
