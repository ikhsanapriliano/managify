import { cn } from "@/lib/utils";

const PaginationButton = ({
  title,
  action,
  isDisabled,
}: {
  title: string;
  action: VoidFunction;
  isDisabled: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={action}
      disabled={isDisabled}
      className={cn(
        "rounded-md border px-4 py-2",
        !isDisabled ? "hover:bg-gray-100" : "bg-gray-50",
      )}
    >
      {title}
    </button>
  );
};

export default PaginationButton;
