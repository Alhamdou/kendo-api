import { Request, Response } from "express";
import { UpdateMedicine } from "./update-medicine";
import { UpdateMedicineDTO } from "./update-medicine-dto";
import { UpdateMedicineErrors } from "./update-medicine-errors";
import { BaseController } from "../../../../../shared/infra/http/base-controller";

export class UpdateMedicineController extends BaseController {
    constructor(private readonly _useCase: UpdateMedicine) {
        super();
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const medicineId = req.params.id;
        if (!medicineId) {
            return this.clientError(res, "Medicine ID is required");
        }

        const {
            name,
            genericName,
            description,
            dosageForm,
            categoryId,
            price,
            quantity,
            batchNumber,
            supplier,
            isActive
        } = req.body;

        if (!name && genericName === undefined && description === undefined &&
            dosageForm === undefined && categoryId === undefined && price === undefined &&
            quantity === undefined && batchNumber === undefined && supplier === undefined &&
            isActive === undefined) {
            return this.clientError(res, "At least one field must be provided for update");
        }

        if (price !== undefined && price <= 0) {
            return this.clientError(res, "Price must be greater than zero");
        }

        const dto: UpdateMedicineDTO = {
            medicineId,
            name,
            genericName,
            description,
            dosageForm,
            categoryId,
            price: price !== undefined ? Number(price) : undefined,
            quantity: quantity !== undefined ? Number(quantity) : undefined,
            batchNumber,
            supplier,
            isActive
        };

        const result = await this._useCase.execute(dto);

        if (result.isRight()) {
            return this.ok(res);
        } else {
            const error = result.value;

            switch (error.constructor) {
                case UpdateMedicineErrors.MedicineNotFound:
                    return this.notFound(
                        res,
                        error.getErrorValue().message
                    );
                case UpdateMedicineErrors.InvalidParameters:
                    return this.clientError(
                        res,
                        error.getErrorValue().message
                    );
                case UpdateMedicineErrors.InvalidPrice:
                    return this.clientError(
                        res,
                        error.getErrorValue().message
                    );
                default:
                    return this.fail(res, error.getErrorValue().message);
            }
        }
    }
}
