import { useMemo } from "react";

export function InfoGradientIcon({
  className = "h-5 w-5",
  from = "#2E90FA",
  to = "#A43DF2",
  size = 24,
}: {
  className?: string;
  from?: string;
  to?: string;
  size?: number;
}) {
  // make a safe unique id once (no colons)
  const gradId = useMemo(
    () => `grad-${Math.random().toString(36).slice(2)}`,
    []
  );

  return (
    <svg
      width={size}
      height={size}
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

      {/* Info icon (lucide-style) */}
      <circle cx="12" cy="12" r="10" stroke={`url(#${gradId})`} />
      <path d="M12 16v-4" stroke={`url(#${gradId})`} />
      <path d="M12 8h.01" stroke={`url(#${gradId})`} />
    </svg>
  );
}
