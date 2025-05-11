import type { TTransactionFilterSchema } from "@/schema/finance.schema";
import { parseAsString } from "nuqs/server";

export const transactionFilterParser: Record<
  keyof TTransactionFilterSchema,
  typeof parseAsString
> = {
  startDate: parseAsString,
  endDate: parseAsString,
  purpose: parseAsString,
};
