import { Request, Response } from "express";
import { GetSingleMedicine } from "./get-single-medicine";
import { GetSingleMedicineDTO } from "./get-single-medicine-dto";
import { GetSingleMedicineErrors } from "./get-single-medicine-errors";
import { BaseController } from "../../../../../shared/infra/http/base-controller";
import { MedicineMapper } from "../../mappers/medicine-mapper";

export class GetSingleMedicineController extends BaseController {
    constructor(private readonly _useCase: GetSingleMedicine) {
        super();
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        try {
            const medicineId = req.params.id;

            if (!medicineId) {
                return this.clientError(res, "Medicine ID is required");
            }

            const dto: GetSingleMedicineDTO = {
                medicineId
            };

            const result = await this._useCase.execute(dto);

            if (result.isRight()) {
                const medicine = result.value.getValue();
                return this.ok(res, MedicineMapper.toDTO(medicine));
            } else {
                const error = result.value;

                switch (error.constructor) {
                    case GetSingleMedicineErrors.MedicineNotFound:
                        return this.notFound(
                            res,
                            error.getErrorValue().message
                        );
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            }
        } catch (error) {
            return this.fail(res, "An unexpected error occurred while processing your request.");
        }
    }
}
