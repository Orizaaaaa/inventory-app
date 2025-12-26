export interface NoteType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  image_url: null | string;
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

export interface HandledBy {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BarangKeluar {
  _id: string;
  date: string;
  note_type_id: NoteType | string;
  customer_id: Customer | string;
  note_number: string;
  additional_info: string;
  product_id: Product | string;
  product_name_snapshot: string;
  hpp_snapshot: number;
  qty_out: number;
  unit_snapshot: string;
  handled_by: HandledBy | string;
  location: string;
  total_hpp: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface BarangKeluarResponse {
  code: number;
  status: string;
  message: string;
  data: BarangKeluar[];
  pagination?: Pagination;
}

export interface BarangKeluarCreate {
  date: string;
  note_type_id: string;
  customer_id: string;
  note_number: string;
  additional_info?: string;
  product_id: string;
  product_name_snapshot: string;
  hpp_snapshot: number;
  qty_out: number;
  unit_snapshot: string;
  handled_by: string;
  location: string;
  total_hpp: number;
}

export type BarangKeluarApiPayload = Omit<BarangKeluarFormData, 'date'> & { date: string };

import { z } from "zod";

export const barangKeluarCreateSchema = z.object({
  date: z.date().min(new Date("1900-01-01"), "Date is required"),
  note_type_id: z.string().min(1, "Note type wajib diisi"),
  customer_id: z.string().min(1, "Customer wajib diisi"),
  note_number: z.string().min(1, "Note number wajib diisi"),
  additional_info: z.string().optional(),
  product_id: z.string().min(1, "Product wajib diisi"),
  product_name_snapshot: z.string().min(1, "Product name snapshot wajib diisi"),
  hpp_snapshot: z.number().min(0, "HPP snapshot harus lebih dari atau sama dengan 0"),
  qty_out: z.number().min(1, "Qty out harus lebih dari 0"),
  unit_snapshot: z.string().min(1, "Unit snapshot wajib diisi"),
  handled_by: z.string().min(1, "Handled by wajib diisi"),
  location: z.string().min(1, "Location wajib diisi"),
  total_hpp: z.number().min(0, "Total HPP harus lebih dari atau sama dengan 0"),
});

export type BarangKeluarFormData = z.infer<typeof barangKeluarCreateSchema>;

