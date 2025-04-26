import { Request, Response } from "express";
import { IfindEventsNearToUserUseCase } from "../../../../domain/interface/useCaseInterfaces/client/events/findEventsNearToUserUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FindEventsNearToUserController {
    private findEventsNearToUser: IfindEventsNearToUserUseCase
    constructor(findEventsNearToUser: IfindEventsNearToUserUseCase) {
        this.findEventsNearToUser = findEventsNearToUser
    }
    async handleEventsNearToUse(req: Request, res: Response): Promise<void> {
        try {
            const { latitude, longitude, pageNo, range } = req.params
            const kmRange = parseInt(range, 10) || 30000
            const page = parseInt(pageNo, 10) || 1
            const lat = parseFloat(latitude)
            const log = parseFloat(longitude)
            const { events, totalPages } = await this.findEventsNearToUser.findEventsNearToUse(lat, log, page, kmRange)
            res.status(HttpStatus.OK).json({ message: "Events fetched near to the user", events, totalPages })
        } catch (error) {
            console.log('error while finding the events near to you', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while finding the events near to you',
                error: error instanceof Error ? error.message : 'error while finding the events near to you'
            })
        }
    }
}