import { Request, Response } from "express";
import { IfindUserWalletUseCase } from "../../../../domain/interface/useCaseInterfaces/client/wallet/findWalletForClientUseCase";
import { IfindTransactionsUseCase } from "../../../../domain/interface/useCaseInterfaces/transactions/findTransactionUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindWalletDetailsVendorController {
    private findWalletDetails: IfindUserWalletUseCase
    private findTransactions: IfindTransactionsUseCase
    constructor(findWalletDetails: IfindUserWalletUseCase, findTransactions: IfindTransactionsUseCase) {
        this.findTransactions = findTransactions
        this.findWalletDetails = findWalletDetails
    }
    async handleShowWalletDetaills(req: Request, res: Response): Promise<void> {
        try {
            const { userId, pageNo } = req.params
            const page = parseInt(pageNo, 10) || 1
            const wallet = await this.findWalletDetails.findWallet(userId)
            const { transactions, totalPages } = await this.findTransactions.findTransactions(wallet?._id!, page)
            res.status(HttpStatus.OK).json({ message: 'Wallet details fetched vendor', wallet, transactions, totalPages })
        } catch (error) {
            console.log('error while finding wallet details', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error whilw finding wallet details",
                error: error instanceof Error ? error.message : 'error while finding wallet detailsl'
            })
        }
    }
}