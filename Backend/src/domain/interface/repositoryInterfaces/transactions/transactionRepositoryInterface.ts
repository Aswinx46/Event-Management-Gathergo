import { TransactionsEntity } from "../../../entities/wallet/transactionEntity";

export interface ItransactionRepository {
    createTransaction(transaction: TransactionsEntity): Promise<TransactionsEntity>
    findTransactionsOfAWallet(walletId: string): Promise<TransactionsEntity[] | []>
}