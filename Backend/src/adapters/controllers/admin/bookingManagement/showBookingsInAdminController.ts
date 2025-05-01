import { Request, Response } from "express";
import { IshowbookingsInAdminUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/bookingManagement/showBookingsInAdminUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ShowBookingInAdminController {
    private showBookingInAdminUseCase: IshowbookingsInAdminUseCase
    constructor(showBookingInAdminUseCase: IshowbookingsInAdminUseCase) {
        this.showBookingInAdminUseCase = showBookingInAdminUseCase
    }
    async handleShowBookingInAdmin(req: Request, res: Response): Promise<void> {
        try {
            const { pageNo } = req.query
            const page = parseInt(pageNo as string, 10) || 1
            const { bookings, totalPages } = await this.showBookingInAdminUseCase.showBookings(page)
            res.status(HttpStatus.OK).json({ message: "Bookings fetched for admin", bookings, totalPages })
        } catch (error) {
            console.log('error while showing bookings in admin side', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while showing bookings in admin side',
                error: error instanceof Error ? error.message : "error while showing bookings in admin side"
            })
        }
    }
}