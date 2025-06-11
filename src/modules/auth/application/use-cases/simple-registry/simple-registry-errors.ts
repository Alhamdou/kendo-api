import { Result } from "../../../../../shared/core/result"
import { UseCaseError } from "../../../../../shared/core/use-case-error"

export namespace SimpleRegistryErrors {
    export class PhoneNumberAlreadyExists extends Result<UseCaseError> {
        constructor(phoneNumber: string) {
            super(false, {
                message: `The phone number ${phoneNumber} is already registered.`
            })
        }
    }

    export class InvalidParameters extends Result<UseCaseError> {
        constructor(message: string) {
            super(false, { message })
        }
    }
}
