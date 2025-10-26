import type { DynamicColumn } from "@/types/dynamic-columns";

export type ColumnConfig<T> = {
  key: keyof T;
  header?: string;
  className?: string;
  render?: (
    row: T,
    options?: {
      editingId?: string | number;
      draft?: any;
      changeDraft?: (value: any) => void;
    }
  ) => React.ReactNode;
};

export function getDynamicColumns<T extends object = any>(
  data: T[],
  configs: ColumnConfig<T>[] = [],
  options?: {
    editingId?: string | number;
    draft?: any;
    changeDraft?: (value: any) => void;
  }
): DynamicColumn<T>[] {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0] as object).map((key) => {
    const config = configs.find((c) => c.key === key);
    return {
      key,
      header: config?.header || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      className: config?.className || "flex-1",
      render: config?.render
        ? (row: T) => config.render!(row, options)
        : undefined,
    };
  });
}