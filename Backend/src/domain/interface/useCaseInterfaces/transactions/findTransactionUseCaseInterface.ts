import { ObjectId } from "mongoose";
import { TransactionsEntity } from "../../../entities/wallet/transactionEntity";

export interface IfindTransactionsUseCase {
    findTransactions(walletId: string | ObjectId,pageNo:number): Promise<{ transactions: TransactionsEntity[] | [], totalPages: number }>
}