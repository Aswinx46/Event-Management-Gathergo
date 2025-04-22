import { ObjectId } from "mongoose";
import { TransactionsEntity } from "../../domain/entities/wallet/transactionEntity";
import { ItransactionRepository } from "../../domain/interface/repositoryInterfaces/transactions/transactionRepositoryInterface";
import { IfindTransactionsUseCase } from "../../domain/interface/useCaseInterfaces/transactions/findTransactionUseCaseInterface";

export class FindTransactionsUseCase implements IfindTransactionsUseCase {
    private transactionDatabase: ItransactionRepository
    constructor(transactionDatabase: ItransactionRepository) {
        this.transactionDatabase = transactionDatabase
    }
    async findTransactions(walletId: string | ObjectId, pageNo: number): Promise<{ transactions: TransactionsEntity[] | [], totalPages: number }> {
        const { totalPages, transactions } = await this.transactionDatabase.findTransactionsOfAWallet(walletId, pageNo)
        return { transactions, totalPages }
    }
}