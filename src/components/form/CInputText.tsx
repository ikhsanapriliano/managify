import type { TCInput } from "@/types/component";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const CInputText = ({
  name,
  form,
  label,
  placeholder,
  isPassword,
}: TCInput & {
  isPassword?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const fieldError = fieldState.error?.message;

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                placeholder={placeholder}
                type={isPassword ? "password" : "text"}
                className={cn(
                  fieldError && "!border-red-500 focus-visible:!ring-red-500",
                )}
                onKeyDown={() => {
                  form.clearErrors();
                }}
                {...field}
              />
            </FormControl>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </FormItem>
        );
      }}
    />
  );
};

export default CInputText;
