import type { TCInput } from "@/types/component.type";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const CInputTextArea = ({ name, form, label, placeholder }: TCInput) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const fieldError = fieldState.error?.message;

        return (
          <FormItem>
            {label && <FormLabel className="font-normal">{label}</FormLabel>}
            <FormControl>
              <Textarea
                placeholder={placeholder}
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

export default CInputTextArea;
