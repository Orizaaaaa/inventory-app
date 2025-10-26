import React from 'react';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { Package, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

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
  const columns = [
    {
      key: 'product',
      header: 'Product',
      render: (item: TopProduct) => (
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        </div>
      )
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (item: TopProduct) => (
        <div className="text-start">
          <p className="font-medium text-gray-900">{item.stock}</p>
          <p className="text-xs text-gray-500">units</p>
        </div>
      )
    },
    {
      key: 'price',
      header: 'Price',
      render: (item: TopProduct) => (
        <div className="text-start ">
          <p className="font-medium text-gray-900">
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
          <p className="font-medium text-gray-900">{item.sales}</p>
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
            <Badge className={cn("flex items-center space-x-1", config.color)}>
              <IconComponent className="h-3 w-3" />
              <span>{config.label}</span>
            </Badge>
          </div>
        );
      }
    }
  ];

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100", className)}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="[&_tr]:border-b [&_tr]:border-gray-200">
          <THead className="bg-neutral-100">
            <Tr>
              {columns.map((column) => (
                <Th key={column.key} className="text-left">
                  {column.header}
                </Th>
              ))}
            </Tr>
          </THead>
          <TBody>
            {data.map((item) => (
              <Tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <Td key={column.key}>
                    {column.render ? column.render(item) : item[column.key as keyof TopProduct]}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </Table>
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
