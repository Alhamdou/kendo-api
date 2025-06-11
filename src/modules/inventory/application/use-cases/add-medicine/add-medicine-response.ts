import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { AddMedicineErrors } from "./add-medicine-errors";

export type AddMedicineResponse = Either<
    | AppError.UnexpectedError
    | AddMedicineErrors.MedicineAlreadyExists
    | AddMedicineErrors.InvalidParameters,
    Result<void>
>;