import { ClientUpdateProfileEntity } from "../../../domain/entities/client/clientUpdateProfileDTO";
import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IupdateProfileDataUseCase } from "../../../domain/interface/useCaseInterfaces/client/profile/updateProfileDataUseCaseInterface";

export class UpdateProfileClientUseCase implements IupdateProfileDataUseCase {
    private clientDatabase: IClientDatabaseRepository
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
    }
    async updateClientProfile(client: ClientUpdateProfileEntity): Promise<clientEntity | null> {
        return await this.clientDatabase.updateProfile(client)
    }
}