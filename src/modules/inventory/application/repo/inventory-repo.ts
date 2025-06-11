
import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id";
import { Medicine } from "../../domain/medicine";

export interface InventoryRepo {
  findMedicineById(id: UniqueEntityID): Promise<Medicine | null>;
  findMedicineByName(name: string): Promise<Medicine[]>;
  findAllMedicine(): Promise<Medicine[]>;
  saveMedicine(medicine: Medicine): Promise<void>;
  updateMedicine(medicine: Medicine): Promise<void>;
  deleteMedicine(id: UniqueEntityID): Promise<void>;
  checkMedicineInUse(id: UniqueEntityID): Promise<{ inUse: boolean, reason: string }>;
  findMedicineByBatchNumber(batchNumber: string): Promise<Medicine | null>;
}
