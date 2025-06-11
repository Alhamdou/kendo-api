import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { connection } from "../config/config";

export class MedicineModel extends Model<InferAttributes<MedicineModel>, InferCreationAttributes<MedicineModel>> {
    declare id: string;
    declare name: string;
    declare genericName: string;
    declare description: string | null;
    declare dosageForm: string;
    declare categoryId: string | null;
    declare price: number;
    declare quantity: number;
    declare batchNumber: string | null;
    declare supplier: string | null;
    declare isActive: boolean;
    declare expiryDate: Date | null;
    declare storageRequirements: string | null;
    declare location: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

MedicineModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        genericName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dosageForm: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "categories",
                key: "id",
            },
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        batchNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        supplier: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        storageRequirements: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "Medicine",
        tableName: "medicines",
        timestamps: true,
        indexes: [
            { fields: ["name"] },
            { fields: ["genericName"] },
            { unique: true, fields: ["batchNumber"] },
            { fields: ["categoryId"] },
        ],
    }
);
