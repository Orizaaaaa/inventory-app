import React, { useState } from "react";
import { Star } from "lucide-react";

const StarIcon = ({ filled, onClick, readonly, className }: { filled: boolean; onClick: () => void; readonly?: boolean; className?: string }) => (
  <Star
    onClick={readonly ? undefined : onClick}
    style={{
      cursor: readonly ? "default" : "pointer",
      marginRight: 4,
      opacity: readonly ? 0.8 : 1,
    }}
    className={`w-8 h-8 transition-colors ${className} ${
      filled
        ? "text-orange-500 fill-orange-500"
        : "text-black hover:text-orange-400"
    } ${readonly ? "" : ""}`}
  />
);

export default function StarRating({ 
  max = 5, 
  value = 0, 
  onChange, 
  readonly = false,
  className
}: { 
  max?: number; 
  value?: number; 
  onChange?: (val: number) => void;
  readonly?: boolean;
  className?: string;
}) {
  const [rating, setRating] = useState(value);

  const handleClick = (i: number) => {
    if (readonly) return;
    setRating(i);
    onChange && onChange(i);
  };

  const displayRating = readonly ? value : rating;

  return (
    <div className={`flex ${className}`}>
      {[...Array(max)].map((_, i) => (
        <StarIcon 
          key={i} 
          filled={i < displayRating} 
          onClick={() => handleClick(i + 1)} 
          readonly={readonly}
        />
      ))}
    </div>
  );
}