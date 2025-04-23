import { Request, Response } from "express";
import { IinititateBookingPaymentUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/inititateBookingPaymentUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CreateBookingPaymentController {
    private createBookingPaymentUseCase: IinititateBookingPaymentUseCase
    constructor(createBookingPaymentUseCase: IinititateBookingPaymentUseCase) {
        this.createBookingPaymentUseCase = createBookingPaymentUseCase
    }
    async handleInititateBookingPayment(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId, paymentIntentId } = req.body
            const { clientStripeId, booking } = await this.createBookingPaymentUseCase.inititateBookingPayment(bookingId, paymentIntentId)
            res.status(HttpStatus.OK).json({ message: "Payment inititaion done", clientStripeId, booking })
        } catch (error) {
            console.log('error while initiating booking payment', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while initiating booking payment",
                error: error instanceof Error ? error.message : 'error while initiating booking payment'
            })
        }
    }
}