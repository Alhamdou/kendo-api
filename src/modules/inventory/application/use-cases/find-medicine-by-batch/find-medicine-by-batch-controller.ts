import { Request, Response } from "express";
import { FindMedicineByBatch } from "./find-medicine-by-batch";
import { FindMedicineByBatchDTO } from "./find-medicine-by-batch-dto";
import { FindMedicineByBatchErrors } from "./find-medicine-by-batch-errors";
import { BaseController } from "../../../../../shared/infra/http/base-controller";
import { MedicineMapper } from "../../mappers/medicine-mapper";

export class FindMedicineByBatchController extends BaseController {
    constructor(private readonly _useCase: FindMedicineByBatch) {
        super();
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        try {
            const { batchNumber } = req.params;

            if (!batchNumber) {
                return this.clientError(res, "Batch number is required");
            }

            const dto: FindMedicineByBatchDTO = {
                batchNumber
            };

            const result = await this._useCase.execute(dto);

            if (result.isRight()) {
                const medicine = result.value.getValue();
                return this.ok(res, MedicineMapper.toDTO(medicine));
            } else {
                const error = result.value;

                switch (error.constructor) {
                    case FindMedicineByBatchErrors.MedicineNotFound:
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
