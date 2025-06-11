
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { UniqueEntityID } from "../../../../../shared/domain/unique-entity-id";
import { InventoryRepo } from "../../repo/inventory-repo";
import { DeleteMedicineDTO } from "./delete-medicine-dto";
import { DeleteMedicineErrors } from "./delete-medicine-errors";
import { DeleteMedicineResponse } from "./delete-medicine-response";

export class DeleteMedicine implements UseCase<DeleteMedicineDTO, DeleteMedicineResponse> {
    private _inventoryRepo: InventoryRepo;

    constructor(repo: InventoryRepo) {
        this._inventoryRepo = repo;
    }

    public async execute(request: DeleteMedicineDTO): Promise<DeleteMedicineResponse> {
        try {
            const medicineId = new UniqueEntityID(request.medicineId);
            const medicine = await this._inventoryRepo.findMedicineById(medicineId);

            if (!medicine) {
                return left(
                    new DeleteMedicineErrors.MedicineNotFound(request.medicineId)
                );
            }

            await this._inventoryRepo.deleteMedicine(medicineId);

            return right(Result.ok<void>());
        } catch (error) {
            return left(AppError.UnexpectedError.create(error));
        }
    }
}
