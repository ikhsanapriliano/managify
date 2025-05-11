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

export function transformSearchParams(
  payload: Record<string, string | null>,
): Record<string, string | undefined> {
  const entries = Object.entries(payload).map(([key, value]) => [
    key,
    value ?? undefined,
  ]);

  return Object.fromEntries(entries);
}

export function toDateSchema(payload: string | null): Date | undefined {
  return payload ? new Date(payload) : undefined;
}
