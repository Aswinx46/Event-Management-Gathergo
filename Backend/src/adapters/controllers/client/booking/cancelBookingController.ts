import { Request, Response } from "express";
import { IbookingCancellationUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/bookingCancellationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CancelBookingController {
    private cancelBookingUseCase: IbookingCancellationUseCase
    constructor(cancelBookingUseCase: IbookingCancellationUseCase) {
        this.cancelBookingUseCase = cancelBookingUseCase
    }
    async handleCancelBooking(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId } = req.body
            const cancelBooking = await this.cancelBookingUseCase.cancelBooking(bookingId)
            res.status(HttpStatus.OK).json({ message: "Booking cancelled", cancelBooking })
        } catch (error) {
            console.log('error while canceling the booking', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while canceling the booking',
                error: error instanceof Error ? error.message : 'error while cancelling the booking'
            })
        }
    }
}