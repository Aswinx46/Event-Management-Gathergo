import { Request, Response } from "express";
import { IrejectBookingVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/bookings/rejectBookingInVendorUseCaseI";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class RejectBookingInVendorController {
    private rejectBookingInVendorUsecase: IrejectBookingVendorUseCase
    constructor(rejectBookingInVendorUsecase: IrejectBookingVendorUseCase) {
        this.rejectBookingInVendorUsecase = rejectBookingInVendorUsecase
    }
    async handleRejectBookingInVendor(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId,rejectionReason } = req.body 
            const rejectedBooking = await this.rejectBookingInVendorUsecase.rejectBooking(bookingId,rejectionReason)
                if(rejectedBooking){
                    res.status(HttpStatus.OK).json({message:'Rejected booking'})
                }
        } catch (error) {
            console.log('error while rejecting booking', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while rejectig booking',
                error: error instanceof Error ? error.message : 'error while rejecting booking'
            })
        }
    }
}