import type { TDateFilter } from "@/types/global.type";
import type { Prisma } from "@prisma/client";

export const transformFilters = <T extends Record<string, unknown>>(
  payload: unknown,
): T => {
  let filters = {};

  if (payload) {
    filters = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => {
        if (value) {
          return [key, value];
        }
      }),
    );
  }

  return filters as T;
};

export const transformDateFilter = (
  startDate?: Date | null,
  endDate?: Date | null,
): TDateFilter | undefined => {
  if (startDate && endDate) {
    const result: TDateFilter = {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    };

    return result;
  }
};

export const transformLikeFilter = (
  payload: string | undefined,
): Prisma.StringFilter | undefined => {
  if (!payload) return undefined;

  return {
    contains: payload,
    mode: "insensitive",
  };
};
