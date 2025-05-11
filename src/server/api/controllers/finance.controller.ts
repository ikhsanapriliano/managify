import { publicProcedure } from "../trpc";
import {
  transactionCreateSchema,
  transactionDeleteSchema,
  transactionDetailSchema,
  transactionFilterSchema,
  transactionUpdateSchema,
} from "@/schema/finance.schema";
import {
  createTransactionService,
  deleteTransactionService,
  findTransactionService,
  findTransactionsService,
  updateTransactionService,
} from "../services/finance.service";

export const findTransactionsController = publicProcedure
  .input(transactionFilterSchema.optional())
  .query(async ({ input }) => {
    return await findTransactionsService(input);
  });

export const findTransactionController = publicProcedure
  .input(transactionDetailSchema)
  .query(async ({ input }) => {
    return await findTransactionService(input);
  });

export const createTransactionController = publicProcedure
  .input(transactionCreateSchema)
  .mutation(async ({ input }) => {
    return await createTransactionService(input);
  });

export const updateTransactionController = publicProcedure
  .input(transactionUpdateSchema)
  .mutation(async ({ input }) => {
    return await updateTransactionService(input);
  });

export const deleteTransactionController = publicProcedure
  .input(transactionDeleteSchema)
  .mutation(async ({ input }) => {
    return await deleteTransactionService(input);
  });
