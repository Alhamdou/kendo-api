
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { UniqueEntityID } from "../../../../../shared/domain/unique-entity-id";
import { InventoryRepo } from "../../repo/inventory-repo";
import { UpdateMedicineDTO } from "./update-medicine-dto";
import { UpdateMedicineErrors } from "./update-medicine-errors";
import { UpdateMedicineResponse } from "./update-medicine-response";

export class UpdateMedicine implements UseCase<UpdateMedicineDTO, UpdateMedicineResponse> {
    private _inventoryRepo: InventoryRepo;

    constructor(repo: InventoryRepo) {
        this._inventoryRepo = repo;
    }

    public async execute(request: UpdateMedicineDTO): Promise<UpdateMedicineResponse> {
        try {
            const medicineId = new UniqueEntityID(request.medicineId);
            const medicine = await this._inventoryRepo.findMedicineById(medicineId);

            if (!medicine) {
                return left(
                    new UpdateMedicineErrors.MedicineNotFound(request.medicineId)
                );
            }

            // Validate price if provided
            if (request.price !== undefined && request.price <= 0) {
                return left(new UpdateMedicineErrors.InvalidPrice());
            }

            // Create category ID if provided
            let categoryId: UniqueEntityID | undefined = undefined;
            if (request.categoryId) {
                categoryId = new UniqueEntityID(request.categoryId);
            }

            // Update medicine properties
            if (request.name) medicine.name = request.name;
            if (request.genericName !== undefined) medicine.genericName = request.genericName;
            if (request.description !== undefined) medicine.description = request.description;
            if (request.price !== undefined) medicine.price = request.price;
            if (request.quantity !== undefined) medicine.quantity = request.quantity;
            if (request.batchNumber !== undefined) medicine.batchNumber = request.batchNumber;
            if (request.supplier !== undefined) medicine.supplier = request.supplier;
            if (request.isActive !== undefined) medicine.isActive = request.isActive;

            // Update timestamp
            medicine.updatedAt = new Date();

            // Save to repository
            await this._inventoryRepo.updateMedicine(medicine);

            return right(Result.ok<void>());
        } catch (error) {
            return left(AppError.UnexpectedError.create(error));
        }
    }
}
