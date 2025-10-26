import React, { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
    max?: number;
    value?: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
    size?: number;
};

export default function StarRating({
    max = 5,
    value = 0,
    onChange,
    readOnly = false,
    size = 24,
}: StarRatingProps) {
    const [hovered, setHovered] = useState(0);

    const handleClick = (star: number) => {
        if (readOnly) return;
        // toggle: kalau klik star yang sama → reset jadi 0
        if (value === star) {
            onChange?.(0);
        } else {
            onChange?.(star);
        }
    };

    return (
        <div className="flex gap-1">
            {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`cursor-pointer transition-colors ${(hovered || value) >= star
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-neutral-6"
                        }`}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !readOnly && setHovered(star)}
                    onMouseLeave={() => !readOnly && setHovered(0)}
                />
            ))}
        </div>
    );
}