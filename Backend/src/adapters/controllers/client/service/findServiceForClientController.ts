import { Request, Response } from "express";
import { IfindServiceUseCase } from "../../../../domain/interface/useCaseInterfaces/client/service/findServiceUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindServiceForClientController {
    private findServiceUseCase: IfindServiceUseCase
    constructor(findServiceUseCase: IfindServiceUseCase) {
        this.findServiceUseCase = findServiceUseCase
    }
    async handleFindServiceForClient(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.params.pageNo as string, 10) || 1
            const { Services, totalPages } = await this.findServiceUseCase.findServiceForclient(pageNo)
            console.log(Services,totalPages)
            res.status(HttpStatus.OK).json({ message: 'Services Fetched', Services, totalPages })
        } catch (error) {
            console.log('error while fetching service for client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while fetching service for client",
                error: error instanceof Error ? error.message : 'error while fetching service for client'
            })
        }
    }
}