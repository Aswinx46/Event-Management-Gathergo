import { clientEntity } from "../../../domain/entities/clientEntity";
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IgoogleLoginClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/authentication/googleLoginUseCase";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";

export class GoogleLoginClientUseCase implements IgoogleLoginClientUseCase {
    private clientDatabase: IClientDatabaseRepository
    private walletDatabase: IwalletRepository
    constructor(clientDatabase: IClientDatabaseRepository, walletDatabase: IwalletRepository) {
        this.clientDatabase = clientDatabase
        this.walletDatabase = walletDatabase
    }
    async googleLogin(client: clientEntity): Promise<clientEntity | null> {
        const exitingUser = await this.clientDatabase.findByEmail(client.email)
        if (exitingUser) {
            if (exitingUser.status != 'active') throw new Error('User Blocked by admin')
            return exitingUser
        } else {
            const walletId = genarateRandomUuid()

            const createdClient = await this.clientDatabase.googleLogin(client)
            if (!createdClient) throw new Error('Error while creating client using google login')
            const walletDetails: WalletEntity = {
                balance: 0,
                walletId,
                userModel: "client",
                userId: createdClient._id!,

            }
            const createWallet = await this.walletDatabase.createWallet(walletDetails)
            if (!createWallet) throw new Error('Error while creating wallet')
            return createdClient
        }
    }
}