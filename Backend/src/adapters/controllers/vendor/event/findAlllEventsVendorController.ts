import { Request, Response } from "express";
import { IfindAllEventsVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/event/findAllEventsUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindAllEventsVendorController {
    private findAllEventsVendorUseCase: IfindAllEventsVendorUseCase
    constructor(findAllEventsVendorUseCase: IfindAllEventsVendorUseCase) {
        this.findAllEventsVendorUseCase = findAllEventsVendorUseCase
    }
    async handleFindAllEventsVendor(req: Request, res: Response): Promise<void> {
        try {
            const vendorId = req.params.vendorId
            const pageNo = parseInt(req.params.pageNo, 10) || 1
            const { events, totalPages } = await this.findAllEventsVendorUseCase.findAllEvents(vendorId, pageNo)
            res.status(HttpStatus.OK).json({ message: "Events fetched", events, totalPages })
        } catch (error) {
            console.log('error while finding all events in vendor side', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while finding all events in vendor side',
                error: error instanceof Error ? error.message : 'error while finding all events in vendor side'
            })
        }
    }
}