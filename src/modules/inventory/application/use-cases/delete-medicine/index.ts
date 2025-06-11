import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { DeleteMedicine } from "./delete-medicine";
import { DeleteMedicineController } from "./delete-medicine-controller";



export const deleteMedicineUseCase = new DeleteMedicine(
    inventoryRepoImpl
    
)

export const deleteMedicineController = new DeleteMedicineController(
    deleteMedicineUseCase
);