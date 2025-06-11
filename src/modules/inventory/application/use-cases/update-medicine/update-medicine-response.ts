import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UpdateMedicineErrors } from "./update-medicine-errors";

export type UpdateMedicineResponse = Either<
    | AppError.UnexpectedError
    | UpdateMedicineErrors.MedicineNotFound
    | UpdateMedicineErrors.InvalidParameters,
    Result<void>
>;