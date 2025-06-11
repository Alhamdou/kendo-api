import express, { Router } from 'express';
import { addMedicineController } from '../../application/use-cases/add-medicine';
import { findMedicineByBatchController } from '../../application/use-cases/find-medicine-by-batch';
import { getAllMedicineController } from '../../application/use-cases/get-all-medicine';
import { getSingleMedicineController } from '../../application/use-cases/get-single-medicine';
import { updateMedicineController } from '../../application/use-cases/update-medicine';
import { deleteMedicineController } from '../../application/use-cases/delete-medicine';

const inventoryRouter = Router();

// Medicine routes

inventoryRouter.post('/medicines', (req, res) => addMedicineController.execute(req, res));
inventoryRouter.get('/medicines/:id', (req, res) => getSingleMedicineController.execute(req, res));
inventoryRouter.get('/medicines', (req, res) => getAllMedicineController.execute(req, res));
inventoryRouter.delete('/medicines/:id', (req, res) => deleteMedicineController.execute(req, res));
inventoryRouter.put('/medicines/:id', (req, res) => updateMedicineController.execute(req, res));
inventoryRouter.get('/medicines/batch/:batchNumber', (req, res) => findMedicineByBatchController.execute(req, res));


export { inventoryRouter };