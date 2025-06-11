import { Result } from "../../../../../shared/core/result"
import { UseCaseError } from "../../../../../shared/core/use-case-error"

export namespace SimpleLoginErrors {
    export class PhoneNumberDoesNotExist extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The phone number does not exist`
            })
        }
    }

    export class PasswordDoesNotMatch extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The password does not match`
            })
        }
    }

    export class PasswordNotSet extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Password has not been set for this user`
            })
        }
    }

    export class UserNotActivated extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `User account is not activated`
            })
        }
    }

    export class InvalidParameters extends Result<UseCaseError> {
        constructor(error: string) {
            super(false, {
                message: `Invalid parameters: ${error}`
            })
        }
    }
}
