export interface AddMedicineDTO {
    name: string;
    genericName: string;
    description?: string;
    dosageForm: string;
    categoryId?: string;
    price: number;
    quantity?: number;
    batchNumber?: string;
    supplier?: string;
}


