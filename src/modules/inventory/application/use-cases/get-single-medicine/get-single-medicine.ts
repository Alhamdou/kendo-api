
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { UniqueEntityID } from "../../../../../shared/domain/unique-entity-id";
import { InventoryRepo } from "../../repo/inventory-repo";
import { GetSingleMedicineDTO } from "./get-single-medicine-dto";
import { GetSingleMedicineErrors } from "./get-single-medicine-errors";
import { GetSingleMedicineResponse } from "./get-single-medicine-response";

export class GetSingleMedicine implements UseCase<GetSingleMedicineDTO, GetSingleMedicineResponse> {
    private _inventoryRepo: InventoryRepo;

    constructor(repo: InventoryRepo) {
        this._inventoryRepo = repo;
    }

    public async execute(request: GetSingleMedicineDTO): Promise<GetSingleMedicineResponse> {
        try {
            const medicineId = new UniqueEntityID(request.medicineId);
            const medicine = await this._inventoryRepo.findMedicineById(medicineId);

            if (!medicine) {
                return left(
                    new GetSingleMedicineErrors.MedicineNotFound(request.medicineId)
                );
            }

            return right(Result.ok(medicine));
        } catch (error) {
            return left(AppError.UnexpectedError.create(error));
        }
    }
}
