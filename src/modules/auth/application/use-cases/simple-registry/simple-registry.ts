import { AppError } from "../../../../../shared/core/app-error"
import { Either, left, right } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { UseCase } from "../../../../../shared/core/use-case"
import { Name } from "../../../domain/name"
import { PhoneNumber } from "../../../domain/phone-number"
import { SimpleUser } from "../../../domain/simple-user"
import { Token } from "../../../domain/token"
import { AuthRepo } from "../../repo/auth-repo"
import { SimpleRegistryDTO } from "./simple-registry-dto"
import { SimpleRegistryErrors } from "./simple-registry-errors"
import { SimpleRegistryResponse } from "./simple-registry-response"

export class SimpleRegistry implements UseCase<SimpleRegistryDTO, SimpleRegistryResponse> {
    private authRepo: AuthRepo

    constructor(authRepo: AuthRepo) {
        this.authRepo = authRepo
    }

    public async execute(request: SimpleRegistryDTO): Promise<SimpleRegistryResponse> {
        try {
            const nameOrError = Name.create(request.name)
            const phoneOrError = PhoneNumber.create(request.phoneNumber)

            const dtoResult = Result.combine([nameOrError, phoneOrError])

            if (dtoResult.isFailure) {
                return left(
                    new SimpleRegistryErrors.InvalidParameters(dtoResult.getErrorValue())
                )
            }

            const name: Name = nameOrError.getValue()
            const phoneNumber: PhoneNumber = phoneOrError.getValue()

            // Check if phone number is already registered
            const userWithPhone = await this.authRepo.findByPhoneNumber(phoneNumber)
            if (userWithPhone) {
                return left(
                    new SimpleRegistryErrors.PhoneNumberAlreadyExists(phoneNumber.value)
                )
            }

            const activationToken = Token.create(null)

            const userOrError = SimpleUser.create({
                name,
                phoneNumber,
                activated: false,
                activationToken,
            })

            if (userOrError.isFailure) {
                return left(
                    new SimpleRegistryErrors.InvalidParameters(request.name))

            }

            const user = userOrError.getValue()
            user.setDefaultUserRole()

            await this.authRepo.save(user)

            return right(Result.ok<void>())
        } catch (err) {
            return left(AppError.UnexpectedError.create(err))
        }
    }
}
