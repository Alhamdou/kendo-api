
import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { GetSingleMedicine } from "./get-single-medicine";
import { GetSingleMedicineController } from "./get-single-medicine-controller";

const getSingleMedicine = new GetSingleMedicine(inventoryRepoImpl);
const getSingleMedicineController = new GetSingleMedicineController(getSingleMedicine);

export { getSingleMedicineController };
