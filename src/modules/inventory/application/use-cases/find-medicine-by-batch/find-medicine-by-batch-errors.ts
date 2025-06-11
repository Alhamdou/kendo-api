
import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/use-case-error";

export namespace FindMedicineByBatchErrors {
    export class MedicineNotFound extends Result<UseCaseError> {
        constructor(batchNumber: string) {
            super(false, {
                message: `Could not find a medicine with batch number ${batchNumber}`,
            });
            console.error(
                `[FindMedicineByBatchErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
