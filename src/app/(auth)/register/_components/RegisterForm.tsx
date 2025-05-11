"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type TRegisterSchema } from "@/schema/auth.schema";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import CInputText from "@/components/form/CInputText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { handleTRPCClientError } from "@/lib/error";
import { showSuccess } from "@/lib/toaster";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const mutation = api.auth.register.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      showSuccess("register success");
      router.push("/login");
    },
    onError: (error) => {
      handleTRPCClientError(error.data, form);
    },
  });

  const onSubmit = (values: TRegisterSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[400px] flex-col gap-6 rounded-lg border p-6"
      >
        <h1>Managify</h1>
        <CInputText
          form={form}
          name="username"
          label="Username"
          placeholder="Username"
        />
        <CInputText
          form={form}
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
        <CInputText
          form={form}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
          <div className="flex justify-center gap-1 text-sm">
            <p>already registered?</p>
            <Link href={"/login"} className="underline">
              login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
