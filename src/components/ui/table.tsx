import * as React from "react";

import { cn } from "@/utils/cn";

const Table = ({
  className,
  containerClassName,
  overflow = false,
  maxHeight = "75vh",
  ...props
}: React.ComponentProps<"table"> & {
  className?: string;
  containerClassName?: string;
  overflow?: boolean;
  maxHeight?: string;
}) => {
  const containerStyles = overflow
    ? {
      maxHeight: maxHeight,
    }
    : undefined;

  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full",
        overflow ? "overflow-y-auto rounded-t-lg" : "overflow-x-auto",
        containerClassName
      )}
      style={containerStyles}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full border-collapse border-spacing-0 **:border-gray-300 min-w-0 max-w-none rounded-lg caption-bottom",
          className
        )}
        {...props}
      />
    </div>
  );
};

const THead = ({
  className,
  sticky = false,
  ...props
}: React.ComponentProps<"thead"> & {
  sticky?: boolean;
}) => {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b-0 [&_tr]:bg-neutral-3",
        sticky && "sticky top-0 bg-neutral-3 z-10",
        className
      )}
      {...props}
    />
  );
};

const TBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
};

const TFoot = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-gray-100 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
};

const Tr = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "px-2 border-b transition-colors data-[state=selected]:bg-neutral-3",
        className
      )}
      {...props}
    />
  );
};

const Th = ({ className, ...props }: React.ComponentProps<"th">) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-12 px-2 font-semibold text-sm text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
};

const Td = ({ className, ...props }: React.ComponentProps<"td">) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-2 py-3 align-middle text-sm whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
};

const Tc = ({ className, ...props }: React.ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
};

export { Table, THead, TBody, TFoot, Th, Tr, Td, Tc };
