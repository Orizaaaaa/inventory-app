import * as React from "react";
import { cn } from "@/utils/cn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string };

type SelectAutocompleteProps = {
  options: SelectOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  displayLabel?: string;
  disabled?: boolean;
  className?: string; // ekstra class utk trigger
  searchPlaceholder?: string;
  clearable?: boolean; // default: true
  contentClassName?: string; // ekstra class utk panel
  renderItem?: (opt: SelectOption, active: boolean) => React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export default function SelectAutocomplete({
  options,
  value,
  onChange,
  placeholder = "Choose an option",
  displayLabel,
  disabled = false,
  className,
  searchPlaceholder = "Search...",
  clearable = true,
  contentClassName,
  renderItem,
  onOpenChange,
}: SelectAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [contentWidth, setContentWidth] = React.useState<number | undefined>();

  const selected = value !== undefined ? value : internal;
  const setSelected = (v: string | null) => {
    onChange?.(v);
    if (value === undefined) setInternal(v);
  };

  const selectedLabel =
    displayLabel ?? options.find((o) => o.value === selected)?.label;

  // Sinkronkan lebar panel dengan lebar trigger (w-full container)
  React.useLayoutEffect(() => {
    const update = () => {
      if (triggerRef.current) {
        setContentWidth(triggerRef.current.offsetWidth);
      }
    };
    update();
    if (open) {
      window.addEventListener("resize", update);
      // sedikit delay untuk akurasi posisi saat open
      const t = setTimeout(update, 0);
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", update);
      };
    }
  }, [open]);

  const handlePick = (v: string) => {
    setSelected(v);
    setOpen(false);
  };

  // onSelect dari CommandItem mengirim string "value" (berdasar prop value di CommandItem).
  // Kita cocokkan ke opsi berdasar LABEL (ignorCase+trim) agar tetap kepilih meskipun ada duplikat case.
  const handleSelectFromCommand = (labelFromCmd: string) => {
    const norm = (s: string) => s.trim().toLowerCase();
    const found =
      options.find((o) => norm(o.label) === norm(labelFromCmd)) ??
      // fallback: jika label tidak unik, pilih option pertama yang mengandung teksnya
      options.find((o) => norm(o.label).includes(norm(labelFromCmd)));
    if (found) handlePick(found.value);
  };

  const clear = (e?: React.MouseEvent) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setSelected(null);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        onOpenChange?.(o);
      }}
    >
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          className={cn(
            // trigger: full width + h-14, mirip select bawaan
            "w-full h-14 px-4 rounded-xl bg-neutral-3 text-left",
            "border-0 outline-none disabled:opacity-60 disabled:cursor-not-allowed",
            "flex items-center gap-3 relative",
            className
          )}
          aria-expanded={open}
        >
          <span
            className={cn(
              "block truncate flex-1",
              selectedLabel ? "text-neutral-10" : "text-neutral-6"
            )}
          >
            {selectedLabel ?? placeholder}
          </span>

          {/* Chevron kanan (panah buka/tutup) */}
          <ChevronDown
            className={cn(
              "w-5 h-5 shrink-0 transition-transform duration-150 text-neutral-7",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "p-0 bg-white shadow-md rounded-md border border-neutral-5",
          contentClassName
        )}
        // Samakan lebar dengan trigger
        style={{ width: contentWidth }}
      >
        <Command shouldFilter>
          <div className="px-2 pt-2">
            <CommandInput placeholder={searchPlaceholder} />
          </div>

          <CommandEmpty className="p-3 text-sm text-neutral-6">
            No option found.
          </CommandEmpty>

          <CommandList className="max-h-64 overflow-auto">
            <CommandGroup>
              {options.map((opt) => {
                const active = opt.value === selected;
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.label}
                    onSelect={handleSelectFromCommand}
                    className={cn("cursor-pointer", active && "bg-neutral-2")}
                  >
                    <span className="truncate w-full">
                      {renderItem ? renderItem(opt, active) : opt.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>

          {clearable && selected && (
            <div className="flex items-center justify-end gap-2 p-2 border-t">
              <button
                type="button"
                className="text-xs text-neutral-6 hover:text-foreground"
                onClick={() => clear()}
              >
                Clear selection
              </button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
