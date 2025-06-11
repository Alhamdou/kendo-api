
import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { UpdateMedicine } from "./update-medicine";
import { UpdateMedicineController } from "./update-medicine-controller";

const updateMedicine = new UpdateMedicine(inventoryRepoImpl);
const updateMedicineController = new UpdateMedicineController(updateMedicine);

export { updateMedicineController };
