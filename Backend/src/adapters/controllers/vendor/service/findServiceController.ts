import { Request, Response } from "express";
import { IfindServiceUseCaseInterface } from "../../../../domain/interface/useCaseInterfaces/vendor/service/findServiceUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindServiceController {
    private findServiceUseCase: IfindServiceUseCaseInterface
    constructor(findServiceUseCase: IfindServiceUseCaseInterface) {
        this.findServiceUseCase = findServiceUseCase
    }
    async handleFindService(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId, pageNo } = req.body
            const page = parseInt(pageNo, 10) || 1;
            const { Services, totalPages } = await this.findServiceUseCase.findService(vendorId, page)
            res.status(HttpStatus.OK).json({ message: "Service fetched", Services, totalPages })
        } catch (error) {
            console.log('error while fetching service', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching service',
                error: error instanceof Error ? error.message : 'error while fetching service'
            })
        }
    }
}