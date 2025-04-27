import { TRPCError } from "@trpc/server"

export const handleTRPCError = (error: Error | unknown) => {
    let errorCode: "INTERNAL_SERVER_ERROR" | "BAD_REQUEST" = "INTERNAL_SERVER_ERROR"

    const cause: TErrorResponse = {
        type: EErrorType.INTERNAL,
        debug: "error",
        message: "internal server error"
    }

    if (error instanceof CFieldError) {
        errorCode = "BAD_REQUEST"
        cause.type = EErrorType.FIELD
        cause.debug = "custom field error"
        cause.message = {
            field: error.field,
            message: error.message
        } as CFieldError
    } else if (error instanceof CBadRequestError) {
        errorCode = "BAD_REQUEST"
        cause.type = EErrorType.BAD
        cause.debug = "custom bad request error"
        cause.message = error.message
    } else if (error instanceof Error) {
        cause.type = EErrorType.INTERNAL
        cause.debug = error.message
        cause.message = "internal server error"

    }

    throw new TRPCError({
        message: "Error",
        code: errorCode,
        cause
    })
}