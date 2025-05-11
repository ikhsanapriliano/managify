import type { TTransactionTable } from "./table.type";

export type TTransaction = {
  id: string;
  amount: bigint;
  purpose: string;
  time: string;
  date: string;
  isEdited: boolean;
};

export type TTransactions = {
  total: string;
  items: TTransactionTable[];
};
