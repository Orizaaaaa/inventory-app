import type React from "react";

export type DynamicColumn<T = any> = {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

