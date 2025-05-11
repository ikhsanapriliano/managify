import { useQueryStates } from "nuqs";
import { transactionFilterParser } from "./parser.search-params";

export const useTransactionFilter = () => {
  const [state, setState] = useQueryStates(transactionFilterParser);
  return { filter: state, setFilter: setState };
};
