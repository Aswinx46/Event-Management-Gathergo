import { ObjectId } from "mongoose";
import { TransactionsEntity } from "../../../entities/wallet/transactionEntity";

export interface ItransactionRepository {
    createTransaction(transaction: TransactionsEntity): Promise<TransactionsEntity>
    findTransactionsOfAWallet(walletId: string | ObjectId, pageNo: number): Promise<{ transactions: TransactionsEntity[] | [], totalPages: number }>
}