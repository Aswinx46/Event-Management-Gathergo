import { TransactionsEntity } from "../../../domain/entities/wallet/transactionEntity";
import { ItransactionRepository } from "../../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { transactionModel } from "../../../framerwork/database/models/transactionModel";

export class TransactionRepository implements ItransactionRepository {
    async createTransaction(transaction: TransactionsEntity): Promise<TransactionsEntity> {
        return await transactionModel.create(transaction)
    }
    async findTransactionsOfAWallet(walletId: string): Promise<TransactionsEntity[] | []> {
        return await transactionModel.find({ walletId }).select('-__v')
    }
}