"use client";

import { cn } from "@/lib/utils";
import type { FormEventHandler } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  cancelRoute: string;
  children: React.ReactNode;
};

const FormLayout = ({
  title,
  onSubmit,
  isLoading,
  cancelRoute,
  children,
}: Props) => {
  const router = useRouter();

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4")}>
      <h2>{title}</h2>
      {children}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            router.push(cancelRoute);
          }}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading}>Submit</Button>
      </div>
    </form>
  );
};

export default FormLayout;
