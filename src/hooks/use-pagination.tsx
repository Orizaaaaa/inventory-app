import { useMemo, useEffect, useRef } from "react";
import { usePaginationStore } from "@/stores/pagination-store";

export function usePagination<T>(data: T[] = []) {
    const { page, rowsPerPage, setPage, setRowsPerPage } = usePaginationStore();

    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Buat "signature" unik berdasarkan isi data
    const dataSignature = JSON.stringify(
        data.map((item) => Object.values(item ?? {}).join("|"))
    );

    // Simpan signature sebelumnya
    const prevSignature = useRef<string | null>(null);

    useEffect(() => {
        // Kalau data berubah signifikan (misal karena filter baru)
        if (prevSignature.current !== null && prevSignature.current !== dataSignature) {
            setPage(1);
        }

        // Update signature terakhir
        prevSignature.current = dataSignature;
    }, [dataSignature, setPage]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }, [data, page, rowsPerPage]);

    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        totalRows,
        totalPages,
        paginatedData,
    };
}