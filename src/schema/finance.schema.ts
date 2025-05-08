import { z } from "zod";

export const transactionFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type TTransactionFilterSchema = z.infer<typeof transactionFilterSchema>;

export const transactionCreateSchema = z.object({
  amount: z.number(),
  purpose: z.string(),
});

export type TTransactionCreateSchema = z.infer<typeof transactionCreateSchema>;
