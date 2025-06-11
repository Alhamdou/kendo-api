
import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/use-case-error";

export namespace DeleteMedicineErrors {
    export class MedicineNotFound extends Result<UseCaseError> {
        constructor(id: string) {
            super(false, {
                message: `Could not find a medicine with id ${id}`,
            });
            console.error(
                `[DeleteMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class MedicineInUse extends Result<UseCaseError> {
        constructor(id: string, reason: string) {
            super(false, {
                message: `Cannot delete medicine with id ${id}. ${reason}`,
            });
            console.error(
                `[DeleteMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
