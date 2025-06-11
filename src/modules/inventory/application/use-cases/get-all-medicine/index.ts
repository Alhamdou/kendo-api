
import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { GetAllMedicine } from "./get-all-medicine";
import { GetAllMedicineController } from "./get-all-medicine-controller";

const getAllMedicine = new GetAllMedicine(inventoryRepoImpl);
const getAllMedicineController = new GetAllMedicineController(getAllMedicine);

export { getAllMedicineController };
