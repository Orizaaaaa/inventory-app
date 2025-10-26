// Data dummy untuk dashboard inventory
export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalCategories: number;
  monthlyGrowth: number;
  weeklyGrowth: number;
}

export interface ProductCategory {
  name: string;
  value: number;
  count: number;
  color: string;
}

export interface MonthlySales {
  month: string;
  sales: number;
  profit: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface RecentActivity {
  id: string;
  type: 'stock-in' | 'stock-out' | 'product-added' | 'product-updated';
  product: string;
  quantity: number;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  user: string;
}

// Data statistik utama
export const inventoryStats: InventoryStats = {
  totalProducts: 1247,
  totalValue: 125000000,
  lowStockItems: 23,
  outOfStockItems: 5,
  totalCategories: 12,
  monthlyGrowth: 12.5,
  weeklyGrowth: 3.2
};

// Data untuk doughnut chart - kategori produk
export const productCategories: ProductCategory[] = [
  { name: 'Elektronik', value: 35, count: 436, color: '#3B82F6' },
  { name: 'Fashion', value: 25, count: 312, color: '#1D4ED8' },
  { name: 'Home & Living', value: 20, count: 249, color: '#1E40AF' },
  { name: 'Sports', value: 10, count: 125, color: '#1E3A8A' },
  { name: 'Books', value: 5, count: 62, color: '#1E2A5E' },
  { name: 'Others', value: 5, count: 63, color: '#312E81' }
];

// Data untuk bar chart - penjualan bulanan
export const monthlySales: MonthlySales[] = [
  { month: 'Jan', sales: 45000000, profit: 9000000, orders: 234 },
  { month: 'Feb', sales: 52000000, profit: 10400000, orders: 267 },
  { month: 'Mar', sales: 48000000, profit: 9600000, orders: 245 },
  { month: 'Apr', sales: 61000000, profit: 12200000, orders: 298 },
  { month: 'May', sales: 55000000, profit: 11000000, orders: 276 },
  { month: 'Jun', sales: 67000000, profit: 13400000, orders: 312 },
  { month: 'Jul', sales: 59000000, profit: 11800000, orders: 289 },
  { month: 'Aug', sales: 72000000, profit: 14400000, orders: 345 },
  { month: 'Sep', sales: 68000000, profit: 13600000, orders: 328 },
  { month: 'Oct', sales: 75000000, profit: 15000000, orders: 367 },
  { month: 'Nov', sales: 82000000, profit: 16400000, orders: 398 },
  { month: 'Dec', sales: 78000000, profit: 15600000, orders: 378 }
];

// Data untuk tabel produk terlaris
export const topProducts: TopProduct[] = [
  { id: '1', name: 'iPhone 15 Pro Max', category: 'Elektronik', stock: 45, price: 15999000, sales: 89, status: 'in-stock' },
  { id: '2', name: 'Samsung Galaxy S24', category: 'Elektronik', stock: 12, price: 12999000, sales: 76, status: 'low-stock' },
  { id: '3', name: 'Nike Air Max 270', category: 'Sports', stock: 0, price: 1899000, sales: 65, status: 'out-of-stock' },
  { id: '4', name: 'MacBook Pro M3', category: 'Elektronik', stock: 23, price: 24999000, sales: 58, status: 'in-stock' },
  { id: '5', name: 'Adidas Ultraboost 22', category: 'Sports', stock: 8, price: 2199000, sales: 52, status: 'low-stock' },
  { id: '6', name: 'Sony WH-1000XM5', category: 'Elektronik', stock: 34, price: 4999000, sales: 47, status: 'in-stock' },
  { id: '7', name: 'Uniqlo Basic Tee', category: 'Fashion', stock: 156, price: 99000, sales: 234, status: 'in-stock' },
  { id: '8', name: 'IKEA Desk Lamp', category: 'Home & Living', stock: 67, price: 299000, sales: 41, status: 'in-stock' }
];

// Data untuk aktivitas terbaru
export const recentActivities: RecentActivity[] = [
  { id: '1', type: 'stock-in', product: 'iPhone 15 Pro Max', quantity: 50, timestamp: '2024-01-15T10:30:00Z', status: 'success', user: 'Admin' },
  { id: '2', type: 'stock-out', product: 'Samsung Galaxy S24', quantity: 15, timestamp: '2024-01-15T09:15:00Z', status: 'success', user: 'Staff' },
  { id: '3', type: 'product-added', product: 'iPad Air M2', quantity: 0, timestamp: '2024-01-14T16:45:00Z', status: 'success', user: 'Admin' },
  { id: '4', type: 'stock-out', product: 'Nike Air Max 270', quantity: 8, timestamp: '2024-01-14T14:20:00Z', status: 'success', user: 'Staff' },
  { id: '5', type: 'product-updated', product: 'MacBook Pro M3', quantity: 0, timestamp: '2024-01-14T11:10:00Z', status: 'success', user: 'Admin' },
  { id: '6', type: 'stock-in', product: 'Sony WH-1000XM5', quantity: 25, timestamp: '2024-01-13T15:30:00Z', status: 'success', user: 'Staff' },
  { id: '7', type: 'stock-out', product: 'Adidas Ultraboost 22', quantity: 12, timestamp: '2024-01-13T13:45:00Z', status: 'success', user: 'Staff' },
  { id: '8', type: 'product-added', product: 'Dyson V15 Detect', quantity: 0, timestamp: '2024-01-12T09:20:00Z', status: 'success', user: 'Admin' }
];

// Data untuk chart mingguan (7 hari terakhir)
export const weeklyData = [
  { day: 'Mon', stockIn: 45, stockOut: 32, orders: 28 },
  { day: 'Tue', stockIn: 52, stockOut: 38, orders: 35 },
  { day: 'Wed', stockIn: 38, stockOut: 45, orders: 42 },
  { day: 'Thu', stockIn: 61, stockOut: 29, orders: 31 },
  { day: 'Fri', stockIn: 48, stockOut: 52, orders: 48 },
  { day: 'Sat', stockIn: 35, stockOut: 41, orders: 38 },
  { day: 'Sun', stockIn: 28, stockOut: 33, orders: 29 }
];
