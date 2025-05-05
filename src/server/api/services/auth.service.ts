import { hashPassword } from "@/lib/bcrypt";
import { handleTRPCError } from "@/lib/error";
import type { TRegisterSchema } from "@/schema/auth";
import { db } from "@/server/db";
import { CFieldError } from "@/types/global";

export const registerService = async (
  payload: TRegisterSchema,
): Promise<null | undefined> => {
  try {
    const user = await db.user.findFirst({
      where: {
        username: payload.username,
      },
    });

    if (user) {
      throw new CFieldError("username", "username already exist");
    }

    await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username: payload.username,
          password: hashPassword(payload.password),
        },
      });

      await tx.wallet.create({
        data: {
          userId: user.id,
          amount: 0,
        },
      });
    });

    return null;
  } catch (error: Error | unknown) {
    handleTRPCError(error);
  }
};
