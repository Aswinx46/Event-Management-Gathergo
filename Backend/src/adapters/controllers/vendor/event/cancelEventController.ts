import { Request, Response } from "express";
import { IeventCancellationUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/event/eventCancellationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CancelEventController {
    private CancelEventUseCase: IeventCancellationUseCase
    constructor(CancelEventUseCase: IeventCancellationUseCase) {
        this.CancelEventUseCase = CancelEventUseCase
    }
    async handleCancelEvent(req: Request, res: Response): Promise<void> {
        try {
            const { eventId } = req.params
            await this.CancelEventUseCase.cancelEvent(eventId)
            res.status(200).json({ message: "Event Cancelled" })
        } catch (error) {
            console.log('error while canceling event', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: "error while canceling event", error: error instanceof Error ? error.message : 'Error while canceling event' })
        }
    }
}