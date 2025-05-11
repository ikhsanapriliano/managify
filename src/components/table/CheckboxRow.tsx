import { Checkbox } from "@/components/ui/checkbox";
import { type Row } from "@tanstack/react-table";

const CheckboxRow = ({ row }: { row: Row<any> }) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};

export default CheckboxRow;
