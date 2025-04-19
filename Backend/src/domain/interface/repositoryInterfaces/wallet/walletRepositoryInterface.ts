import { WalletEntity } from "../../../entities/wallet/wallerEntity";

export interface IwalletRepository {
    createWallet(wallet: WalletEntity): Promise<WalletEntity>
}