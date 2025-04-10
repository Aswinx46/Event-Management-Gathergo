import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IshowProfileClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/profile/showProfileClientUseCaseInterface";

export class ShowProfileDetailsInClientUseCase implements IshowProfileClientUseCase {
    private clientDatabase: IClientDatabaseRepository
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
    }
    async showProfile(clientId: string): Promise<clientEntity | null> {
        return await this.clientDatabase.showProfileDetails(clientId)
    }
}