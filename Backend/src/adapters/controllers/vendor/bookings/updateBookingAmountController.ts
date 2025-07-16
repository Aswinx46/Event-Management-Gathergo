import { Request, Response } from "express";
import { IupdateBookingAmountUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/bookings/updateBookingAmountUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class UpdateBookingAmountController {
    private updateBookingAmountUseCase: IupdateBookingAmountUseCase
    constructor(updateBookingAmountUseCase: IupdateBookingAmountUseCase) {
        this.updateBookingAmountUseCase = updateBookingAmountUseCase
    }
    async handleUpdateBookingAmount(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId } = req.params
            const { amount } = req.body
            await this.updateBookingAmountUseCase.updateBookingAmount(bookingId, amount)
            res.status(200).json({ message: "Booking updated" })
        } catch (error) {
            console.log('error while updating booking amount', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while updating booking amount",
                error: error instanceof Error ? error.message : 'error while updating booking amount'
            })
        }
    }
}