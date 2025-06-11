
import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { Medicine } from "../../../domain/medicine";

export interface FindMedicineByBatchDTO {
  batchNumber: string;
}


