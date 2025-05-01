import { Request, Response } from "express";
import { IeventRepository } from "../../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IfindEventsInAdminSideUseCase } from "../../../../domain/interface/useCaseInterfaces/admin/eventManagement/findEventsInAdminSide";

export class FindEventsInAdminSideController {
    private findEventsInAdminUseCase: IfindEventsInAdminSideUseCase
    constructor(findEventsInAdminUseCase: IfindEventsInAdminSideUseCase) {
        this.findEventsInAdminUseCase = findEventsInAdminUseCase
    }
    async handleListingEventsInAdminSide(req: Request, res: Response): Promise<void> {
        try {
            const { pageNo } = req.query
            const page = parseInt(pageNo as string, 10) || 1
            const { events, totalPages } = await this.findEventsInAdminUseCase.findEvents(page)
            res.status(HttpStatus.OK).json({ message: 'events fetched', events, totalPages })
        } catch (error) {
            console.log('error while listing events in the admin side', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while listing evetns in teh admin side',
                error: error instanceof Error ? error.message : 'error while listing events in the admin side'
            })
        }
    }
}