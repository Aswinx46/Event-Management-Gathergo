import { WalletEntity } from "../../domain/entities/wallet/wallerEntity";
import { IwalletRepository } from "../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IcreateWalletUseCase } from "../../domain/interface/useCaseInterfaces/client/wallet/walletCreationClientUseCaseInterface";

export class WalletCreationUseCase implements IcreateWalletUseCase {
    private walletDatabase: IwalletRepository
    constructor(walletDatabase: IwalletRepository) {
        this.walletDatabase = walletDatabase
    }
    async createWallet(walletDetails: WalletEntity): Promise<WalletEntity> {
        return await this.walletDatabase.createWallet(walletDetails)
    }
}