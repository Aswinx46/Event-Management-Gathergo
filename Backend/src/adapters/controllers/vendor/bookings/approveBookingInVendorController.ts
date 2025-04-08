import { Request, Response } from "express";
import { IapproveBookingVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/bookings/approveBookingInVendorUseCaseI";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ApproveBookingInVendorController {
    private approveBookingVenorUseCase: IapproveBookingVendorUseCase
    constructor(approveBookingVenorUseCase: IapproveBookingVendorUseCase) {
        this.approveBookingVenorUseCase = approveBookingVenorUseCase
    }
    async handleApproveBooking(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId } = req.body
            const changeStatus = await this.approveBookingVenorUseCase.approveBooking(bookingId)
            if (changeStatus) res.status(HttpStatus.OK).json({ message: "Vendor Approved" })
        } catch (error) {
            console.log('error while changing the status of the booking', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while changing the status of the booking',
                error: error instanceof Error ? error.message : 'error while changing the status of the booking'
            })
        }
    }
}