"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginSchema } from "@/schema/auth.schema";
import { Form } from "@/components/ui/form";
import CInputText from "@/components/form/CInputText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { showError } from "@/lib/toaster";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: TLoginSchema) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if (res) {
      setIsLoading(false);
      if (res.error) {
        showError("Login Failed!", "incorrect username or password");
        return;
      }

      router.push("/");
    }
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
          name="password"
          label="Password"
          placeholder="Password"
          isPassword
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <div className="flex justify-center gap-1 text-sm">
            <p>not registered?</p>
            <Link href={"/register"} className="underline">
              register
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
