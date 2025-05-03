import {
  CBadRequestError,
  CErrorResponse,
  CFieldError,
  EErrorType,
  type TCustomTRPCErrorData,
} from "@/types/global";
import { TRPCError } from "@trpc/server";
import type {
  DefaultErrorData,
  Maybe,
} from "@trpc/server/unstable-core-do-not-import";
import type { UseFormReturn } from "react-hook-form";
import { showError } from "./toaster";

export const handleTRPCError = (error: Error | unknown) => {
  let errorCode: "INTERNAL_SERVER_ERROR" | "BAD_REQUEST" =
    "INTERNAL_SERVER_ERROR";

  const cause = new CErrorResponse(
    EErrorType.INTERNAL,
    (error as Error).message,
    "internal server error",
    null,
  );

  if (error instanceof CFieldError) {
    errorCode = "BAD_REQUEST";
    cause.type = EErrorType.FIELD;
    cause.message = "custom field error";
    cause.field = {
      name: "field error",
      field: error.field,
      message: error.message,
    };
  }

  if (error instanceof CBadRequestError) {
    errorCode = "BAD_REQUEST";
    cause.type = EErrorType.BAD;
    cause.message = error.message;
  }

  throw new TRPCError({
    message: "TRPC Custom Error",
    code: errorCode,
    cause,
  });
};

export const handleTRPCClientError = (
  data: Maybe<DefaultErrorData & TCustomTRPCErrorData>,
  form?: UseFormReturn<any>,
) => {
  if (data) {
    const errorType = data.type;
    switch (errorType) {
      case EErrorType.BAD:
        showError("Bad Request", data.message);

        return;
      case EErrorType.FIELD:
        if (data.fieldError) {
          const { field, message } = data.fieldError;
          showError("Bad Request", message);

          if (form) {
            form.setError(field, { message });
          }
        }

        return;
      default:
        showError("Internal Server Error", data.message);
    }
  }
};
