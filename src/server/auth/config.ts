import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import { db } from "@/server/db";
import { loginSchema } from "@/schema/auth";
import { comparePassword } from "@/lib/bcrypt";
import type { TUser } from "@/types/auth";
import { newUser } from "../api/dto/auth";
import type { Role } from "@prisma/client";
import type { JWT as _JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string
      role: string
    } & DefaultSession["user"];
  }

  interface User {
    username: string
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string
    role: Role
  }

}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials): Promise<TUser | null> => {
        try {
          const data = loginSchema.parse(credentials)
          const user = await db.user.findFirst({
            where: {
              username: data.username
            }
          })

          if (!user) {
            throw new Error("user not found")
          }

          if (!comparePassword(data.password, user.password)) {
            throw new Error("incorrect password")
          }

          return newUser(user)
        } catch (error) {
          console.error("Auth Error: ", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.username = user.username
        token.role = user.role
      }

      return token
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
