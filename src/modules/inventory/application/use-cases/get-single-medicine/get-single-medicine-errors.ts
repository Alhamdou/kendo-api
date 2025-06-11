
import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/use-case-error";

export namespace GetSingleMedicineErrors {
    export class MedicineNotFound extends Result<UseCaseError> {
        constructor(id: string) {
            super(false, {
                message: `Could not find a medicine with id ${id}`,
            });
            console.error(
                `[GetSingleMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
