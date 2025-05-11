import { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TPaginationSchema } from "@/schema/pagination.schema";

export const PAGINATIONLIMITS = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "100", value: "100" },
];

const PaginationSelect = ({
  setPaginationParams,
}: {
  setPaginationParams: Dispatch<SetStateAction<TPaginationSchema>>;
}) => {
  return (
    <Select
      onValueChange={(val) => {
        setPaginationParams((prev) => ({ ...prev, limit: Number(val) }));
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        {PAGINATIONLIMITS.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PaginationSelect;
