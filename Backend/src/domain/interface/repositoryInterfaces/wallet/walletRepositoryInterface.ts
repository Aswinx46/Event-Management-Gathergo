import { ClientSession, ObjectId } from "mongoose";
import { WalletEntity } from "../../../entities/wallet/wallerEntity";

export interface IwalletRepository {
    createWallet(wallet: WalletEntity): Promise<WalletEntity>
    findWalletByUserId(userId: string | ObjectId, session?: ClientSession): Promise<WalletEntity | null>
    addMoney(userId: string | ObjectId, amount: number, session?: ClientSession): Promise<WalletEntity | null>
    reduceMoney(userId: string | ObjectId, amount: number, session?: ClientSession): Promise<WalletEntity | null>
    findTotalAmount(userId: string): Promise<number | null>
    findWalletId(userId: string): Promise<string | null>
    payWithWallet(userId: string, amount: number): Promise<boolean>
    findWalletById(walletId: string): Promise<WalletEntity | null>
    // revenueChart(): Promise<{ month: string, revenue: number }[]>
}