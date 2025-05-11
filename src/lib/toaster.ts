import { toast } from "sonner";

export const showSuccess = (description: string) => {
  toast.success("Action Success!", {
    description,
    className: "!text-black",
    descriptionClassName: "!text-gray-600",
  });
};

export const showError = (title: string, description: string) => {
  toast.error(`${title}!`, {
    description,
    className: "!bg-red-400 !text-white",
  });
};
