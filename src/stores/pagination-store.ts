import { create } from "zustand";

type PaginationState = {
    page: number;
    rowsPerPage: number;
    setPage: (page: number) => void;
    setRowsPerPage: (rows: number) => void;
    reset: () => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 1,
    rowsPerPage: 10,
    setPage: (page) => set({ page }),
    setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
    reset: () => set({ page: 1, rowsPerPage: 10 }),
}));