import { publicProcedure } from "../trpc";
import { transactionFilterSchema } from "@/schema/finance.schema";
import { findTransactionsService } from "../services/finance.service";

export const findTransactionsController = publicProcedure
  .input(transactionFilterSchema.optional())
  .query(async ({ input }) => {
    return await findTransactionsService(input);
  });
