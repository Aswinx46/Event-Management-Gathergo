import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IchangeProfileImageClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/profile/changeProfileImageUseCaseInterface";

export class ChangeProfileImageClientUseCase implements IchangeProfileImageClientUseCase {
    private clientDatabase: IClientDatabaseRepository
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
    }
    async changeProfileImage(cliendId: string, profileImage: string): Promise<clientEntity | null> {
        const user = await this.clientDatabase.findById(cliendId)
        if (!user) throw new Error('No user found in this ID')
        const updatedProfile = await this.clientDatabase.changeProfileImage(cliendId, profileImage)
        return updatedProfile
    }
}