
import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id";
import { Medicine } from "../../domain/medicine";

export interface MedicinePersistenceDTO {
  id: string;
  name: string;
  genericName?: string;
  description?: string;
  dosageForm?: string;
  categoryId?: string;
  price: number;
  quantity?: number;
  batchNumber?: string;
  supplier?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicineDTO {
  id: string;
  name: string;
  genericName: string | null;
  description: string | null;
  dosageForm: string | null;
  categoryId: string | null;
  price: number;
  quantity: number | null;
  batchNumber: string | null;
  supplier: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class MedicineMapper {
  public static toPersistence(medicine: Medicine): MedicinePersistenceDTO {
    return {
      id: medicine.medicineId.toString(),
      name: medicine.name,
      genericName: medicine.genericName,
      description: medicine.description,
      dosageForm: medicine.dosageForm,
      categoryId: medicine.props.categoryId?.toString(),
      price: medicine.price,
      quantity: medicine.quantity,
      batchNumber: medicine.batchNumber,
      supplier: medicine.supplier,
      isActive: medicine.isActive,
      createdAt: medicine.createdAt || new Date(),
      updatedAt: medicine.updatedAt || new Date()
    };
  }

  public static toDomain(raw: MedicinePersistenceDTO): Medicine {
    const medicineOrError = Medicine.create(
      {
        name: raw.name,
        genericName: raw.genericName,
        description: raw.description,
        dosageForm: raw.dosageForm,
        categoryId: raw.categoryId ? new UniqueEntityID(raw.categoryId) : undefined,
        price: raw.price,
        quantity: raw.quantity,
        batchNumber: raw.batchNumber,
        supplier: raw.supplier,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      new UniqueEntityID(raw.id)
    );

    if (medicineOrError.isFailure) {
      console.error(`Medicine mapper toDomain error: ${medicineOrError.getErrorValue()}`);
      //   throw new Error(medicineOrError.getErrorValue().message);
    }

    return medicineOrError.getValue();
  }

  public static toDTO(medicine: Medicine): MedicineDTO {
    return {
      id: medicine.medicineId.toString(),
      name: medicine.name,
      genericName: medicine.genericName || null,
      description: medicine.description || null,
      dosageForm: medicine.dosageForm || null,
      categoryId: medicine.props.categoryId ? medicine.props.categoryId.toString() : null,
      price: medicine.price,
      quantity: medicine.quantity || null,
      batchNumber: medicine.batchNumber || null,
      supplier: medicine.supplier || null,
      isActive: medicine.isActive,
      createdAt: medicine.createdAt ? medicine.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: medicine.updatedAt ? medicine.updatedAt.toISOString() : new Date().toISOString()
    };
  }
}
