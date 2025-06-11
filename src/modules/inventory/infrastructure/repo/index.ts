import models from "../../../../shared/infra/database/sequelize/models";
import { SequelizeInventoryRepo } from "./sequelize-investory-repo";

export const inventoryRepoImpl = new SequelizeInventoryRepo(
    models
);

