import { ObjectId } from "mongoose";
import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { transactionModel } from "../../../framerwork/database/models/transactionModel";

export class TransactionRepository implements ItransactionRepository {
    async createTransaction(transaction: TransactionsEntity): Promise<TransactionsEntity> {
        return await transactionModel.create(transaction)
    }
    async findTransactionsOfAWallet(walletId: string | ObjectId, pageNo: number): Promise<{ transactions: TransactionsEntity[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit
        const transactions = await transactionModel.find({ walletId }).select('-__v -createdAt -updatedAt').sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalPages = Math.ceil(await transactionModel.countDocuments({ _id: walletId }) / limit)
        return { transactions, totalPages }
    }
}