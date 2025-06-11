
import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";

export interface UpdateMedicineDTO {
    medicineId: string;
    name?: string;
    genericName?: string;
    description?: string;
    dosageForm?: string;
    categoryId?: string;
    price?: number;
    quantity?: number;
    batchNumber?: string;
    supplier?: string;
    isActive?: boolean;
}


