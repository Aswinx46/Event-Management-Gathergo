import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { walletModel } from "../../../framerwork/database/models/walletModel";

export class WalletRepository implements IwalletRepository {
    async createWallet(wallet: WalletEntity): Promise<WalletEntity> {
        return await walletModel.create(wallet)
    }
}