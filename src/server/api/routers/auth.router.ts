import { registerController } from "../controllers/auth.controller";
import { createTRPCRouter } from "../trpc";

export const authRouter = createTRPCRouter({
  register: registerController,
});
