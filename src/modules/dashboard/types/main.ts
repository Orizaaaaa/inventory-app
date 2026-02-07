
// Category type
export interface Category {
    id: string;
    name: string;
}

// Weekly Revenue type
export interface WeeklyRevenue {
    month: number;
    revenue: number;
}

// Top Selling Product type
export interface TopSellingProduct {
    id: string;
    name: string;
    category: Category;
    total_qty: number;
    hpp: string; // Decimal string
    total_qty_out: number;
}

// Value Top Product type
export interface ValueTopProduct {
    name: string;
    total_value: number;
    percentage_product: string; // Percentage string
}

// Summary type
export interface Summary {
    total_product: number;
    total_product_low_stok: number;
    total_hpp_barang_masuk: number;
    total_hpp_barang_keluar: number;
}

// Dashboard Data type
export interface DashboardData {
    summary: Summary;
    value_top_product: ValueTopProduct[];
    top_selling_product: TopSellingProduct[];
    weekly_revenue: WeeklyRevenue[];
}

// API Response type
export interface DashboardResponse {
    code: number;
    status: string;
    message: string;
    data: DashboardData;
}