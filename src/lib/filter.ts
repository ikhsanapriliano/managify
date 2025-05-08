/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { TDateFilter } from "@/types/global.type";

export const transformFilters = <T extends Record<string, unknown>>(
  payload: unknown,
): T => {
  let filters = {};

  if (payload) {
    filters = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => {
        if (value !== undefined && value !== null) {
          return [key, value];
        }
      }),
    );
  }

  return filters as T;
};

export const transformDateFilter = (
  startDate?: Date,
  endDate?: Date,
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
