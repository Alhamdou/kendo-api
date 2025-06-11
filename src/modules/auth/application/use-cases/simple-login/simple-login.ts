import { AppError } from "../../../../../shared/core/app-error"
import { Either, left, right } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { UseCase } from "../../../../../shared/core/use-case"
import { Password } from "../../../domain/password"
import { PhoneNumber } from "../../../domain/phone-number"
import { Token } from "../../../domain/token"
import { AuthRepo } from "../../repo/auth-repo"
import { SimpleLoginDTO } from "./simple-login-dto"
import { SimpleLoginErrors } from "./simple-login-errors"
import { SimpleLoginResponse } from "./simple-login-response"

export class SimpleLogin implements UseCase<SimpleLoginDTO, SimpleLoginResponse> {
    private authRepo: AuthRepo

    constructor(authRepo: AuthRepo) {
        this.authRepo = authRepo
    }

    public async execute(request: SimpleLoginDTO): Promise<SimpleLoginResponse> {
        try {
            const phoneOrError = PhoneNumber.create(request.phoneNumber)
            const passwordOrError = Password.create(request.password, false)

            const dtoResult = Result.combine([phoneOrError, passwordOrError])

            if (dtoResult.isFailure) {
                return left(
                    new SimpleLoginErrors.InvalidParameters(dtoResult.getErrorValue())
                )
            }

            const phoneNumber: PhoneNumber = phoneOrError.getValue()
            const password: Password = passwordOrError.getValue()

            const user = await this.authRepo.findByPhoneNumber(phoneNumber)

            if (!user) {
                return left(new SimpleLoginErrors.PhoneNumberDoesNotExist())
            }

            if (!user.password) {
                return left(new SimpleLoginErrors.PasswordNotSet())
            }

            if (!password.comparePassword(user.password.value)) {
                return left(new SimpleLoginErrors.PasswordDoesNotMatch())
            }

            if (!user.activated) {
                return left(new SimpleLoginErrors.UserNotActivated())
            }

            // Generate access token
            const accessToken = Token.create(null)
            // user.accessToken = accessToken

            await this.authRepo.save(user)

            return right(Result.ok<{ accessToken: string }>({
                accessToken: accessToken.value
            }))
        } catch (err) {
            return left(AppError.UnexpectedError.create(err))
        }
    }
}
