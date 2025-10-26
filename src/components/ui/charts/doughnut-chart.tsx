import React from 'react';
import { cn } from '@/utils/cn';

interface DoughnutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  size?: number;
  className?: string;
  showLegend?: boolean;
  showValues?: boolean;
}

export function DoughnutChart({ 
  data, 
  size = 200, 
  className,
  showLegend = true,
  showValues = true
}: DoughnutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - 20) / 2;
  const strokeWidth = 30;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  let cumulativePercentage = 0;

  const createPath = (percentage: number, index: number) => {
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
    
    cumulativePercentage += percentage;
    
    return {
      strokeDasharray,
      strokeDashoffset,
      stroke: data[index].color,
      strokeWidth,
      fill: 'transparent',
      r: normalizedRadius,
      cx: size / 2,
      cy: size / 2,
      transform: 'rotate(-90deg)',
      transformOrigin: `${size / 2}px ${size / 2}px`
    };
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const pathProps = createPath(percentage, index);
            
            return (
              <circle
                key={index}
                {...pathProps}
                className="transition-all duration-500 ease-out hover:opacity-80"
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {total.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">Total</span>
        </div>
      </div>

      {showLegend && (
        <div className="space-y-2 w-full">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                {showValues && (
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {item.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {percentage}%
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
