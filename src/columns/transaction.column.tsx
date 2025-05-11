import CheckboxCol from "@/components/table/CheckboxCol";
import CheckboxRow from "@/components/table/CheckboxRow";
import SortableCol from "@/components/table/SortableCol";
import type { TTransactionTable } from "@/types/table.type";
import { type ColumnDef } from "@tanstack/react-table";

export const transactionColumns: ColumnDef<TTransactionTable>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => <CheckboxCol table={table} />,
    cell: ({ row }) => <CheckboxRow row={row} />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableCol label="Amount" column={column} />,
    enableSorting: true,
  },
  {
    accessorKey: "purpose",
    header: ({ column }) => <SortableCol label="Purpose" column={column} />,
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableCol label="Date" column={column} />,
    enableSorting: true,
  },
  {
    accessorKey: "time",
    header: ({ column }) => <SortableCol label="Time" column={column} />,
    enableSorting: true,
  },
];
