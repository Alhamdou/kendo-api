
import { Result } from "../../../../shared/core/result";
import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id";
import { Name } from "../../domain/name";
import { PhoneNumber } from "../../domain/phone-number";
import { Role } from "../../domain/role";
import { SimpleUser } from "../../domain/simple-user";
import { Token } from "../../domain/token";

export class SimpleUserMapper {
    public static toPersistence(user: SimpleUser) {
        return {
            id: user.id.toString(),
            name: user.name.value,
            phone_number: user.phoneNumber.value,
            activated: user.activated,
            roles: user.roles?.map(role => role.value),
            activation_token: user.activationToken?.value,
            created_at: new Date(),
            updated_at: new Date()
        };
    }

    public static toDomain(raw: any): SimpleUser {
        const nameOrError = Name.create(raw.name);
        const phoneOrError = PhoneNumber.create(raw.phone_number);
        const roleOrErrors = raw.roles ? raw.roles.map((r: string) => Role.create(r)) : [];
        const activationToken = raw.activation_token ? Token.create(raw.activation_token) : undefined;

        const combinedPropsResult = Result.combine([
            nameOrError,
            phoneOrError,
            ...roleOrErrors
        ]);

        if (combinedPropsResult.isFailure) {
            throw new Error(combinedPropsResult.getErrorValue());
        }

        const simpleUserOrError = SimpleUser.create(
            {
                name: nameOrError.getValue(),
                phoneNumber: phoneOrError.getValue(),
                activated: raw.activated,
                // roles: roleOrErrors.map(role => role.getValue()),
                // activationToken: activationToken?.getValue(),
            },
            new UniqueEntityID(raw.id)
        );

        if (simpleUserOrError.isFailure) {
            // throw new Error(simpleUserOrError.getErrorValue());
        }

        return simpleUserOrError.getValue();
    }
}
