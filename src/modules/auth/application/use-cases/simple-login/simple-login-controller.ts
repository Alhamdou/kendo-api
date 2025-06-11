import { Request, Response } from "express"
import { SimpleLogin } from "./simple-login"
import { SimpleLoginDTO } from "./simple-login-dto"
import { SimpleLoginErrors } from "./simple-login-errors"
import { BaseController } from "../../../../../shared/infra/http/base-controller"

export class SimpleLoginController extends BaseController {
    private useCase: SimpleLogin

    constructor(useCase: SimpleLogin) {
        super()
        this.useCase = useCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const dto: SimpleLoginDTO = {
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }

        try {
            const result = await this.useCase.execute(dto)

            if (result.isLeft()) {
                const error = result.value

                switch (error.constructor) {
                    case SimpleLoginErrors.PhoneNumberDoesNotExist:
                        return this.unauthorized(res, error.getErrorValue().message)
                    case SimpleLoginErrors.PasswordDoesNotMatch:
                        return this.unauthorized(res, error.getErrorValue().message)
                    case SimpleLoginErrors.PasswordNotSet:
                        return this.unauthorized(res, error.getErrorValue().message)
                    case SimpleLoginErrors.UserNotActivated:
                        return this.unauthorized(res, error.getErrorValue().message)
                    case SimpleLoginErrors.InvalidParameters:
                        return this.clientError(res, error.getErrorValue().message)
                    default:
                        return this.fail(res, error.getErrorValue().message)
                }
            } else {
                const { accessToken } = result.value.getValue()
                return this.ok(res, { accessToken })
            }
        } catch (err) {
            return this.fail(res, "An unexpected error occurred while processing your request.")
        }
    }
}
