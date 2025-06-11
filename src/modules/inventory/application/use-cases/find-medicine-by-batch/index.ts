
import { inventoryRepoImpl } from "../../../infrastructure/repo";
import { FindMedicineByBatch } from "./find-medicine-by-batch";
import { FindMedicineByBatchController } from "./find-medicine-by-batch-controller";

const findMedicineByBatch = new FindMedicineByBatch(inventoryRepoImpl);
const findMedicineByBatchController = new FindMedicineByBatchController(findMedicineByBatch);

export { findMedicineByBatchController };
