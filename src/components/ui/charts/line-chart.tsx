import React from 'react';
import { cn } from '@/utils/cn';

interface LineChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  className?: string;
  showDots?: boolean;
  showArea?: boolean;
  gridLines?: boolean;
}

export function LineChart({ 
  data, 
  height = 300, 
  className,
  showDots = true,
  showArea = false,
  gridLines = true
}: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className={cn("w-full", className)}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {gridLines && (
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
            </pattern>
          </defs>
        )}
        
        {gridLines && <rect width="100%" height="100%" fill="url(#grid)" />}
        
        {/* Area fill */}
        {showArea && (
          <polygon
            points={areaPoints}
            fill="url(#gradient)"
            opacity={0.1}
          />
        )}
        
        {/* Gradient definition for area */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />
        
        {/* Dots */}
        {showDots && data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value - minValue) / range) * 100;
          
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="#3B82F6"
              className="transition-all duration-500 ease-out hover:r-6"
            />
          );
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {data.map((item, index) => (
          <span key={index} className="text-center">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
