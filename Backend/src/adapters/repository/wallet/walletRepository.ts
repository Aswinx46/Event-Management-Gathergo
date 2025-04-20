import { ObjectId } from "mongoose";
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity";
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface";
import { walletModel } from "../../../framerwork/database/models/walletModel";

export class WalletRepository implements IwalletRepository {
    async createWallet(wallet: WalletEntity): Promise<WalletEntity> {
        return await walletModel.create(wallet)
    }
    async findWalletByUserId(userId: string | ObjectId): Promise<WalletEntity | null> {
        return await walletModel.findOne({ userId })
    }
    async addMoney(userId: string, amount: number): Promise<WalletEntity | null> {
        return walletModel.findOneAndUpdate({ userId }, { $inc: { balance: amount } }, { new: true })
    }
}