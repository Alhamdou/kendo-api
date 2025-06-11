import { Request, Response } from "express";
import { GetAllMedicine } from "./get-all-medicine";
import { GetAllMedicineDTO } from "./get-all-medicine-dto";
import { BaseController } from "../../../../../shared/infra/http/base-controller";
import { MedicineMapper } from "../../mappers/medicine-mapper";

export class GetAllMedicineController extends BaseController {
    constructor(private readonly _useCase: GetAllMedicine) {
        super();
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        try {
            // Parse pagination parameters if provided
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
            const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;

            const dto: GetAllMedicineDTO = {
                limit,
                offset
            };

            const result = await this._useCase.execute(dto);

            if (result.isRight()) {
                const medicines = result.value.getValue();

                // Map domain medicines to DTOs for the response
                const medicineDTOs = medicines.map(medicine =>
                    MedicineMapper.toDTO(medicine)
                );

                return this.ok(res, medicineDTOs);
            } else {
                const error = result.value;
                return this.fail(res, error.getErrorValue().message);
            }
        } catch (error) {
            return this.fail(res, "An unexpected error occurred while processing your request.");
        }
    }
}
