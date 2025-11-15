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

