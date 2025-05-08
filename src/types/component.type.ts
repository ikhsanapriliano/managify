import type { UseFormReturn } from "react-hook-form";

export type TCInput = {
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  placeholder: string;
  className?: string;
  classNameParent?: string;
};
