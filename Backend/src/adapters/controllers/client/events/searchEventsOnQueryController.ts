import { Request, Response } from "express";
import { IsearchEventsUseCase } from "../../../../domain/interface/useCaseInterfaces/client/events/searchEventsUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class SearchEventsOnQueryController {
    private searchEventsOnQueryUseCase: IsearchEventsUseCase
    constructor(searchEventsOnQueryUseCase: IsearchEventsUseCase) {
        this.searchEventsOnQueryUseCase = searchEventsOnQueryUseCase
    }
    async handleSearchEvents(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.query
            if (typeof query !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid query' })
                return
            }
            const searchEvents = await this.searchEventsOnQueryUseCase.searchEvents(query)
            res.status(HttpStatus.OK).json({ message: 'events based on search', searchEvents })
        } catch (error) {
            console.log('error while performing search in events', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while performing search in events',
                error: error instanceof Error ? error.message : 'error while performing search in events'
            })
        }
    }
}