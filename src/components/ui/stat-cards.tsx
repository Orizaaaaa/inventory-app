import React from 'react';
import { cn } from '@/utils/cn';
import type { LucideIcon } from 'lucide-react';


interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  trend?: {
    data: number[];
    period: string;
  };
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-600',
  className,
  trend
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="flex items-center space-x-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  change.type === 'increase' ? "text-green-600" : "text-red-600"
                )}
              >
                {change.type === 'increase' ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-500">
                {change.period && `vs ${change.period}`}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-lg bg-blue-50", iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Trend {trend.period}</span>
            <span>{trend.data[trend.data.length - 1]}%</span>
          </div>
          <div className="flex space-x-1">
            {trend.data.map((point, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-100 rounded-sm"
                style={{ height: `${Math.max(point, 2)}px` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface StatCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function StatCardGrid({ children, className }: StatCardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {children}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  className?: string;
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    accent: 'bg-blue-500'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    accent: 'bg-green-500'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    accent: 'bg-red-500'
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    accent: 'bg-yellow-500'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    accent: 'bg-purple-500'
  }
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  className
}: MetricCardProps) {
  const colors = colorVariants[color];
  
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-lg", colors.bg)}>
            <Icon className={cn("h-6 w-6", colors.icon)} />
          </div>
        )}
      </div>
      <div className={cn("mt-4 h-1 w-full rounded-full", colors.accent)} />
    </div>
  );
}
