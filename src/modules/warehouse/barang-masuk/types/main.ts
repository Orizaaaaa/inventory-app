export interface NoteType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Supplier {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  hpp_per_piece: number;
  product_name: string;
  category: string;
  code: string;
  name: string;
  variation: string;
  unit: string;
  stock_in: number;
  stock_out: number;
  total_stock: number;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface EnteredBy {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StorageLocation {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BarangMasuk {
  _id: string;
  date: string;
  note_type: NoteType;
  supplier: Supplier;
  note_number: string;
  additional_notes: string;
  product: Product;
  qty_in: number;
  unit: string;
  entered_by: EnteredBy;
  storage_location: StorageLocation;
  hpp: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface BarangMasukResponse {
  code: number;
  status: string;
  message: string;
  data: BarangMasuk[];
  pagination: Pagination;
}

export interface BarangMasukCreate {
  date: string;
  note_type: string;
  supplier: string;
  note_number: string;
  additional_notes?: string;
  product: string;
  qty_in: number;
  unit: string;
  entered_by: string;
  storage_location: string;
  hpp: number;
}

import { z } from "zod";

export const barangMasukCreateSchema = z.object({
  date: z.date(),
  note_type: z.string().min(1, "Note type wajib diisi"),
  supplier: z.string().min(1, "Supplier wajib diisi"),
  note_number: z.string().min(1, "Note number wajib diisi"),
  additional_notes: z.string().optional(),
  product: z.string().min(1, "Product wajib diisi"),
  qty_in: z.number().min(1, "Qty in harus lebih dari 0"),
  unit: z.string().min(1, "Unit wajib diisi"),
  entered_by: z.string().min(1, "Entered by wajib diisi"),
  storage_location: z.string().min(1, "Storage location wajib diisi"),
  hpp: z.number().min(0, "HPP harus lebih dari atau sama dengan 0"),
});

export type BarangMasukFormData = z.infer<typeof barangMasukCreateSchema>;

