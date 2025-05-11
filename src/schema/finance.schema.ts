import { z } from "zod";

export const transactionFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  purpose: z.string().optional(),
});

export type TTransactionFilterSchema = z.infer<typeof transactionFilterSchema>;

export const transactionDetailSchema = z.object({
  id: z.string(),
});

export type TTransactionDetailSchema = z.infer<typeof transactionDetailSchema>;

export const transactionCreateSchema = z.object({
  amount: z.number().min(500),
  purpose: z.string().min(5),
});

export type TTransactionCreateSchema = z.infer<typeof transactionCreateSchema>;

export const transactionUpdateSchema = transactionCreateSchema.extend({
  id: z.string(),
});

export type TTransactionUpdateSchema = z.infer<typeof transactionUpdateSchema>;

export const transactionDeleteSchema = z.object({
  ids: z.string().array(),
});

export type TTransactionDeleteSchema = z.infer<typeof transactionDeleteSchema>;
