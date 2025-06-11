
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { UniqueEntityID } from "../../../../../shared/domain/unique-entity-id";
import { Medicine } from "../../../domain/medicine";
import { InventoryRepo } from "../../repo/inventory-repo";
import { AddMedicineDTO } from "./add-medicine-dto";
import { AddMedicineErrors } from "./add-medicine-errors";
import { AddMedicineResponse } from "./add-medicine-response";

export class AddMedicine implements UseCase<AddMedicineDTO, AddMedicineResponse> {
  private _inventoryRepo: InventoryRepo;

  constructor(repo: InventoryRepo) {
    this._inventoryRepo = repo;
  }

  public async execute(request: AddMedicineDTO): Promise<AddMedicineResponse> {
    try {
      // Validate price
      if (request.price <= 0) {
        return left(new AddMedicineErrors.InvalidPrice());
      }

      // Check if medicine with the same name already exists
      const existingMedicines = await this._inventoryRepo.findMedicineByName(request.name);
      if (existingMedicines.length > 0) {
        return left(new AddMedicineErrors.MedicineAlreadyExists(request.name));
      }

      // Create category ID if provided
      let categoryId: UniqueEntityID | undefined = undefined;
      if (request.categoryId) {
        categoryId = new UniqueEntityID(request.categoryId);
      }

      // Create medicine
      const medicineOrError = Medicine.create({
        name: request.name,
        genericName: request.genericName,
        description: request.description,
        dosageForm: request.dosageForm,
        categoryId: categoryId,
        price: request.price,
        quantity: request.quantity,
        batchNumber: request.batchNumber,
        supplier: request.supplier,
        isActive: true
      });

      if (medicineOrError.isFailure) {
        return left(
          new AddMedicineErrors.InvalidParameters(
            request.name
          )
        );
      }

      const medicine = medicineOrError.getValue();

      // Save to repository
      await this._inventoryRepo.saveMedicine(medicine);

      return right(Result.ok<void>());
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }
}
