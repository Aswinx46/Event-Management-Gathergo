import { WalletEntity } from "../../domain/entities/wallet/wallerEntity";
import { IwalletRepository } from "../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { IfindUserWalletUseCase } from "../../domain/interface/useCaseInterfaces/client/wallet/findWalletForClientUseCase";

export class FindUserWalletUseCase implements IfindUserWalletUseCase {
    private walletDatabase: IwalletRepository
    constructor(walletDatabase: IwalletRepository) {
        this.walletDatabase = walletDatabase
    }
    async findWallet(userId: string): Promise<WalletEntity | null> {
        const wallet = await this.walletDatabase.findWalletByUserId(userId)
        if (!wallet) throw new Error("No wallet found in this userId")
        return wallet
    }
}