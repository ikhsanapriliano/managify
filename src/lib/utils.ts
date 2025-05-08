import { auth } from "@/server/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserId(): Promise<string> {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      throw new Error("user id not found");
    }

    return userId;
  } catch (error: Error | unknown) {
    throw error;
  }
}
