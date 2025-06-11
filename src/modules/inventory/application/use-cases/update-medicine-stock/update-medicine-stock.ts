
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { UniqueEntityID } from "../../../../../shared/domain/unique-entity-id";
import { InventoryRepo } from "../../repo/inventory-repo";
import { 
  UpdateMedicineStockDTO, 
  StockOperation 
} from "./update-medicine-stock-dto";
import { UpdateMedicineStockErrors } from "./update-medicine-stock-errors";
import { UpdateMedicineStockResponse } from "./update-medicine-stock-response";

export class UpdateMedicineStock implements UseCase<UpdateMedicineStockDTO, UpdateMedicineStockResponse> {
  private _inventoryRepo: InventoryRepo;

  constructor(repo: InventoryRepo) {
    this._inventoryRepo = repo;
  }

  public async execute(request: UpdateMedicineStockDTO): Promise<UpdateMedicineStockResponse> {
    try {
      // Validate quantity
      if (request.quantity < 0) {
        return left(new UpdateMedicineStockErrors.InvalidQuantity());
      }

      const medicineId = new UniqueEntityID(request.medicineId);
      const medicine = await this._inventoryRepo.findMedicineById(medicineId);

      if (!medicine) {
        return left(
          new UpdateMedicineStockErrors.MedicineNotFound(request.medicineId)
        );
      }

      const currentQuantity = medicine.quantity || 0;
      let newQuantity = currentQuantity;

      // Calculate new quantity based on operation
      switch (request.operation) {
        case StockOperation.INCREASE:
          newQuantity = currentQuantity + request.quantity;
          break;
        case StockOperation.DECREASE:
          // Check if we have enough stock
          if (request.quantity > currentQuantity) {
            return left(
              new UpdateMedicineStockErrors.InsufficientStock(currentQuantity, request.quantity)
            );
          }
          newQuantity = currentQuantity - request.quantity;
          break;
        case StockOperation.SET:
          newQuantity = request.quantity;
          break;
      }

      // Update medicine
      medicine.quantity = newQuantity;
      medicine.updatedAt = new Date();

      // Save to repository
      await this._inventoryRepo.updateMedicine(medicine);

      return right(Result.ok<void>());
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }
}
