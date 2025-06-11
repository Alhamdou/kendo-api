import { authRepoImpl } from "../../../infrastructure/repo"
import { SimpleLogin } from "./simple-login"
import { SimpleLoginController } from "./simple-login-controller"

const simpleLogin = new SimpleLogin(authRepoImpl)
const simpleLoginController = new SimpleLoginController(simpleLogin)

export { simpleLoginController }
