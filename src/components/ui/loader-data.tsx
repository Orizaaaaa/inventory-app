
import dataNotFounds from "@/assets/icons/data-not-found.svg";
import dataNotFoundsWhite from "@/assets/images/table_empty_data.png";
import TableSkeleton from "./table-skeleton";

interface LoaderDataProps<T = unknown> {
  data?: T[];
  loading: boolean;
  colCount?: number;
  rowCount?: number;
  headClassName?: string;
  bodyClassName?: string;
  variant?: "blue" | "white";
}

export default function LoaderData<T = unknown>({
  data = [],
  loading,
  colCount = 10,
  rowCount = 10,
  headClassName = "",
  bodyClassName = "",
  variant = "blue",
}: LoaderDataProps<T>) {
  if (loading) {
    return (
      <TableSkeleton
        colCount={colCount}
        rowCount={rowCount}
        headClassName={headClassName}
        bodyClassName={bodyClassName}
      />
    );
  }

  if (!loading && data.length === 0) {
    if (variant === "blue") {
      return (
        <div className="flex flex-col items-center justify-center gap-12 py-40 border border-[#D0D3D9] rounded-lg bg-blue-50">
          <img
            className="object-contain w-[max]"
            src={dataNotFounds}
            alt="Data Not Available"
          />
          <div className="font-[500] text-[16px]">Data not available</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center gap-12 py-[60px] border border-grey-100 rounded-lg ">
        <div className="flex flex-col items-center gap-3">
          <img
            className="object-contain w-[120px]"
            src={dataNotFoundsWhite}
            alt="Data Not Available"
          />
          <div className="text-neutral-7 text-2xl font-semibold">
            Data not available
          </div>
        </div>
      </div>
    );
  }

  return null;
}
