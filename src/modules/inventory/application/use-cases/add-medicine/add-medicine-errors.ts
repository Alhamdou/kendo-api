
import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/use-case-error";

export namespace AddMedicineErrors {
    export class InvalidParameters extends Result<UseCaseError> {
        constructor(message: string) {
            super(false, { message });
            console.error(
                `[AddMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class MedicineAlreadyExists extends Result<UseCaseError> {
        constructor(name: string) {
            super(false, {
                message: `The medicine ${name} already exists in inventory.`,
            });
            console.error(
                `[AddMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class InvalidPrice extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The medicine price must be greater than zero.`,
            });
            console.error(
                `[AddMedicineErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
