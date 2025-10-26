import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const ROW_OPTIONS = [5, 10, 20, 50, 100];

export interface PaginationWrapperProps {
  totalRows: number;
  page?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  dependencies?: React.DependencyList;
  storageKey?: string;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
}

export const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  totalRows,
  page: controlledPage,
  rowsPerPage: controlledRowsPerPage,
  rowsPerPageOptions = ROW_OPTIONS,
  defaultRowsPerPage = 10,
  dependencies = [],
  storageKey,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [internalPage, setInternalPage] = useState(1);
  const [internalRowsPerPage, setInternalRowsPerPage] = useState(defaultRowsPerPage);

  const page = controlledPage ?? internalPage;
  const rowsPerPage = controlledRowsPerPage ?? internalRowsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  useEffect(() => {
    if (!storageKey) return;
    const stored = sessionStorage.getItem(`pagination:${storageKey}`);
    if (stored) {
      const { savedPage, savedLimit } = JSON.parse(stored);
      if (savedPage && onPageChange) onPageChange(savedPage);
      if (savedLimit && onRowsPerPageChange) onRowsPerPageChange(savedLimit);
      setInternalPage(savedPage ?? 1);
      setInternalRowsPerPage(savedLimit ?? defaultRowsPerPage);
    }
  }, [storageKey, onPageChange, onRowsPerPageChange, defaultRowsPerPage]);

  useEffect(() => {
    if (!storageKey) return;
    sessionStorage.setItem(
      `pagination:${storageKey}`,
      JSON.stringify({ savedPage: page, savedLimit: rowsPerPage })
    );
  }, [page, rowsPerPage, storageKey]);

  useEffect(() => {
    if (page !== 1) handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      if (controlledPage === undefined) setInternalPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    const numValue = Number(value);
    if (controlledRowsPerPage === undefined) {
      setInternalRowsPerPage(numValue);
      setInternalPage(1);
    }
    onRowsPerPageChange?.(numValue);
    onPageChange?.(1);
  };

  const getIconColor = (isDisabled: boolean) =>
    isDisabled ? "text-neutral-6" : "text-black";

  const renderPages = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);
    if (page <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    } else if (page >= totalPages - 2) {
      start = Math.max(totalPages - 4, 1);
      end = totalPages;
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            size="sm"
            isActive={page === i}
            onClick={() => handlePageChange(i)}
            className={
              page === i
                ? "bg-blue-50 border-blue-100 text-[#1874A5] text-[16px]"
                : "bg-white border border-grey-50 text-neutral-6 text-[16px]"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full py-2 rounded-b-xl">
      <div className="flex text-sm font-semibold text-nowrap">
        {totalRows} Rows
      </div>
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <button disabled={page === 1} onClick={() => handlePageChange(1)}>
              <ChevronsLeft className={`size-4 ${getIconColor(page === 1)}`} />
            </button>
          </PaginationItem>
          <PaginationItem>
            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
              <ChevronLeft className={`size-4 ${getIconColor(page === 1)}`} />
            </button>
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              <ChevronRight className={`size-4 ${getIconColor(page === totalPages)}`} />
            </button>
          </PaginationItem>
          <PaginationItem>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              <ChevronsRight className={`size-4 ${getIconColor(page === totalPages)}`} />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-nowrap font-medium">Rows per page</span>
        <Select value={String(rowsPerPage)} onValueChange={handleRowsPerPageChange}>
          <SelectTrigger className="min-w-20 px-2 py-2 rounded-lg text-sm bg-neutral-3 text-neutral-9 text-center">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rowsPerPageOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationWrapper;