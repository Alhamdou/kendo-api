
import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { AddMedicine } from "./add-medicine";
import { AddMedicineController } from "./add-medicine-controller";

const addMedicine = new AddMedicine(inventoryRepoImpl);
const addMedicineController = new AddMedicineController(addMedicine);

export { addMedicineController };
