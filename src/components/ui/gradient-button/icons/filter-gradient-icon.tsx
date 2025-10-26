import { useMemo } from "react";

export function FilterGradientIcon({
  className = "h-5 w-5",
  from = "#2E90FA",
  to = "#A43DF2",
}: {
  className?: string;
  from?: string;
  to?: string;
}) {
  // make a safe unique id once (no colons)
  const gradId = useMemo(
    () => `grad-${Math.random().toString(36).slice(2)}`,
    []
  );

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      {/* Funnel shape (lucide-style) */}
      <polygon
        points="22 3 2 3 10 12 10 19 14 21 14 12 22 3"
        stroke={`url(#${gradId})`}
      />
    </svg>
  );
}
