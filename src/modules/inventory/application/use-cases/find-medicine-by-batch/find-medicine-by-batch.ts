
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { InventoryRepo } from "../../repo/inventory-repo";
import {
    FindMedicineByBatchDTO,

} from "./find-medicine-by-batch-dto";
import { FindMedicineByBatchErrors } from "./find-medicine-by-batch-errors";
import { FindMedicineByBatchResponse } from "./find-medicine-by-batch-response";

export class FindMedicineByBatch implements UseCase<FindMedicineByBatchDTO, FindMedicineByBatchResponse> {
    private _inventoryRepo: InventoryRepo;

    constructor(repo: InventoryRepo) {
        this._inventoryRepo = repo;
    }

    public async execute(request: FindMedicineByBatchDTO): Promise<FindMedicineByBatchResponse> {
        try {
            const medicine = await this._inventoryRepo.findMedicineByBatchNumber(request.batchNumber);

            if (!medicine) {
                return left(
                    new FindMedicineByBatchErrors.MedicineNotFound(request.batchNumber)
                );
            }

            return right(Result.ok(medicine));
        } catch (error) {
            return left(AppError.UnexpectedError.create(error));
        }
    }
}
