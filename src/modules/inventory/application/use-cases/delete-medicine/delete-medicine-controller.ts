import { Request, Response } from "express"
import { DeleteMedicine } from "./delete-medicine"
import { DeleteMedicineDTO } from "./delete-medicine-dto"
import { DeleteMedicineErrors } from "./delete-medicine-errors"
import { BaseController } from "../../../../../shared/infra/http/base-controller"

export class DeleteMedicineController extends BaseController {
    constructor(private readonly _useCase: DeleteMedicine) {
        super()
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const medicineId = req.params.id

        if (!medicineId) {
            return this.clientError(res, "Medicine ID is required")
        }

        const dto: DeleteMedicineDTO = {
            medicineId,
        }

        const result = await this._useCase.execute(dto)

        if (result.isRight()) {
            return this.ok(res, { message: "Medicine deleted successfully" })
        } else {
            const error = result.value

            switch (error.constructor) {
                case DeleteMedicineErrors.MedicineNotFound:
                    return this.notFound(
                        res,
                        error.getErrorValue().message
                    )
                case DeleteMedicineErrors.MedicineInUse:
                    return this.conflict(
                        res,
                        error.getErrorValue().message
                    )
                default:
                    return this.fail(res, error.getErrorValue().message)
            }
        }
    }
}
