import React from "react";

type PresetColor =
  | "gray"
  | "blue"
  | "purple"
  | "green"
  | "red"
  | "orange"
  | "chocolate"
  | "yellow"
  | "sage"
  | "brown";

const presetColors: Record<
  PresetColor,
  { text: string; bg: string; border: string; dot: string }
> = {
  gray: { text: "#667085", bg: "#F0F1F3", border: "#D0D3D9", dot: "#667085" },
  blue: { text: "#2866C8", bg: "#EAF0FA", border: "#BCD0EE", dot: "#2866C8" },
  purple: { text: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe", dot: "#8b5cf6" },
  green: { text: "#22c55e", bg: "#ecfdf5", border: "#bbf7d0", dot: "#22c55e" },
  red: { text: "#FF0000", bg: "#FFE6E6", border: "#FFB0B0", dot: "#FF0000" },
  orange: { text: "#F79009", bg: "#FEF4E6", border: "#FDDDB3", dot: "#F79009" },
  brown: { text: "#7F5539", bg: "#F2EEEB", border: "#CBBFB6", dot: "#7F5539" },
  chocolate: { text: "#D2691E", bg: "#FFF0E6", border: "#FFD1B3", dot: "#D2691E" },
  yellow: { text: "#EAB308", bg: "#FFFBEB", border: "#FEF3C7", dot: "#EAB308" },
  sage: { text: "#0f766e", bg: "#ecfdfd", border: "#bbf7f7", dot: "#0f766e" },
};

interface PillProps {
  label: React.ReactNode;
  color?: PresetColor | string; // preset atau custom hex
  width?: number | string; // OPTIONAL: lebar total pill (px/rem/ch/…)
}

export const Pill: React.FC<PillProps> = ({ label, color = "gray", width }) => {
  const isPreset = (c: string): c is PresetColor => c in presetColors;
  const resolvedWidth =
    typeof width === "number" ? `${width}px` : width ?? undefined;

  const style = isPreset(color)
    ? {
        color: presetColors[color].text,
        backgroundColor: presetColors[color].bg,
        borderColor: presetColors[color].border,
        width: resolvedWidth, // lebar total pill (termasuk padding)
      }
    : {
        color: color,
        backgroundColor: `${color}20`,
        borderColor: `${color}40`,
        width: resolvedWidth,
      };

  return (
    <span
      className="inline-flex items-center rounded-full border px-5 py-1.5 text-xs sm:text-sm whitespace-nowrap"
      style={style}
    >
      {label}
    </span>
  );
};

interface StatusPillProps {
  label: string;
  color?: PresetColor | string;
  /** OPTIONAL: custom width. Default = "12ch" (semua seragam) */
  width?: number | string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  label,
  color = "gray",
  width = "18ch", // DEFAULT: panjang seragam untuk semua StatusPill
}) => {
  const isPreset = (c: string): c is PresetColor => c in presetColors;
  const dotColor = isPreset(color) ? presetColors[color].dot : color;

  return (
    <Pill
      color={color}
      width={width}
      label={
        <span className="inline-flex items-center justify-center gap-2 w-full overflow-hidden text-center">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
          <span className="truncate">{label}</span>
        </span>
      }
    />
  );
};
