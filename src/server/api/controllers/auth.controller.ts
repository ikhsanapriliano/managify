import { registerSchema } from "@/schema/auth";
import { publicProcedure } from "../trpc";
import { registerService } from "../services/auth.service";
import { handleTRPCError } from "@/lib/error";

export const registerController = publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
        try {
            await registerService(input)
            return null
        } catch (error: Error | unknown) {
            handleTRPCError(error)
        }
    })