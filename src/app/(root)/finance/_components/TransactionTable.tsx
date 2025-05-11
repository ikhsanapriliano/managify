"use client";

import { transactionColumns } from "@/columns/transaction.column";
import { DateRangePicker } from "@/components/shared/DateRangePicker";
import FilterContainer from "@/components/shared/FilterContainer";
import SearchFilter from "@/components/shared/SearchFilter";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { cn, toDateSchema, transformSearchParams } from "@/lib/utils";
import { useTransactionFilter } from "@/search-params/client.search-params";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuPlus, LuTrash } from "react-icons/lu";
import { addDays, format } from "date-fns";
import { handleTRPCClientError } from "@/lib/error";
import { showSuccess } from "@/lib/toaster";

const TransactionTable = () => {
  const router = useRouter();
  const { filter, setFilter } = useTransactionFilter();
  const transformedFilter = transformSearchParams(filter);
  const startDate = toDateSchema(filter.startDate);
  const endDate = toDateSchema(
    filter.endDate && filter.startDate === filter.endDate
      ? format(addDays(filter.endDate, 1), "yyyy-MM-dd")
      : filter.endDate,
  );
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const { data, isLoading, refetch } = api.finance.findTransactions.useQuery({
    ...transformedFilter,
    startDate: startDate ?? startOfMonth,
    endDate: endDate ?? endOfMonth,
  });
  const [rowSelection, setRowSelection] = useState({});
  const deleteTransaction = api.finance.deleteTransaction.useMutation({
    onSuccess: () => {
      showSuccess("delete transaction success");
      setRowSelection({});
      refetch();
    },
    onError: (error) => {
      handleTRPCClientError(error.data);
    },
  });

  const handleBatchDelete = () => {
    const ids = Object.keys(rowSelection);
    deleteTransaction.mutate({ ids });
  };

  return (
    <div className="relative flex flex-col gap-4">
      <FilterContainer>
        <SearchFilter
          placeholder="Search Purpose"
          field="purpose"
          value={filter.purpose}
          setValues={setFilter}
        />
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <DateRangePicker
            setFilter={setFilter}
            startDate={startDate}
            endDate={endDate}
          />
          {Object.keys(rowSelection).length > 0 ? (
            <Button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
              onClick={handleBatchDelete}
            >
              <LuTrash />
              Delete Transaction
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                router.push("/finance/add");
              }}
            >
              <LuPlus />
              Add Transaction
            </Button>
          )}
        </div>
      </FilterContainer>
      <div className={cn("mt-2 flex items-center gap-2")}>
        <p>Total Amount:</p>
        <p className="font-semibold">{data?.total}</p>
      </div>
      <DataTable
        columns={transactionColumns}
        data={data?.items ?? []}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};

export default TransactionTable;
