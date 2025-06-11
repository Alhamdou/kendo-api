
import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/use-case-error";

export namespace UpdateMedicineStockErrors {
  export class MedicineNotFound extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Could not find a medicine with id ${id}`,
      });
      console.error(
        `[UpdateMedicineStockErrors]: ${this.getErrorValue().message}`
      );
    }
  }

  export class InvalidQuantity extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Quantity must be a positive number.`,
      });
      console.error(
        `[UpdateMedicineStockErrors]: ${this.getErrorValue().message}`
      );
    }
  }

  export class InsufficientStock extends Result<UseCaseError> {
    constructor(available: number, requested: number) {
      super(false, {
        message: `Insufficient stock. Available: ${available}, Requested: ${requested}`,
      });
      console.error(
        `[UpdateMedicineStockErrors]: ${this.getErrorValue().message}`
      );
    }
  }
}
