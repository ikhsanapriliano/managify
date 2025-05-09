import { handleTRPCError } from "@/lib/error";
import { transformDateFilter, transformFilters } from "@/lib/filter";
import type {
  TTransactionCreateSchema,
  TTransactionFilterSchema,
} from "@/schema/finance.schema";
import { db } from "@/server/db";
import type { TTransaction } from "@/types/finance.type";
import { newTransactions } from "../dto/finance.dto";
import { getUserId } from "@/lib/utils";

export const findTransactionsService = async (
  payload?: TTransactionFilterSchema,
): Promise<TTransaction[] | undefined> => {
  try {
    const userId = await getUserId();
    const filters = transformFilters<TTransactionFilterSchema>(payload);
    const dateFilter = transformDateFilter(filters.startDate, filters.endDate);

    const data = await db.transaction.findMany({
      where: {
        ...dateFilter,
        userId,
      },
    });

    return newTransactions(data);
  } catch (error: Error | unknown) {
    handleTRPCError(error);
  }
};

export const createTransactionService = async (
  payload: TTransactionCreateSchema,
): Promise<null | undefined> => {
  try {
    const userId = await getUserId();

    await db.transaction.create({
      data: {
        ...payload,
        userId,
      },
    });

    return null;
  } catch (error: Error | unknown) {
    handleTRPCError(error);
  }
};
