import { ObjectId } from "mongoose";
import { WalletEntity } from "../../../entities/wallet/wallerEntity";

export interface IwalletRepository {
    createWallet(wallet: WalletEntity): Promise<WalletEntity>
    findWalletByUserId(userId: string | ObjectId): Promise<WalletEntity | null>
    addMoney(userId: string | ObjectId, amount: number): Promise<WalletEntity | null>
    reduceMoney(userId: string | ObjectId, amount: number): Promise<WalletEntity | null>
    findTotalAmount(userId: string): Promise<number | null>
    findWalletId(userId: string): Promise<string | null>
    payWithWallet(userId: string, amount: number): Promise<boolean>
    findWalletById(walletId: string): Promise<WalletEntity | null>
    // revenueChart(): Promise<{ month: string, revenue: number }[]>
}