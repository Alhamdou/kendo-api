
import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/use-case-error";

export namespace UpdateMedicineErrors {
    export class MedicineNotFound extends Result<UseCaseError> {
        constructor(id: string) {
            super(false, {
                message: `Could not find a medicine with id ${id}`,
            });
            console.error(
                `[UpdateMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class InvalidParameters extends Result<UseCaseError> {
        constructor(message: string) {
            super(false, { message });
            console.error(
                `[UpdateMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class InvalidPrice extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The medicine price must be greater than zero.`,
            });
            console.error(
                `[UpdateMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
