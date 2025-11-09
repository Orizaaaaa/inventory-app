import { useState } from 'react';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { Package, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import PaginationWrapper from '@/components/ui/pagination-wrapper';

interface TopProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface InventoryTableProps {
  data: TopProduct[];
  className?: string;
}

const statusConfig = {
  'in-stock': {
    label: 'In Stock',
    color: 'bg-green-100 text-green-800',
    icon: TrendingUp
  },
  'low-stock': {
    label: 'Low Stock',
    color: 'bg-yellow-100 text-yellow-800',
    icon: AlertTriangle
  },
  'out-of-stock': {
    label: 'Out of Stock',
    color: 'bg-red-100 text-red-800',
    icon: TrendingDown
  }
};

export function InventoryTable({ data, className }: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const columns = [
    {
      key: 'product',
      header: 'Product',
      render: (item: TopProduct) => (
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <Package className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">{item.category}</p>
          </div>
        </div>
      )
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (item: TopProduct) => (
        <div className="text-start">
          <p className="font-medium text-gray-900 text-sm">{item.stock}</p>
          <p className="text-xs text-gray-500">units</p>
        </div>
      )
    },
    {
      key: 'price',
      header: 'Price',
      render: (item: TopProduct) => (
        <div className="text-start">
          <p className="font-medium text-gray-900 text-sm">
            Rp {item.price.toLocaleString('id-ID')}
          </p>
        </div>
      )
    },
    {
      key: 'sales',
      header: 'Sales',
      render: (item: TopProduct) => (
        <div className="text-start">
          <p className="font-medium text-gray-900 text-sm">{item.sales}</p>
          <p className="text-xs text-gray-500">units sold</p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: TopProduct) => {
        const config = statusConfig[item.status];
        const IconComponent = config.icon;
        
        return (
          <div className="flex justify-center">
            <Badge className={cn("flex items-center space-x-1 text-xs px-5 py-2 border-hidden w-full", config.color)}>
              <IconComponent className="h-3 w-3" />
              <span>{config.label}</span>
            </Badge>
          </div>
        );
      }
    }
  ];


  return (
    <div className={cn("bg-white rounded-xl  border border-gray-100", className)}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Top Selling Products</h3>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="[&_tr]:border-b [&_tr]:border-gray-200">
          <TBody>
            {paginatedData.map((item) => (
              <Tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <Td key={column.key} className="py-2 px-3">
                    {column.render ? column.render(item) : item[column.key as keyof TopProduct]}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100">
        <PaginationWrapper
          totalRows={data.length}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          defaultRowsPerPage={5}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    </div>
  );
}

interface ActivityTableProps {
  data: Array<{
    id: string;
    type: 'stock-in' | 'stock-out' | 'product-added' | 'product-updated';
    product: string;
    quantity: number;
    timestamp: string;
    status: 'success' | 'pending' | 'failed';
    user: string;
  }>;
  className?: string;
}

const activityTypeConfig = {
  'stock-in': {
    label: 'Stock In',
    color: 'bg-green-100 text-green-800',
    icon: '↗️'
  },
  'stock-out': {
    label: 'Stock Out',
    color: 'bg-red-100 text-red-800',
    icon: '↘️'
  },
  'product-added': {
    label: 'Product Added',
    color: 'bg-blue-100 text-blue-800',
    icon: '➕'
  },
  'product-updated': {
    label: 'Product Updated',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '✏️'
  }
};

const statusColorConfig = {
  success: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800'
};

export function ActivityTable({ data, className }: ActivityTableProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100", className)}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex space-x-2">
            <button className="text-sm text-gray-500 hover:text-gray-700">Filter</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">Sort</button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <THead>
            <Tr>
              <Th>Type</Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Status</Th>
              <Th>User</Th>
              <Th>Date</Th>
            </Tr>
          </THead>
          <TBody className='text-start'>
            {data.map((item) => {
              const typeConfig = activityTypeConfig[item.type];
              
              return (
                <Tr key={item.id} className="hover:bg-gray-50">
                  <Td className='text-start'>
                    <Badge className={cn("flex items-center space-x-1", typeConfig.color)}>
                      <span>{typeConfig.icon}</span>
                      <span>{typeConfig.label}</span>
                    </Badge>
                  </Td>
                  <Td className="font-medium text-gray-900">{item.product}</Td>
                  <Td className="text-center">
                    {item.quantity > 0 ? '+' : ''}{item.quantity}
                  </Td>
                  <Td>
                    <Badge className={statusColorConfig[item.status]}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </Td>
                  <Td className="text-gray-600">{item.user}</Td>
                  <Td className="text-gray-500 text-sm">{formatDate(item.timestamp)}</Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
