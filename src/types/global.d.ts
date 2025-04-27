// enums
// declare enum EResponseMessage {
//     SUCCESS = "success",
//     ERROR = "error"
// }

declare enum EErrorType {
    FIELD = "field error",
    BAD = "bad request",
    INTERNAL = "internal server error"
}

// types
// declare type TResponse<T> = {
//     message: EResponseMessage
//     data: T | null
//     error: TErrorResponse | null
// }

declare type TErrorResponse = {
    type: EErrorType
    debug: string
    message: string | CFieldError
}

declare class CFieldError extends Error {
    field: string

    constructor(field: string, message: string) {
        super(message)
        this.field = field
    }
}

declare class CBadRequestError extends Error {
    constructor(message: string) {
        super(message)
    }
}