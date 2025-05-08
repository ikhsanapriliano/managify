import type { TUser } from "@/types/auth.type";
import type { User } from "@prisma/client";

export const newUser = (data: User): TUser => {
  return {
    id: data.id,
    username: data.username,
    role: data.role,
  };
};
