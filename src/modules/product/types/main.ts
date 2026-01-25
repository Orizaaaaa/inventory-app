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
  image_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ProductResponse {
  code: number;
  status: string;
  message: string;
  data: Product[];
}

export interface ProductCreate {
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
}

import { z } from "zod";

export const productCreateSchema = z.object({
  hpp_per_piece: z.number().min(0, "HPP per piece harus lebih dari atau sama dengan 0"),
  product_name: z.string().min(1, "Product name wajib diisi"),
  category: z.string().min(1, "Category wajib diisi"),
  code: z.string().min(1, "Code wajib diisi"),
  name: z.string().min(1, "Name wajib diisi"),
  variation: z.string().min(1, "Variation wajib diisi"),
  unit: z.string().min(1, "Unit wajib diisi"),
  stock_in: z.number().min(0, "Stock in harus lebih dari atau sama dengan 0"),
  stock_out: z.number().min(0, "Stock out harus lebih dari atau sama dengan 0"),
  total_stock: z.number().min(0, "Total stock harus lebih dari atau sama dengan 0"),
  location: z.string().min(1, "Location wajib diisi"),
  // optional image url (string) or file before upload
  image_url: z.any().optional(),
});

export type ProductFormData = z.infer<typeof productCreateSchema>;

