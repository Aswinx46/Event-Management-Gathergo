import { Request, Response } from "express";
import { IfindAllEventsUseCase } from "../../../../domain/interface/useCaseInterfaces/client/events/findAllEventsUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindAllEventsClientController {
    private findAllEventClientUseCase: IfindAllEventsUseCase
    constructor(findAllEventClientUseCase: IfindAllEventsUseCase) {
        this.findAllEventClientUseCase = findAllEventClientUseCase
    }
    async handleFindAllEventsClient(req: Request, res: Response): Promise<void> {
        try {
            const pageNo = parseInt(req.params.pageNo, 10) || 1
            const { events, totalPages } = await this.findAllEventClientUseCase.findAllEvents(pageNo)
            res.status(HttpStatus.OK).json({ message: 'Events fetched', events, totalPages })
        } catch (error) {
            console.log('error while finding all events', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while finding all events in client side",
                error: error instanceof Error ? error.message : 'error while finding all events in client side'
            })
        }
    }
}