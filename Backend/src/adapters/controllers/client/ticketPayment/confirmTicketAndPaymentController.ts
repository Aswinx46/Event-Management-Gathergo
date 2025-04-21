import { Request, Response } from "express";
import { IconfirmTicketAndPaymentUseCase } from "../../../../domain/interface/useCaseInterfaces/client/ticket/confirmTicketAndPaymentUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ConfirmTicketAndPaymentController {
    private confirmTicketAndPaymentUseCase: IconfirmTicketAndPaymentUseCase
    constructor(confirmTicketAndPaymentUseCase: IconfirmTicketAndPaymentUseCase) {
        this.confirmTicketAndPaymentUseCase = confirmTicketAndPaymentUseCase
    }
    async handleConfirmTicketAndPayment(req: Request, res: Response): Promise<void> {
        try {
            const { ticket, paymentIntent, vendorId } = req.body

            const confirmTicketAndPayment = await this.confirmTicketAndPaymentUseCase.confirmTicketAndPayment(ticket, paymentIntent, vendorId)
  
            res.status(HttpStatus.OK).json({ message: "Ticket confirmed", confirmTicketAndPayment })
        } catch (error) {
            console.log('error while confirming ticket and payment', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while confirming ticket and payment',
                error: error instanceof Error ? error.message : 'error while confirming ticket and payment'
            })
        }
    }
}