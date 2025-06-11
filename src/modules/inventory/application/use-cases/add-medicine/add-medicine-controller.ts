import { Request, Response } from "express";
import { AddMedicine } from "./add-medicine";
import { AddMedicineDTO } from "./add-medicine-dto";
import { AddMedicineErrors } from "./add-medicine-errors";
import { BaseController } from "../../../../../shared/infra/http/base-controller";

export class AddMedicineController extends BaseController {
    constructor(private readonly _useCase: AddMedicine) {
        super();
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const { name, genericName, description, dosageForm, categoryId, price, quantity, batchNumber, supplier } = req.body;

        // Validate required fields
        if (!name || !genericName || !dosageForm || price === undefined) {
            return this.clientError(res, "Required fields: name, genericName, dosageForm, and price");
        }

        if (price <= 0) {
            return this.clientError(res, "Price must be greater than zero");
        }

        const dto: AddMedicineDTO = {
            name,
            genericName,
            description,
            dosageForm,
            categoryId,
            price: Number(price),
            quantity: quantity ? Number(quantity) : undefined,
            batchNumber,
            supplier
        };

        const result = await this._useCase.execute(dto);

        if (result.isRight()) {
            return this.created(res);
        } else {
            const error = result.value;

            switch (error.constructor) {
                case AddMedicineErrors.InvalidParameters:
                    return this.clientError(
                        res,
                        error.getErrorValue().message
                    );
                case AddMedicineErrors.MedicineAlreadyExists:
                    return this.conflict(
                        res,
                        error.getErrorValue().message
                    );
                case AddMedicineErrors.InvalidPrice:
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
