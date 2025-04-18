import { Request, Response } from "express";
import { IeventCreationUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/event/eventCreationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class EventCreationController {
    private eventCreateUseCase: IeventCreationUseCase
    constructor(eventCreateUseCase: IeventCreationUseCase) {
        this.eventCreateUseCase = eventCreateUseCase
    }
    async handleCreateEvent(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.params
            const { event } = req.body
            const createdEvent = await this.eventCreateUseCase.createEvent(event, vendorId)
            res.status(HttpStatus.CREATED).json({ message: "Event created", createdEvent })
        } catch (error) {
            console.log('error while creating event', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while creating event',
                error: error instanceof Error ? error.message : 'error while creating event'
            })
        }
    }
}