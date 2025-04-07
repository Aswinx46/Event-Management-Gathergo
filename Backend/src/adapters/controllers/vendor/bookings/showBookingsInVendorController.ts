import { Request, Response } from "express";
import { IshowBookingsInVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/bookings/showBookingsInVendorUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ShowBookingsInVendorController {
    private showBookingsInVendorUseCase: IshowBookingsInVendorUseCase
    constructor(showBookingsInVendorUseCase: IshowBookingsInVendorUseCase) {
        this.showBookingsInVendorUseCase = showBookingsInVendorUseCase
    }
    async handleShowBookingsInVendor(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.params
            const bookings = await this.showBookingsInVendorUseCase.showBookingsInVendor(vendorId)
            res.status(HttpStatus.OK).json({ message: "Bookings fetched", bookings })
        } catch (error) {
            console.log('error while fetching bookigns for vendorSide', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching bookigns for vendorSide',
                error: error instanceof Error ? error.message : 'error while fetching bookigns for vendorSide'
            })
        }
    }
}