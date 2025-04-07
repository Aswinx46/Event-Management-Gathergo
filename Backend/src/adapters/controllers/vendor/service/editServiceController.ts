import { Request, Response } from "express";
import { IeditServiceUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/service/editServiceUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { ServiceEntity } from "../../../../domain/entities/serviceEntity";

interface Params {
    service: ServiceEntity,
    serviceId: string
}

export class EditServiceController {
    private editServiceUseCase: IeditServiceUseCase
    constructor(editServiceUseCase: IeditServiceUseCase) {
        this.editServiceUseCase = editServiceUseCase
    }
    async handleEditService(req: Request, res: Response): Promise<void> {
        try {
            const { service, serviceId }: Params = req.body
            const updatedService = await this.editServiceUseCase.editService(service, serviceId)
            res.status(HttpStatus.OK).json({ message: "Service Updated", updatedService })
        } catch (error) {
            console.log('error while udpating service', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while udpating service',
                error: error instanceof Error ? error.message : 'error while udpating service'
            })
        }
    }
}