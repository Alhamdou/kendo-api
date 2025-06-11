
import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UpdateMedicineStockErrors } from "./update-medicine-stock-errors";

export enum StockOperation {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SET = 'SET'
}

export interface UpdateMedicineStockDTO {
  medicineId: string;
  quantity: number;
  operation: StockOperation;
  note?: string; // For tracking reason of stock change
}

