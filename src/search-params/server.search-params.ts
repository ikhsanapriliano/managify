import type { SearchParams } from "next/dist/server/request/search-params";
import { createLoader } from "nuqs/server";
import { transactionFilterParser } from "./parser.search-params";

export const loadTransactionSearchParams = (searchParams: SearchParams) => {
  const loader = createLoader(transactionFilterParser);
  return loader(searchParams);
};
