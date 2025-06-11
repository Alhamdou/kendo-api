import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { Medicine } from "../../../domain/medicine";
import { GetSingleMedicineErrors } from "./get-single-medicine-errors";

export type GetSingleMedicineResponse = Either<
    | AppError.UnexpectedError
    | GetSingleMedicineErrors.MedicineNotFound,
    Result<Medicine>
>;