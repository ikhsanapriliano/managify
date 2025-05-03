import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
