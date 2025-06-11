import { AggregateRoot } from "../../../shared/domain/aggregate-root";
import { UniqueEntityID } from "../../../shared/domain/unique-entity-id";
import { Result } from "../../../shared/core/result";
import { Guard } from "../../../shared/core/guard";

interface MedicineProps {
    name: string;
    quantity?: number;
    genericName?: string;
    description?: string;
    dosageForm?: string; 
    categoryId?: UniqueEntityID;
    price: number;
    batchNumber?: string;
    supplier?:string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Medicine extends AggregateRoot<MedicineProps> {
    get medicineId(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get genericName(): string | undefined {
        return this.props.genericName;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    get dosageForm(): string | undefined {
        return this.props.dosageForm;
    }
    get price(): number {
        return this.props.price;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    get quantity(): number | undefined {
        return this.props.quantity;
    }

    get batchNumber(): string | undefined {
        return this.props.batchNumber;
    }
    get supplier(): string | undefined {
        return this.props.supplier;
    }


    set name (name: string) {
        this.props.name = name;
    }
    set genericName(genericName: string | undefined) {
        this.props.genericName = genericName;
    }

    set description(description: string | undefined) {
        this.props.description = description;
    }

    set price(price: number) {
        this.props.price = price;
    }
    set isActive(isActive: boolean) {
        this.props.isActive = isActive;
    }
    set createdAt(createdAt: Date | undefined) {
        this.props.createdAt = createdAt;
    }
    set updatedAt(updatedAt: Date | undefined) {
        this.props.updatedAt = updatedAt;
    }
    set quantity(quantity: number | undefined) {
        this.props.quantity = quantity;
    }

    set batchNumber(batchNumber: string | undefined) {
        this.props.batchNumber = batchNumber;
    }
    set supplier(supplier: string | undefined) {
        this.props.supplier = supplier;
    }
    public updateDetails(props: Partial<MedicineProps>): Result<void> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.genericName, argumentName: 'genericName' },
            { argument: props.dosageForm, argumentName: 'dosageForm' },
            { argument: props.price, argumentName: 'price' }
        ]);

        if (!guardResult.isSuccess) {
            return Result.fail<void>(guardResult.getValue());
        }

        if (props.name) this.props.name = props.name;
        if (props.genericName) this.props.genericName = props.genericName;
        if (props.description) this.props.description = props.description;
        if (props.dosageForm) this.props.dosageForm = props.dosageForm;
        if (props.categoryId) this.props.categoryId = props.categoryId;
        if (props.price !== undefined) this.props.price = props.price;
        if (props.isActive !== undefined) this.props.isActive = props.isActive;

        this.props.updatedAt = new Date();
        return Result.ok<void>();
    }

    public static create(props: MedicineProps, id?: UniqueEntityID): Result<Medicine> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.genericName, argumentName: 'genericName' },
            { argument: props.dosageForm, argumentName: 'dosageForm' },
            { argument: props.categoryId, argumentName: 'categoryId' },
            { argument: props.price, argumentName: 'price' }
        ]);

        if (!guardResult.isSuccess) {
            return Result.fail<Medicine>(guardResult.getValue());
        }

        if (props.price < 0) {
            return Result.fail<Medicine>('Unit price cannot be negative');
        }

        const medsprops: MedicineProps = {
            ...props,
            description: props.description || '',
            isActive: props.isActive !== undefined ? props.isActive : true,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date()
        };

        const medicine = new Medicine(medsprops, id);
        return Result.ok<Medicine>(medicine);
    }
}
