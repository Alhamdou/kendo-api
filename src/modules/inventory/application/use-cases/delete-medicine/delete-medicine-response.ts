import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { DeleteMedicineErrors } from "./delete-medicine-errors";

export type DeleteMedicineResponse = Either<
    | AppError.UnexpectedError
    | DeleteMedicineErrors.MedicineNotFound
    | DeleteMedicineErrors.MedicineInUse,
    Result<void>
>;
