import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IclientUnblockUseCase } from "../../../domain/interface/useCaseInterfaces/client/authentication/clientUnblockUseCaseInterface";

export class ClientUnblockUseCase implements IclientUnblockUseCase {
    private cilentDatabase: IClientDatabaseRepository
    constructor(cilentDatabase: IClientDatabaseRepository) {
        this.cilentDatabase = cilentDatabase
    }
    async unblockClient(clientId: string): Promise<boolean> {
        const unblockedClient = await this.cilentDatabase.unblockUser(clientId)
        if (!unblockedClient) throw new Error('There is not client in this ID')
        return true
    }
}