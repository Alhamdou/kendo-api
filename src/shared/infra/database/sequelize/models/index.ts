import { MedicineModel } from "./medicine-model";
import { UserModel } from "./user-model";

const isDev = process.env.NODE_ENV !== "production";

const init = async () => {
    await UserModel.sync({ alter: true });
};

init();

const models = {
    UserModel,
    MedicineModel,
};


export default models;
