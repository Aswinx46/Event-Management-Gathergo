import { Request, Response } from "express";
import { IwalletPaymentUseCase } from "../../../../domain/interface/useCaseInterfaces/client/wallet/walletPayUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class WalletPayController {
    private walletPaymentUseCase: IwalletPaymentUseCase
    constructor(walletPaymentUseCase: IwalletPaymentUseCase) {
        this.walletPaymentUseCase = walletPaymentUseCase
    }
    async handleWalletPayment(req: Request, res: Response): Promise<void> {
        try {
            const { userId, amount, paymentType, ticket, vendorId } = req.body
            await this.walletPaymentUseCase.walletPay(userId, amount, paymentType, ticket, vendorId)
            res.status(HttpStatus.OK).json({ message: "Wallet pay done" })
        } catch (error) {
            console.log('error while paying amount using wallet payment', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while paying amount using wallet payment",
                error: error instanceof Error ? error.message : 'error while paying amount using wallet amount'
            })
        }
    }
}