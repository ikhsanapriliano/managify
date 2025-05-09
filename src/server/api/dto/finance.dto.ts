import type { TTransaction } from "@/types/finance.type";
import type { Transaction } from "@prisma/client";

export const newTransactions = (payload: Transaction[]): TTransaction[] => {
  const result: TTransaction[] = [];

  payload.forEach((item) => {
    result.push({
      id: item.id,
      amount: item.amount,
      purpose: item.purpose,
      date: item.createdAt.toLocaleDateString("id-ID", { day: "numeric" }),
      month: item.createdAt.toLocaleDateString("id-ID", { month: "long" }),
      year: item.createdAt.toLocaleDateString("id-ID", { year: "numeric" }),
      isEdited: item.createdAt != item.updatedAt,
    });
  });

  return result;
};
