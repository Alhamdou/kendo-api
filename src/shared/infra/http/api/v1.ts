import express from "express";
import { inventoryRouter } from "../../../../modules/inventory/infrastructure/routes/inventory-routes";
import { userRoutes } from "../../../../modules/auth/infrastructure/routes/user-routes";


export const v1Router = express.Router();
v1Router.get("/", (req, res) => {
    return res.json({
        version: "1.0.0",
        api: "Kendo Medics API",
        maintainers: {
            name: "Alhamdou Jallow",
            email: "jallowalhamdou.9@gmail.com"
        }
    })
})

v1Router.use("/user", userRoutes);
v1Router.use("/inventory", inventoryRouter)