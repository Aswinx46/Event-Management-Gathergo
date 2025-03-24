import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IgoogleLoginClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/authentication/googleLoginUseCase";

export class GoogleLoginClientUseCase implements IgoogleLoginClientUseCase {
    private clientDatabase: IClientDatabaseRepository
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
    }
    async googleLogin(client: clientEntity): Promise<clientEntity | null> {
        const exitingUser = await this.clientDatabase.findByEmail(client.email)
        if (exitingUser) {
            return exitingUser
        } else {

            return await this.clientDatabase.googleLogin(client)
        }
    }
}