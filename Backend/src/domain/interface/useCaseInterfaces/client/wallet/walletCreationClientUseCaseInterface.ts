import { WalletEntity } from "../../../../entities/wallet/wallerEntity";

export interface IcreateWalletUseCase {
    createWallet(walletDetails: WalletEntity): Promise<WalletEntity>
}