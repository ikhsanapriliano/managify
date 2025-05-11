import { formatRupiah } from "@/lib/formatter";
import type { TTransaction } from "@/types/finance.type";
import type { TTransactionTable } from "@/types/table.type";
import type { Transaction } from "@prisma/client";

export const newTransaction = (payload: Transaction): TTransaction => {
  return {
    id: payload.id,
    amount: payload.amount,
    purpose: payload.purpose,
    time: payload.createdAt.toLocaleTimeString("id-ID"),
    date: payload.createdAt.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    isEdited: payload.createdAt != payload.updatedAt,
  };
};

export const newTransactions = (
  payload: Transaction[],
): TTransactionTable[] => {
  const result: TTransactionTable[] = [];

  payload.forEach((item) => {
    result.push({
      id: item.id,
      amount: formatRupiah(item.amount),
      purpose: item.purpose,
      time:
        item.createdAt
          .toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(".", ":") + " WIB",
      date: item.createdAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
  });

  return result;
};
