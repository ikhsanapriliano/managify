import { handleTRPCError } from "@/lib/error";
import {
  transformDateFilter,
  transformFilters,
  transformLikeFilter,
} from "@/lib/filter";
import type {
  TTransactionCreateSchema,
  TTransactionDeleteSchema,
  TTransactionDetailSchema,
  TTransactionFilterSchema,
  TTransactionUpdateSchema,
} from "@/schema/finance.schema";
import { db } from "@/server/db";
import type { TTransaction, TTransactions } from "@/types/finance.type";
import { newTransaction, newTransactions } from "../dto/finance.dto";
import { getUserId } from "@/lib/utils";
import { CDetailNotFoundError } from "@/types/global.type";
import { formatRupiah } from "@/lib/formatter";

export const findTransactionsService = async (
  payload?: TTransactionFilterSchema,
): Promise<TTransactions | undefined> => {
  try {
    const userId = await getUserId();
    const { startDate, endDate, ...filters } =
      transformFilters<TTransactionFilterSchema>(payload);
    const dateFilter = transformDateFilter(startDate, endDate);

    const data = await db.transaction.findMany({
      where: {
        ...dateFilter,
        purpose: transformLikeFilter(filters.purpose),
        userId,
      },
    });

    return {
      total: formatRupiah(
        data.reduce((sum, current) => sum + current.amount, 0n),
      ),
      items: newTransactions(data),
    };
  } catch (error: Error | unknown) {
    handleTRPCError(error);
  }
};

export const findTransactionService = async (
  payload: TTransactionDetailSchema,
): Promise<TTransaction | undefined> => {
  try {
    const userId = await getUserId();
    const filters = transformFilters<TTransactionDetailSchema>(payload);

    const data = await db.transaction.findFirst({
      where: {
        ...filters,
        userId,
      },
    });

    if (!data) {
      throw new CDetailNotFoundError("transaction not found");
    }

    return newTransaction(data);
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

export const updateTransactionService = async (
  payload: TTransactionUpdateSchema,
): Promise<null | undefined> => {
  try {
    const { id, ...body } = payload;
    const userId = await getUserId();

    await db.transaction.update({
      where: {
        id,
        userId,
      },
      data: {
        ...body,
      },
    });

    return null;
  } catch (error: Error | unknown) {
    handleTRPCError(error);
  }
};

export const deleteTransactionService = async (
  payload: TTransactionDeleteSchema,
): Promise<null | undefined> => {
  try {
    const userId = await getUserId();

    await db.transaction.deleteMany({
      where: {
        id: {
          in: payload.ids,
        },
        userId,
      },
    });

    return null;
  } catch (error: Error | unknown) {
    handleTRPCError(error);
  }
};
