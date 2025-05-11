import {
  createTransactionController,
  deleteTransactionController,
  findTransactionController,
  findTransactionsController,
  updateTransactionController,
} from "../controllers/finance.controller";
import { createTRPCRouter } from "../trpc";

export const financeRouter = createTRPCRouter({
  findTransactions: findTransactionsController,
  findTransaction: findTransactionController,
  createTransaction: createTransactionController,
  updateTransaction: updateTransactionController,
  deleteTransaction: deleteTransactionController,
});
