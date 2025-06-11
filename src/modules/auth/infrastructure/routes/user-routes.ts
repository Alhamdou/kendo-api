import { registerUserController } from "../../application/use-cases/register-user";
import { simpleRegistryController } from "../../application/use-cases/simple-registry";
import { loginController } from "../../application/use-cases/login";
import { activateUserController } from "../../application/use-cases/activate-account";
import { getAuthUserController } from "../../application/use-cases/get-auth-user";
import { Router } from "express";
import { simpleLoginController } from "../../application/use-cases/simple-login";


const userRoutes = Router();

userRoutes.post("/register", (req, res) => {
    return registerUserController.execute(req, res);
});

userRoutes.post("/simple-register", (req, res) => {
    return simpleRegistryController.execute(req, res);
});

userRoutes.get("/login", (req, res) => {
    return loginController.execute(req, res);
})

userRoutes.post("/simple-login", (req, res) => {
    return simpleLoginController.execute(req, res);
})

userRoutes.get("activate/:token", (req, res) => {
    return activateUserController.execute(req, res);
})


userRoutes.get("authuser", (req, res) => {
    return getAuthUserController.execute(req, res);
})

export { userRoutes };