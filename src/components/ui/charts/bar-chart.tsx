import React from 'react';
import { cn } from '@/utils/cn';

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  className?: string;
  showValues?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export function BarChart({ 
  data, 
  height = 300, 
  className,
  showValues = true,
  orientation = 'vertical'
}: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  if (orientation === 'horizontal') {
    return (
      <div className={cn("w-full", className)}>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                {showValues && (
                  <span className="font-medium text-gray-900">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || '#3B82F6'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div 
        className="flex items-end justify-between space-x-1 h-full"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 flex-1">
            {showValues && (
              <span className="text-xs font-medium text-gray-600">
                {item.value.toLocaleString()}
              </span>
            )}
            <div
              className="w-full rounded-t-md transition-all duration-500 ease-out hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#3B82F6',
                minHeight: '4px'
              }}
            />
            <span className="text-xs text-gray-500 text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
