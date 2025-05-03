import { registerSchema } from "@/schema/auth";
import { publicProcedure } from "../trpc";
import { registerService } from "../services/auth.service";

export const registerController = publicProcedure
  .input(registerSchema)
  .mutation(async ({ input }) => {
    await registerService(input);
    return null;
  });
