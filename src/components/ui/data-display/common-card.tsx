import { Users } from "lucide-react";

type CardSummaryProps = {
  title: string;
  value: string | number;
  isIcon ?: boolean;
  description?: string;
};

export default function CommonCard({
  title,
  value,
  isIcon = false,
  description = "",
}: CardSummaryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-none">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#EEF4FF] px-4 py-2 rounded-t-xl">
        <div className="flex items-center gap-2">
          { isIcon && <Users className="text-black w-4 h-4" />}
          <p className="text-sm text-black font-medium">{title}</p>
        </div>
        {/* <MoreHorizontal className="text-gray-400 w-4 h-4" /> */}
      </div>

      {/* Isi konten */}
      <div className="px-6 py-4">
        {/* Nilai utama */}
        <p className="text-3xl font-semibold text-black">{value}</p>

        {/* Deskripsi */}
        {description ? (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
