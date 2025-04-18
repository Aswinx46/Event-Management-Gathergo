import { Request, Response } from "express";
import { IupdateEventUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/event/updateEventUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class UpdateEventController {
    private updateEventUseCase: IupdateEventUseCase
    constructor(updateEventUseCase: IupdateEventUseCase) {
        this.updateEventUseCase = updateEventUseCase
    }
    async handleUpdateEvent(req: Request, res: Response): Promise<void> {
        try {
            const { eventId, update } = req.body
            const updatedEvent = await this.updateEventUseCase.updateEvent(eventId, update)
            res.status(HttpStatus.OK).json({ message: "Event Updated", updatedEvent })
        } catch (error) {
            console.log('Error while updating event', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while updating event",
                error: error instanceof Error ? error.message : 'Error while updating event'
            })
        }
    }
}