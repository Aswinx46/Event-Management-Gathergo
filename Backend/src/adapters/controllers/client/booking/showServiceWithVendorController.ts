import { Request, Response } from "express";
import { IshowServiceWithVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/showServiceWithVendorDetailsUseCaseInterface";
import { HttpStatus } from "../../../../domain/httpStatus";

export class ShowServiceWithVendorController {
    private showServiceWithVendorUseCase: IshowServiceWithVendorUseCase
    constructor(showServiceWithVendorUseCase: IshowServiceWithVendorUseCase) {
        this.showServiceWithVendorUseCase = showServiceWithVendorUseCase
    }
    async handleShowServiceWithVendor(req: Request, res: Response): Promise<void> {
        try {
            const serviceId = req.params.serviceId as string;
            const serviceWithVendor = await this.showServiceWithVendorUseCase.showServiceWithVendorUseCase(serviceId)
            res.status(HttpStatus.OK).json({ message: "service with vendor fetched", serviceWithVendor })
        } catch (error) {
            console.log('error while fetching the service data with venodor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching the service data with venodor',
                error: error instanceof Error ? error.message : 'error while fetching the service data with venodor'
            })
        }
    }
}