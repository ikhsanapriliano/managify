import type { TCInput } from "@/types/component.type";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const CInputText = ({
  type = "text",
  name,
  form,
  label,
  placeholder,
}: TCInput) => {
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
              <Input
                placeholder={placeholder}
                type={type}
                className={cn(
                  fieldError && "!border-red-500 focus-visible:!ring-red-500",
                )}
                onKeyDown={(e) => {
                  form.clearErrors();

                  if (
                    type === "tel" &&
                    !/^\d$/.test(e.key) &&
                    ![
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ].includes(e.key) &&
                    !(e.ctrlKey || e.metaKey)
                  ) {
                    e.preventDefault();
                  }
                }}
                onFocus={() => {
                  if (type === "tel" && field.value === 0) {
                    form.setValue(name, "");
                  }
                }}
                {...field}
                onChange={(e) => {
                  if (type === "tel") {
                    form.setValue(name, Number(e.target.value));
                  } else {
                    field.onChange(e);
                  }
                }}
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
