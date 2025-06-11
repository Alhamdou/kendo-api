import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UpdateMedicineStockErrors } from "./update-medicine-stock-errors";

export type UpdateMedicineStockResponse = Either<
    | AppError.UnexpectedError
    | UpdateMedicineStockErrors.MedicineNotFound
    | UpdateMedicineStockErrors.InvalidQuantity
    | UpdateMedicineStockErrors.InsufficientStock,
    Result<void>
>;