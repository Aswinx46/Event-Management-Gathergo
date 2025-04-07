import { Request, Response } from "express";
import { IchangeStatusServiceUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/service/changeStatusUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ChangestatusServiceController {
    private changeStatusServiceUseCase: IchangeStatusServiceUseCase
    constructor(changeStatusServiceUseCase: IchangeStatusServiceUseCase) {
        this.changeStatusServiceUseCase = changeStatusServiceUseCase
    }
    async handleChangeStatusUseCase(req: Request, res: Response): Promise<void> {
        try {
            const { serviceId } = req.body
            const changedService = await this.changeStatusServiceUseCase.changeStatus(serviceId)
            if (!changedService) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "error while changing the status of the user" })
                return
            }
            res.status(HttpStatus.OK).json({ message: "Status Changes" })
        } catch (error) {
            console.log('error while changing status of service', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while changing status of service",
                error: error instanceof Error ? error.message : 'error while changing status of service'
            })
        }
    }
}