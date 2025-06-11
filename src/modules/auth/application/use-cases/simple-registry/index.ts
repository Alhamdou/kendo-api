import { authRepoImpl } from "../../../infrastructure/repo"
import { SimpleRegistry } from "./simple-registry"
import { SimpleRegistryController } from "./simple-registry-controller"

const simpleRegistry = new SimpleRegistry(authRepoImpl)
const simpleRegistryController = new SimpleRegistryController(simpleRegistry)

export { simpleRegistryController }
