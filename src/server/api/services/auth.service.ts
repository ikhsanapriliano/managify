import { hashPassword } from "@/lib/bcrypt"
import type { TRegisterSchema } from "@/schema/auth"
import { db } from "@/server/db"

export const registerService = async (payload: TRegisterSchema): Promise<null | undefined> => {
    try {
        const user = await db.user.findFirst({
            where: {
                username: payload.username
            }
        })

        if (user) {
            throw new CFieldError("username", "username already exist")
        }

        await db.user.create({
            data: {
                username: payload.username,
                password: hashPassword(payload.password),
            }
        })

        return null
    } catch (error: Error | unknown) {
        throw error
    }
}