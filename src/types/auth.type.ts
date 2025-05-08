import type { Role } from "@prisma/client";

export type TUser = {
  id: string;
  username: string;
  role: Role;
};
