/* eslint-disable @typescript-eslint/no-unused-vars */

import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import { loginSchema } from "@/schema/auth.schema";
import { comparePassword } from "@/lib/bcrypt";
import type { TUser } from "@/types/auth.type";
import { newUser } from "../api/dto/auth.dto";
import type { Role } from "@prisma/client";
import type { JWT as _JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username: string;
    role: Role;
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials): Promise<TUser | null> => {
        const data = loginSchema.parse(credentials);
        const user = await db.user.findFirst({
          where: {
            username: data.username,
          },
        });

        if (!user) {
          return null;
        }

        if (!comparePassword(data.password, user.password)) {
          return null;
        }

        return newUser(user);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        username: token.username,
        role: token.role,
      },
    }),
  },
} satisfies NextAuthConfig;
