import { ModelStatic, Op } from "sequelize";
import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id";
import { Medicine } from "../../domain/medicine";
import { InventoryRepo } from "../../application/repo/inventory-repo";
import { MedicineMapper } from "../../application/mappers/medicine-mapper";

export class SequelizeInventoryRepo implements InventoryRepo {
  constructor(
    private models: Record<string, ModelStatic<any>>
  ) { }

  private createBaseQuery(): any {
    const where: any = {};
    return { where };
  }

  public async findMedicineById(id: UniqueEntityID): Promise<Medicine | null> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();
    query.where.id = id.toString();

    const medicine = await MedicineModel.findOne(query);
    if (!medicine) return null;

    return MedicineMapper.toDomain(medicine);
  }

  public async findMedicineByName(name: string): Promise<Medicine[]> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();
    query.where.name = { [Op.iLike]: `%${name}%` };

    const medicines = await MedicineModel.findAll(query);
    return medicines.map(medicine => MedicineMapper.toDomain(medicine));
  }

  public async findAllMedicine(): Promise<Medicine[]> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();

    const medicines = await MedicineModel.findAll(query);
    return medicines.map(medicine => MedicineMapper.toDomain(medicine));
  }

  public async saveMedicine(medicine: Medicine): Promise<void> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();
    query.where.id = medicine.medicineId.toString();

    const medicinePersistence = MedicineMapper.toPersistence(medicine);
    const existingMedicine = await MedicineModel.findOne(query);

    if (existingMedicine) {
      await MedicineModel.update(medicinePersistence, query);
      return;
    }

    // await MedicineModel.create(medicinePersistence);
  }

  public async updateMedicine(medicine: Medicine): Promise<void> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();
    query.where.id = medicine.medicineId.toString();

    const medicinePersistence = MedicineMapper.toPersistence(medicine);
    await MedicineModel.update(medicinePersistence, query);
  }

  public async deleteMedicine(id: UniqueEntityID): Promise<void> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();
    query.where.id = id.toString();

    await MedicineModel.destroy(query);
  }

  public async checkMedicineInUse(id: UniqueEntityID): Promise<{ inUse: boolean, reason: string }> {
    const { PrescriptionModel, SalesModel } = this.models;

    // Check prescriptions
    const prescriptionQuery = this.createBaseQuery();
    prescriptionQuery.where.medicineId = id.toString();
    const prescription = await PrescriptionModel.findOne(prescriptionQuery);

    if (prescription) {
      return { inUse: true, reason: "Medicine is used in prescriptions" };
    }

    // Check sales
    const salesQuery = this.createBaseQuery();
    salesQuery.where.medicineId = id.toString();
    const sale = await SalesModel.findOne(salesQuery);

    if (sale) {
      return { inUse: true, reason: "Medicine is used in sales records" };
    }

    return { inUse: false, reason: "" };
  }

  public async findMedicineByBatchNumber(batchNumber: string): Promise<Medicine | null> {
    const { MedicineModel } = this.models;
    const query = this.createBaseQuery();
    query.where.batchNumber = batchNumber;

    const medicine = await MedicineModel.findOne(query);
    if (!medicine) return null;

    return MedicineMapper.toDomain(medicine);
  }
}
