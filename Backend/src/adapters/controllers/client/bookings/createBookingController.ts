import { Request, Response } from "express";
import { IcreateBookingUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/createBookingUseCaseInterface";
import { HttpStatus } from "../../../../domain/httpStatus";
import { BookingEntity } from "../../../../domain/entities/bookingEntity";

export class CreateBookingController {
    private createBookingUseCase: IcreateBookingUseCase
    constructor(createBookingUseCase: IcreateBookingUseCase) {
        this.createBookingUseCase = createBookingUseCase
    }
    async handleCreateBooking(req: Request, res: Response): Promise<void> {
        try {
            const booking: BookingEntity = req.body
            console.log(booking)
            const createdBooking = this.createBookingUseCase.createBooking(booking)
            res.status(HttpStatus.OK).json({ message: "Booking created", createdBooking })
        } catch (error) {
            console.log('error while creating booking', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while creating booking',
                error: error instanceof Error ? error.message : 'error while creating booking'
            })
        }
    }
}