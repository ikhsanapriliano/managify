import { Checkbox } from "@/components/ui/checkbox";
import { type Table } from "@tanstack/react-table";

const CheckboxCol = ({ table }: { table: Table<any> }) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};

export default CheckboxCol;
