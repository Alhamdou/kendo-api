import { Email } from "../../domain/email"
import { PhoneNumber } from "../../domain/phone-number"
import { User } from "../../domain/user"
import { SimpleUser } from "../../domain/simple-user"

export interface AuthRepo {
    save(user: User | SimpleUser): Promise<void>
    findByEmail(email: Email): Promise<User | null>
    findByPhoneNumber(phoneNumber: PhoneNumber): Promise<User | SimpleUser | null>
    findByActivationToken(token: string): Promise<User | SimpleUser | null>
    findByAccessToken(token: string): Promise<User | null>
}
