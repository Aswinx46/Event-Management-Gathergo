import { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IupdateBookingAsCompleteUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/bookings/updateBookingAsCompleteUseCaseInterface";

export class UpdateBookingAsCompleteController {
    private updateBookingStatusUseCase: IupdateBookingAsCompleteUseCase
    constructor(updateBookingStatusUseCase: IupdateBookingAsCompleteUseCase) {
        this.updateBookingStatusUseCase = updateBookingStatusUseCase
    }
    async handleUpdateBookingComplete(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId, status } = req.body
            const updateBooking = await this.updateBookingStatusUseCase.changeStatusOfBooking(bookingId, status)
            res.status(HttpStatus.OK).json({ message: "Booking marked as completed" })
        } catch (error) {
            console.log('error while updating complete status of booking', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while updating complete status of booking',
                error: error instanceof Error ? error.message : 'error while updating complete status of booking'
            })
        }
    }
}