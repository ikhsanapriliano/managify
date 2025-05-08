import { findTransactionsController } from "../controllers/finance.controller";
import { createTRPCRouter } from "../trpc";

export const financeRouter = createTRPCRouter({
  findTransactions: findTransactionsController,
});
