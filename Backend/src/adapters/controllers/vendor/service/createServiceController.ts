import { Request, Response } from "express";
import { IcreateServiceUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/service/createServiceUseCaseInterface";
import { HttpStatus } from "../../../../domain/httpStatus";
import { ServiceEntity } from "../../../../domain/entities/serviceEntity";

export class CreateServiceController {
    private createServiceUseCase: IcreateServiceUseCase
    constructor(createServiceUseCase: IcreateServiceUseCase) {
        this.createServiceUseCase = createServiceUseCase
    }
    async handleCreateService(req: Request, res: Response): Promise<void> {
        try {
            const { service } = req.body
            const createdService = await this.createServiceUseCase.createService(service)
            if (!createdService) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'error while creating service' })
                return
            }
            res.status(HttpStatus.CREATED).json({ message: "service created", service: createdService })
        } catch (error) {
            console.log('error while creating service', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while creating service',
                error: error instanceof Error ? error.message : 'error while creating service'
            })
        }
    }
}