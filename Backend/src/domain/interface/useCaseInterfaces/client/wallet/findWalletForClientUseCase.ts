import { WalletEntity } from "../../../../entities/wallet/wallerEntity";

export interface IfindClientWallet {
    findWallet(userId: string): Promise<WalletEntity | null>
}