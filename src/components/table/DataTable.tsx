"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction, useState } from "react";
import Spinner from "../shared/Spinner";
import type { TPagination } from "@/types/global.type";
import type { TPaginationSchema } from "@/schema/pagination.schema";
import Pagination from "./Pagination";

const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  rowSelection,
  setRowSelection,
  pagination,
  paginationParams,
  setPaginationParams,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  rowSelection: {};
  setRowSelection: Dispatch<SetStateAction<{}>>;
  pagination?: TPagination;
  paginationParams?: TPaginationSchema;
  setPaginationParams?: Dispatch<SetStateAction<TPaginationSchema>>;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row: any) => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    },
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isAction = header.column.columnDef.header === "Action";
                  const isCheckbox = header.column.id === "select";
                  const isThumbnail =
                    header.column.columnDef.header === "Thumbnail";

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "bg-gray-100 p-5 font-semibold text-black",
                        isAction && "sticky right-0 w-[180px]",
                        isCheckbox && "sticky left-0 w-[55px] min-w-[55px]",
                        isThumbnail && "w-[120px]",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="mx-auto w-fit">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isAction = cell.column.columnDef.header === "Action";
                    const isCheckbox = cell.column.id === "select";

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "bg-white p-5",
                          isAction && "sticky right-0",
                          isCheckbox && "sticky left-0",
                        )}
                      >
                        <div className="line-clamp-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && paginationParams && setPaginationParams && (
        <Pagination
          pagination={pagination}
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
        />
      )}
    </>
  );
};

export default DataTable;
