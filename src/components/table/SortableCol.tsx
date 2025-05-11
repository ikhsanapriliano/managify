import { cn } from "@/lib/utils";
import { type Column } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";

const SortableCol = ({
  label,
  column,
}: {
  label: string;
  column: Column<any, unknown>;
}) => {
  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex w-full min-w-[180px] items-center justify-between duration-300"
    >
      <p>{label}</p>
      <LuArrowUpDown
        size={16}
        className={cn(
          "duration-300",
          column.getIsSorted() === "asc" && "rotate-180",
        )}
      />
    </button>
  );
};

export default SortableCol;
