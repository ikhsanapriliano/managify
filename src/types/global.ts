import type { ZodError } from "zod";

export enum EErrorType {
  FIELD = "field error",
  BAD = "bad request",
  INTERNAL = "internal server error",
}

export class CErrorResponse extends Error {
  type: EErrorType;
  debug: string;
  field: CFieldError | null;

  constructor(
    type: EErrorType,
    debug = "",
    message = "",
    field: CFieldError | null = null,
  ) {
    super(message);
    this.type = type;
    this.debug = debug;
    this.field = field;
  }
}

export class CFieldError extends Error {
  field: string;

  constructor(field: string, message: string) {
    super(message);
    this.field = field;
  }
}

export class CBadRequestError extends Error {
  badMessage: string;

  constructor(message: string, badMessage: string) {
    super(message);
    this.badMessage = badMessage;
  }
}

export type TCustomTRPCErrorData = {
  type: EErrorType;
  code: string;
  debug: string;
  message: string;
  zodError: ReturnType<ZodError["flatten"]> | null;
  fieldError: CErrorResponse["field"] | null;
};
