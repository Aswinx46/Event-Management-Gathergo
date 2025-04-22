import { WalletEntity } from "../../../../entities/wallet/wallerEntity";

export interface IfindUserWalletUseCase {
    findWallet(userId: string): Promise<WalletEntity | null>
}