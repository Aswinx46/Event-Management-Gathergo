import { Request, Response } from "express"
import { IconfirmBookingPaymentUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/confirmBookingPaymentUseCaseInterface"
import { HttpStatus } from "../../../../domain/entities/httpStatus"

export class ConfirmBookingPaymentController {
    private confirmBookingPaymentUseCase: IconfirmBookingPaymentUseCase
    constructor(confirmBookingPaymentUseCase: IconfirmBookingPaymentUseCase) {
        this.confirmBookingPaymentUseCase = confirmBookingPaymentUseCase
    }
    async handleConfirmBookingPaymentUseCase(req: Request, res: Response): Promise<void> {
        try {
            const { booking, paymentIntentId } = req.body
            const ConfirmBooking = await this.confirmBookingPaymentUseCase.confirmBookingPayment(booking, paymentIntentId)
            res.status(HttpStatus.OK).json({message:"Payment confirm"})
        } catch (error) {
            console.log('error while confirming booking payment', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while confirming booking payment',
                error: error instanceof Error ? error.message : 'error while confirming booking payment'
            })
        }
    }
}