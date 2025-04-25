import { Request, Response } from "express";
import { IfindEventsBasedOnCategoryUseCase } from "../../../../domain/interface/useCaseInterfaces/client/events/findEventsBasedOnCategory";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindEventBasedOnCategoryController {
    private findEventBasedOnCategoryUseCase: IfindEventsBasedOnCategoryUseCase
    constructor(findEventBasedOnCategoryUseCase: IfindEventsBasedOnCategoryUseCase) {
        this.findEventBasedOnCategoryUseCase = findEventBasedOnCategoryUseCase
    }
    async handleFindEventsBasedOnCategory(req: Request, res: Response): Promise<void> {
        try {
            const { category, pageNo, sortBy } = req.params
            const page = parseInt(pageNo, 10) || 1
            const { events, totalPages } = await this.findEventBasedOnCategoryUseCase.findEventsbasedOnCategory(category, page, sortBy)
            res.status(HttpStatus.OK).json({ message: "events fetched", events, totalPages })
        } catch (error) {
            console.log('error while finding events based on category', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while finding events based on category',
                error: error instanceof Error ? error.message : 'error while finding events based on category'
            })
        }
    }
}