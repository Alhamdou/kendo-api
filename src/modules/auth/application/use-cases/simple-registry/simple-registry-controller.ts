import { Request, Response } from "express"
import { SimpleRegistry } from "./simple-registry"
import { SimpleRegistryDTO } from "./simple-registry-dto"
import { SimpleRegistryErrors } from "./simple-registry-errors"
import { BaseController } from "../../../../../shared/infra/http/base-controller"

export class SimpleRegistryController extends BaseController {
    private useCase: SimpleRegistry

    constructor(useCase: SimpleRegistry) {
        super()
        this.useCase = useCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const dto: SimpleRegistryDTO = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
        }

        try {
            const result = await this.useCase.execute(dto)

            if (result.isLeft()) {
                const error = result.value

                switch (error.constructor) {
                    case SimpleRegistryErrors.PhoneNumberAlreadyExists:
                        return this.conflict(res, error.getErrorValue().message)
                    case SimpleRegistryErrors.InvalidParameters:
                        return this.clientError(res, error.getErrorValue().message)
                    default:
                        return this.fail(res, error.getErrorValue().message)
                }
            } else {
                return this.ok(res)
            }
        } catch (err) {
            return this.fail(res, "An unexpected error occurred.")
        }
    }
}
