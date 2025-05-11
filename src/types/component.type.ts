import type { UseFormReturn } from "react-hook-form";

export type TCInput = {
  type?: "text" | "password" | "tel";
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  placeholder: string;
  className?: string;
  classNameParent?: string;
};
