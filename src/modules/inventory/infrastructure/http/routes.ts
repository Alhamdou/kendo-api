import express from 'express';
import { addMedicineController } from '../../application/use-cases/add-medicine';
import { findMedicineByBatchController } from '../../application/use-cases/find-medicine-by-batch';
import { getAllMedicineController } from '../../application/use-cases/get-all-medicine';
import { getSingleMedicineController } from '../../application/use-cases/get-single-medicine';
import { updateMedicineController } from '../../application/use-cases/update-medicine';
import { deleteMedicineController } from '../../application/use-cases/delete-medicine';

const router = express.Router();

router.post("", (req, res) => {
    return addMedicineController.execute(req, res);
})

router.get("/:id", (req, res) => {
    return getSingleMedicineController.execute(req, res);
})

router.get("", (req, res) => {
    return getAllMedicineController.execute(req, res);
})

router.delete("/:id", (req, res) => {
    return deleteMedicineController.execute(req, res);
})

router.put("/:id", (req, res) => {
    return updateMedicineController.execute(req, res);
})

router.get("/batch/:batchNumber", (req, res) => {
    return findMedicineByBatchController.execute(req, res);
});


export { router as inventoryRouter };
