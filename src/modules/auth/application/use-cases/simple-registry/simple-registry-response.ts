import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { SimpleRegistryErrors } from "./simple-registry-errors";

export type SimpleRegistryResponse = Either<
    | AppError.UnexpectedError
    | SimpleRegistryErrors.PhoneNumberAlreadyExists
    | SimpleRegistryErrors.InvalidParameters,
    Result<void>
>