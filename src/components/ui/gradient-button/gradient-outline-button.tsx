import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  from?: string;           // warna awal gradient
  to?: string;             // warna akhir gradient
  borderWidth?: number;    // ketebalan outline (px) — default 1.25
  radius?: number;         // sudut (px) — default 12
  innerBg?: string;        // warna isi — default #fff
};

export function GradientOutlineButton({
  children,
  leftIcon,
  rightIcon,
  onClick,
  className,
  from = "#2E90FA",
  to = "#A43DF2",
  borderWidth = 1.25,
  radius = 12,
  innerBg = "#ffffff",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2",
        "transition-[box-shadow,transform] hover:shadow-sm active:scale-[0.99]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400",
        className
      )}
      style={{
        // trik 2-layer background:
        // layer 1 (padding-box) = isi tombol (putih)
        // layer 2 (border-box)  = outline gradient
        background: `linear-gradient(${innerBg}, ${innerBg}) padding-box, linear-gradient(135deg, ${from}, ${to}) border-box`,
        border: `${borderWidth}px solid transparent`,
        borderRadius: radius,
        // biar sudut super halus di high-DPI
        WebkitBackgroundClip: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {leftIcon}
      {/* teks gradien */}
      <span
        className="font-semibold bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {children}
      </span>
      {rightIcon}
    </button>
  );
}
