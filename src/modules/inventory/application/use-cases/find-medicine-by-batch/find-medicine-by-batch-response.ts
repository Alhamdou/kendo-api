import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { Medicine } from "../../../domain/medicine";
import { FindMedicineByBatchErrors } from "./find-medicine-by-batch-errors";

export type FindMedicineByBatchResponse = Either<
    | AppError.UnexpectedError
    | FindMedicineByBatchErrors.MedicineNotFound,
    Result<Medicine>
>;