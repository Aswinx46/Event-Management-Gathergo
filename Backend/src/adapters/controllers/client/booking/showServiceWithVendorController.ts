import { Request, Response } from "express";
import { IshowServiceWithVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/client/booking/showServiceWithVendorDetailsUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ShowServiceWithVendorController {
    private showServiceWithVendorUseCase: IshowServiceWithVendorUseCase
    constructor(showServiceWithVendorUseCase: IshowServiceWithVendorUseCase) {
        this.showServiceWithVendorUseCase = showServiceWithVendorUseCase
    }
    async handleShowServiceWithVendor(req: Request, res: Response): Promise<void> {
        try {
            // const serviceId = req.params.serviceId as string;
            // const pageNo = req.params.pageNo as string
            const { serviceId, pageNo, rating } = req.query
            if (!serviceId || !pageNo) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No service id is provided" })
                return
            }
            const page = parseInt(pageNo?.toString(), 10) || 1
            const { reviews, service, totalPages } = await this.showServiceWithVendorUseCase.showServiceWithVendorUseCase(serviceId.toString(), page)
            res.status(HttpStatus.OK).json({ message: "service with vendor fetched", serviceWithVendor: service, reviews, totalPages })
        } catch (error) {
            console.log('error while fetching the service data with venodor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching the service data with venodor',
                error: error instanceof Error ? error.message : 'error while fetching the service data with venodor'
            })
        }
    }
}