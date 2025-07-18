import { ClientSession, ObjectId } from "mongoose";
import { TransactionsEntity } from "../../../entities/wallet/transactionEntity";

export interface ItransactionRepository {
    createTransaction(transaction: TransactionsEntity, session?: ClientSession): Promise<TransactionsEntity>
    findTransactionsOfAWallet(walletId: string | ObjectId, pageNo: number): Promise<{ transactions: TransactionsEntity[] | [], totalPages: number }>
    revenueChart(walletId: string, datePeriod: Date | null): Promise<{ month: string, revenue: number }[]>
}