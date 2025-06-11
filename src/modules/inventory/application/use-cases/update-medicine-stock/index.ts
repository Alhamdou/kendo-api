import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { UpdateMedicine } from "../update-medicine/update-medicine";
import { UpdateMedicineController } from "../update-medicine/update-medicine-controller";


const updateMedicineStock = new UpdateMedicine(
    inventoryRepoImpl
)

const updateMedicineController = new UpdateMedicineController(
    updateMedicineStock
);
export { updateMedicineController, updateMedicineStock };