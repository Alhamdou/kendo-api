import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { SimpleLoginErrors } from "./simple-login-errors";

export type SimpleLoginResponse = Either<
    | AppError.UnexpectedError
    | SimpleLoginErrors.PhoneNumberDoesNotExist
    | SimpleLoginErrors.PasswordDoesNotMatch
    | SimpleLoginErrors.PasswordNotSet
    | SimpleLoginErrors.UserNotActivated
    | SimpleLoginErrors.InvalidParameters,
    Result<{ accessToken: string }>
>