import { Request, Response } from "express";
import { IfindUserWalletUseCase } from "../../../../domain/interface/useCaseInterfaces/client/wallet/findWalletForClientUseCase";
import { IfindTransactionsUseCase } from "../../../../domain/interface/useCaseInterfaces/transactions/findTransactionUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindAdminWalletDetailsController {
    private findWalletDetailsUseCase: IfindUserWalletUseCase
    private findTransactionDetailsUseCase: IfindTransactionsUseCase
    constructor(findWalletDetailsUseCase: IfindUserWalletUseCase, findTransactionDetailsUseCase: IfindTransactionsUseCase) {
        this.findTransactionDetailsUseCase = findTransactionDetailsUseCase
        this.findWalletDetailsUseCase = findWalletDetailsUseCase
    }
    async handleFindWalletDetails(req: Request, res: Response): Promise<void> {
        try {
            const { userId, pageNo } = req.params
            const page = parseInt(pageNo, 10) || 1
            const wallet = await this.findWalletDetailsUseCase.findWallet(userId)
            const { transactions, totalPages } = await this.findTransactionDetailsUseCase.findTransactions(wallet?._id!, page)
            res.status(HttpStatus.OK).json({ message: "Admin wallet details fetched", wallet, transactions, totalPages })
        } catch (error) {
            console.log('error while finding admin wallet details', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Error while finding admin wallet details" })
        }
    }
}