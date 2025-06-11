
import { AppError } from "../../../../../shared/core/app-error";
import { left, right } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { InventoryRepo } from "../../repo/inventory-repo";
import { GetAllMedicineDTO } from "./get-all-medicine-dto";
import { GetAllMedicineResponse } from "./get-all-medicine-response";

export class GetAllMedicine implements UseCase<GetAllMedicineDTO, GetAllMedicineResponse> {
    private _inventoryRepo: InventoryRepo;

    constructor(repo: InventoryRepo) {
        this._inventoryRepo = repo;
    }

    public async execute(request: GetAllMedicineDTO): Promise<GetAllMedicineResponse> {
        try {
            const medicines = await this._inventoryRepo.findAllMedicine();
            return right(Result.ok(medicines));
        } catch (error) {
            return left(AppError.UnexpectedError.create(error));
        }
    }
}
