import { Table, TBody, Td, Th, THead, Tr } from "@/components/ui/table";


import { useEffect } from "react";
import { usePagination } from "@/hooks/use-pagination";
import PaginationWrapper from "../pagination-wrapper";

interface Column<T> {
    key: keyof T | string;
    header: React.ReactNode;
    width?: string;
    center?: string;
    render?: (item: T, index: number) => React.ReactNode;
}

interface CustomTableProps<T> {
    data: T[];
    columns: Column<T>[];
    className?: string;
}

export default function CustomTable<T>({
    data,
    columns,
    className,
}: CustomTableProps<T>) {
    const {
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
        totalRows,
        paginatedData,
    } = usePagination(data);

    useEffect(() => {
        setPage(1);
    }, [data, setPage]);

    return (
        <div className={className}>
            <Table>
                <THead>
                    <Tr>
                        {columns.map((col) => (
                            <Th
                                key={col.key as string}
                                className={`${col.width ?? ""} ${col.center ?? ""}`.trim()}
                            >
                                {col.header}
                            </Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {paginatedData.map((item, rowIndex) => (
                        <Tr
                            key={rowIndex}
                            className="border-b-grey-100 h-[65px] text-sm"
                        >
                            {columns.map((col) => (
                                <Td key={col.key as string}>
                                    {col.render
                                        ? col.render(item, rowIndex)
                                        : (item[col.key as keyof T] as React.ReactNode)}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>

            <PaginationWrapper
                totalRows={totalRows}
                page={page}
                rowsPerPage={rowsPerPage}
                defaultRowsPerPage={10}
                onPageChange={setPage}
                onRowsPerPageChange={(rows) => {
                    setRowsPerPage(rows);
                    setPage(1);
                }}
            />
        </div>
    );
}